/*
 * @Author: Just be free
 * @Date:   2020-07-22 11:33:05
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-05-31 10:16:09
 * @E-mail: justbefree@126.com
 */
import { Component } from "../../types";
import { default as Platform } from "./index";
export interface PlatformConstructorParams {
  App: Component;
  id: string;
}

export type StrtUpCallback = (app: Platform) => void;
