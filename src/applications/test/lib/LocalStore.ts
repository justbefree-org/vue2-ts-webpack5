/*
 * @Author: Just be free
 * @Date:   2020-08-21 11:42:55
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-01-18 16:19:54
 * @E-mail: justbefree@126.com
 */

import { Base64 } from "js-base64";

import { default as LocalStorage, StoreTypes } from "@/lib/LocalStore";
class TestStorage extends LocalStorage {
  constructor(type: StoreTypes, version: string) {
    super(type, "test", version, true);
  }
  protected encode(str: string): string {
    return Base64.encode(str);
  }
  protected decode(str: string): string {
    return Base64.decode(str);
  }
}
export default TestStorage;
