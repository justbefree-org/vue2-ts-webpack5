/*
 * @Author: Just be free
 * @Date:   2020-07-27 16:02:38
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-08-29 15:40:29
 * @E-mail: justbefree@126.com
 */
import { APIobject, State } from "./types";
import { AnyObject, Callback, Anything } from "../types";
import { getType } from "../utils/mutationTypes";
import Http, { HttpMethodTypes } from "../utils/http";
import { hasProperty } from "../utils";
import { ActionContext } from "vuex/types";
class StoreManager {
  private _moduleName: string;
  private _actionName: string;
  private _actionNames: Array<string>;
  private _API: APIobject;
  private _states: AnyObject;
  private _action: AnyObject;
  private _mutation: AnyObject;
  private _getters: AnyObject;
  private _axiosConfig: AnyObject;
  private _sharedMutationType: string;
  private sharedMutation: boolean;
  constructor(moduleName: string, axiosConfig: AnyObject = {}) {
    this._moduleName = moduleName;
    this._actionName = "";
    this._actionNames = [] as Array<string>;
    this._API = {};
    this._states = {};
    this._action = {};
    this._mutation = {};
    this._getters = {};
    this._axiosConfig = axiosConfig;
    this.setApi();
    this._sharedMutationType = "SHARED_MUTATION_TYPES";
    this.sharedMutation = false;
  }
  private setApi(): void {
    try {
      this._API = {
        ...require(`@/custom/${this._moduleName}/store`)["API"],
        ...require(`@/applications/${this._moduleName}/store`)["API"],
      };
    } catch (err) {
      try {
        this._API = require(`@/applications/${this._moduleName}/store`)["API"];
      } catch (err) {
        this._API = {};
      }
    }
  }
  private setState(states: AnyObject): void {
    this._states = { ...this._states, ...states };
  }
  public getState(): AnyObject {
    return this._states;
  }
  public hasMutation(actionName: string): boolean {
    const mutationType = this.sharedMutation
      ? this._sharedMutationType
      : getType(this._moduleName, actionName);
    return hasProperty(this._mutation, mutationType);
  }
  protected httpSuccessCallback(args: AnyObject | string): void {
    console.log("http success callback", args);
  }
  protected httpFailCallback(args: Anything): void {
    console.log("http fail callback", args);
  }
  protected httpParamsModifier(args: AnyObject): AnyObject {
    console.log("http params modifer", args);
    return args;
  }
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  protected setRequestHeaders(uri: string, params: AnyObject): AnyObject {
    console.log("set http request headers");
    return {};
  }
  protected mergeConfig(uri: string, params: AnyObject): AnyObject {
    const config = this.setRequestHeaders(uri, params);
    return { ...this._axiosConfig, ...config };
  }

  public actions(actionObject: AnyObject): StoreManager {
    const actionNameArr = Object.keys(actionObject);
    this._actionNames = actionNameArr;
    actionNameArr.forEach((actionName: string) => {
      const type = actionObject[actionName].type;
      const url = actionObject[actionName].url;
      this._action[actionName] = (
        context: ActionContext<State, Anything>,
        args: AnyObject
      ) => {
        this.ajax(url, type, args, actionName, context);
      };
    });
    return this;
  }

  public mutations(callback: Callback): StoreManager {
    this._actionNames.forEach((actionName: string) => {
      const mutationName = this.sharedMutation
        ? this._sharedMutationType
        : getType(this._moduleName, actionName);
      this._mutation = {
        ...this._mutation,
        [mutationName](state: State, payload: AnyObject) {
          callback({ state, payload });
        },
      };
    });
    return this;
  }

  public setSharedMutationType(mutationType?: string): StoreManager {
    if (mutationType) {
      this._sharedMutationType = mutationType;
    }
    this.sharedMutation = true;
    return this;
  }

  private ajax(
    url: string,
    method: HttpMethodTypes,
    args: AnyObject,
    actionName: string,
    context: ActionContext<State, Anything>
  ) {
    const { params } = args;
    return Http(method)(
      url,
      this.httpParamsModifier(params),
      this.mergeConfig(url, params)
    )
      .then((res) => {
        if (this.hasMutation(actionName)) {
          let mutationTypes: string = getType(this._moduleName, actionName);
          if (this.sharedMutation) {
            mutationTypes = this._sharedMutationType;
          }
          context.commit(mutationTypes, {
            ...args,
            res,
          });
        }
        this.httpSuccessCallback(res);
        return Promise.resolve(res);
      })
      .catch((err) => {
        this.httpFailCallback(err);
        return Promise.reject(err);
      });
  }

  public action(
    actionName: string,
    async = false,
    method: HttpMethodTypes = "get"
  ): StoreManager {
    this._actionName = actionName;
    this._action[actionName] = (
      context: ActionContext<State, Anything>,
      args: AnyObject
    ) => {
      if (async) {
        this.ajax(this._API[actionName], method, args, actionName, context);
      } else {
        context.commit(getType(this._moduleName, actionName), { ...args });
      }
    };
    return this;
  }
  public getAction() {
    return this._action;
  }
  public mutation(callback: Callback): StoreManager {
    this._mutation = {
      [getType(this._moduleName, this._actionName)](
        state: State,
        payload: AnyObject
      ) {
        callback({ state, payload });
      },
    };
    return this;
  }

  public getMutation() {
    return this._mutation;
  }

  public getters(name: string, callback: Callback): StoreManager {
    this._getters[name] = (
      state: State,
      getters: Anything,
      rootState: State,
      rootGetters: Anything
    ) => {
      return callback({ state, getters, rootState, rootGetters });
    };
    return this;
  }
  public getGetters() {
    return this._getters;
  }

  public register(args: AnyObject = {}): StoreManager {
    const state = args.state;
    this.setState(state);
    return this;
  }
}

export default StoreManager;
