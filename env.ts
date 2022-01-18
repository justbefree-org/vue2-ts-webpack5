/*
 * @Author: Just be free
 * @Date:   2022-01-18 15:09:51
 * @Last Modified by:   Just be free
 * @Last Modified time: 2022-01-18 15:10:00
 * @E-mail: justbefree@126.com
 */

const args = process.argv.splice(2);
const fs = require("fs");
const descriptions = {
  development: "功能测试环境",
  test: "集成测试环境",
  production: "生产环境",
};
const env = args[0];
fs.writeFile(
  "./.env",
  `VUE_APP_TARGET_ENVIRONMENT=${env}\nVUE_APP_DESCRIPTION=${descriptions[env]}`,
  "utf8",
  (err) => {
    if (err) throw err;
    console.log("The file has been saved!");
  }
);
