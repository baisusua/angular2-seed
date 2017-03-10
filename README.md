#Angular2单页面应用实例

> [Angular2 文档地址](https://angular.cn)

> [Webpack2 文档地址](http://webpack.github.io/)

> 项目基于[angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)进行构建，更多细节和构建方案请参考[angular2-webpack-starter](https://github.com/AngularClass/angular2-webpack-starter)项目

>开发模式使用[ JIT ](https://angular.cn/docs/ts/latest/cookbook/aot-compiler.html#!#aot-jit)模式，生产模式使用[ AOT ](https://angular.cn/docs/ts/latest/cookbook/aot-compiler.html#!#aot-jit)模式

>第三方库配置文件： `src/config/vendor.ts`

>angular2[填充库](https://angular.cn/docs/ts/latest/guide/browser-support.html)配置文件：`src/config/polyfill`

>暂无测试模式~

>项目构建相关文件统一放在 `task` 目录下

>项目无需编译的静态资源目录：`src/assets/static`

开发模式

* 使用dll插件提升构建速度
* dll相关配置文件：`dll.config.js` `dev.dll.js` `prod.dll.js`
* 项目更改了依赖库或者填充库需要使用 `npm run dll` 或 `npm run dll:prod` 重新生成dll文件
* dll文件地址：`src/dll`
* 无需编译的样式和JS库使用 `./assets/..` 相对路径引用，可以参考 `src/index.html` 文件

生产模式

* 使用Webpack编译文件
* 使用Gulp发布文件
* 通过push触发部署脚本自动部署

## 目录结构
```
angular2-seed/
 │──task/                          * 项目构建任务
 │   │config.json                * 项目构建配置
 │   │──dev.dll.js                 * 生成无压缩dll
 │   │──prod.dll.js                * 生成压缩dll
 │   │──dll.config.js              * 生成dll公共配置
 │   │──webpack.dev.js             * 开发配置
 │   │──webpack.prod.js            * 无dll生产模式
 │   │──webpack.dll.js             * dll生产模式
 │   └──gulp.js                    * gulp相关任务
 │
 │──src/                           * 项目代码
 │   ├──main.jit.ts                * 开发入口
 │   │
 │   ├──main.aot.ts                * 生产入口
 │   │
 │   ├──index.html                 * html模板
 │   │
 │   ├──config/                    * 业务配置
 │   │   ├──hmr.ts                 * 开发热加载配置
 │   │   ├──resource-override.js   * 生产AOT配置
 │   │   ├──polyfills.ts           * 填充库配置
 │   │   └──vendor.ts              * 依赖库配置
 │   │
 │   │──common/                    * 公共部分
 │   │
 │   │──dll/                       * dll文件（webpack任务生成）
 │   │
 │   ├──app/                       * 业务代码
 │   │   ├──app.module.ts          * 项目入口模块
 │   │   ├──components/            * 项目公共组件
 │   │   ├──router/                * 项目路由
 │   │   ├──service/               * 项目服务
 │   │   └──pages/                 * 项目页面
 │   │
 │   ├──assets/                    * 资源目录
 │   │   ├──css/                   * 样式资源（webpac处理） 
 │   │   ├──images/                * 图片资源（webpack处理）
 │   │   └──static/                * 静态资源（无需webpack处理） 
 │   │
 │   ├──docs/                      * 项目文档
 │   │
 │   └──compiled/                  * AOT临时编译文件（webpack任务生成）
 │
 ├──tslint.json                    * typescript语法检查配置
 ├──typedoc.json                   * 生成文档
 ├──tsconfig.json                  * JIT模式编译typescript配置
 ├──tsconfig.aot.json              * AOT模式编译typescript配置
 ├──package.json                   * what npm uses to manage it's dependencies
 ├──gulpfile.js                    * gulp任务入口
 └──webpack.config.js              * webpack开发模式入口

```
## 开发
* `npm install`
* `npm run dll` 或者 `npm run dll:prod`
* `npm run dev`（默认读取`task/config.json`中dev的api配置）
* 修改`package.json`中的env为 `env:A` （读取`task/config.json`中A的api配置）
* `http://localhost:3000`

## 发布
* 在`task/config.json`中配置环境A
* `gulp A`
* 如果没有配置环境A，默认使用dev环境
* CDN资源地址为: `config.A.url+config.v`
* CDN暂时只支持七牛云
* 将打包好的index.html上传到发布仓库和对应分支，触发部署脚本自动部署发布

## task/config.json配置模板
```
{
    "dev": {
        "url": "xxx",           //CDN地址
        "ak": "xxxx",           //七牛AK
        "sk": "xxxx",           //七牛SK
        "bk": "xxxx",           //七牛空间名称
        "remote": "xxxx",       //远程git仓库地址
        "branch": "xxxx",       //远程仓库发布分支
        "api": "testapi",       //API前缀
        "env": "test"           //设置开发环境变量
    },
    "A": {
        "url": "xxx",
        "ak": "xxxx",
        "sk": "xxxx",
        "bk": "xxxx",
        "remote": "xxxx",
        "branch": "xxxx",
        "api": "testapi",
        "env": "test"
    },
    "v":"0.0.1"                 //版本号
}

```

