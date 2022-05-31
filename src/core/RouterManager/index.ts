/*
 * @Author: Just be free
 * @Date:   2020-07-22 15:40:12
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-05-30 19:41:54
 * @E-mail: justbefree@126.com
 */
import { loadComponent } from "../utils/load";
import { RouteConfig } from "vue-router";
class RouterManager {
  private baseDir: string;
  private routes: Array<RouteConfig>;
  private constRoutes: Array<RouteConfig>;
  private dynamicRoutes: Array<RouteConfig>;
  private nameSpace: string;
  constructor(baseDir: string, nameSpace?: string) {
    this.baseDir = baseDir;
    this.routes = [];
    this.constRoutes = [];
    this.dynamicRoutes = [];
    this.nameSpace = nameSpace ? nameSpace : "";
  }
  private getBaseDir(): string {
    return this.baseDir;
  }
  private pushRoutes(route: RouteConfig, isDynamic: false) {
    if (isDynamic) {
      this.dynamicRoutes.push(route);
    } else {
      this.constRoutes.push(route);
    }
    this.routes.push(route);
  }
  public merge(routerManager: RouterManager): RouterManager {
    this.routes = [...this.routes, ...routerManager.getRoutes()];
    this.constRoutes = [...this.constRoutes, ...routerManager.getConstRoutes()];
    this.dynamicRoutes = [
      ...this.dynamicRoutes,
      ...routerManager.getDynamicRoutes(),
    ];
    return this;
  }
  public getRoutes(): Array<RouteConfig> {
    return this.routes;
  }
  public getConstRoutes(): Array<RouteConfig> {
    return this.constRoutes;
  }
  public getDynamicRoutes(): Array<RouteConfig> {
    return this.dynamicRoutes;
  }
  register(routes: Array<any> = []) {
    routes.forEach((route) => {
      if (route.path.startsWith("/") && this.nameSpace !== "") {
        route.path = `/${this.nameSpace}${route.path}`;
      }
      if (
        route.redirect &&
        route.redirect.startsWith("/") &&
        this.nameSpace !== ""
      ) {
        route.redirect = `/${this.nameSpace}${route.redirect}`;
      }
      if (route.pathName) {
        const path = `${this.getBaseDir()}/${route.pathName}`;
        route.component = loadComponent(path);
        delete route.pathName;
        if (route.children && route.children.length > 0) {
          this.register(route.children);
        }
      }
      // 注册一级路由，以及404页面
      if (route.path.startsWith("/") || route.path === "*") {
        const isDynamic = route.dynamic;
        delete route.dynamic;
        this.pushRoutes(route, isDynamic);
      }
    });
  }
}
export default RouterManager;
