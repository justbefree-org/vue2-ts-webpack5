/*
 * @Author: Just be free
 * @Date:   2020-07-22 15:37:07
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-05-30 19:12:39
 * @E-mail: justbefree@126.com
 */

import { default as RouterManager } from "@/core/RouterManager";
const router = new RouterManager("test/layout", "test");
router.register([
  {
    pathName: "about",
    path: "/about",
    name: "about",
    dynamic: true,
  },
  {
    pathName: "home",
    path: "/home",
    name: "home",
    dynamic: false,
  },
  {
    pathName: "extend",
    path: "/extend",
    name: "extend",
    dynamic: true,
  },
]);
// export default router.getRoutes();
// export default router.getConstRoutes();
export default router;
