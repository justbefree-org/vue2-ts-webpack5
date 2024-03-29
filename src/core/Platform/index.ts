/*
 * @Author: Just be free
 * @Date:   2020-07-22 10:02:44
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-09-19 11:37:26
 * @E-mail: justbefree@126.com
 */
import Vue, { VueConstructor } from "vue";
import { Component } from "../types";
import { ApplicationObject } from "../Application/types";
import { PlatformConstructorParams, StrtUpCallback } from "./types";
import { default as Application } from "../Application";
import { RouterHooksName } from "../RouterManager/types";
const app = new Application();
class Platform {
  private _appStack: Array<Promise<any>>;
  private _App: Component;
  private _id: string;
  private _routerHooks = [] as Array<{ hookName: RouterHooksName; event: any }>;
  constructor(args: PlatformConstructorParams) {
    this._appStack = [];
    this._App = args.App;
    this._id = args.id;
  }
  private getAppStack() {
    return this._appStack;
  }
  private registerApplication(app: Promise<any>): Platform {
    this._appStack.push(app);
    return this;
  }
  public getApplication(): Application {
    return app;
  }
  public registerRouterHooks(hookName: RouterHooksName, event: any): void {
    this._routerHooks.push({ hookName, event });
  }
  public getVue(): VueConstructor {
    return Vue;
  }
  public install(appName: string | Array<string> | ApplicationObject): void {
    if (appName && Array.isArray(appName)) {
      (appName as Array<string>).forEach((name: string) => {
        this.registerApplication(app.register(name));
      });
    } else {
      if (typeof appName === "string") {
        this.registerApplication(app.register(appName));
      } else {
        this.registerApplication(app.registerApp(appName as ApplicationObject));
      }
    }
  }

  public startUp(callback?: StrtUpCallback): void {
    const apps = this.getAppStack();
    Promise.all(apps).then((res) => {
      console.log(`Platform has started`, res);
      const router = app.getRouter();
      app.registerDynamicRoutes();
      typeof callback === "function" && callback({ app });
      this._routerHooks.forEach((hook: any) => {
        const { hookName, event } = hook;
        router[hookName as RouterHooksName](event);
      });
      const store = app.getStore();
      const i18n = app.getI18n();
      Vue.config.productionTip = false;
      /* eslint-disable no-new */
      new Vue({
        store,
        router,
        i18n,
        render: (h) => h(this._App),
      }).$mount(this._id);
    });
  }
}
export default Platform;
