<p align="center">
    <img src="./logo.png" width="250" height="250" alt="face-effet logo" title="Face-effet - 人脸样式框架" />
</p>
<h1 align="center">FACE-EFFET.JS</h1>

<p align="center">
    <strong>一款人脸样式框架</strong>
</p>

# Effet.js

**Effet.js** 是一个轻量级的 JavaScript 框架，专为前端开发提供人脸检测、登录、打卡等功能。它具有易于使用的 API，可以快速集成人脸识别到你的 Web 应用中。

## 安装

你可以通过 npm 安装 `Effet.js`，也可以直接通过 CDN 引入。

### 使用 npm 安装

首先，在项目根目录下运行以下命令安装 `Effet.js`：

```bash
npm i face-effet
```

### 使用 CDN 引入

如果你不想通过 npm 安装，可以使用以下方式通过 CDN 直接引入 `Effet.js`：

```html
<script src="https://unpkg.com/face-effet/effet/effet.js"></script>
```

## 项目结构

```
├── effet
│   ├── src
│   │   ├── components
│   │   │   ├── enums
│   │   │   │   └── Constant.ts -------公共的枚举
│   │   │   ├── AppState.ts -----------内部初始化数据
│   │   │   └── FaceManager.ts --------管理当前dom单例，用于消息替换
│   │   ├── core
│   │   │   ├── action ----------------动作函数，处理各种动作，例如人脸添加、登录、睡眠检测、打卡
│   │   │   │   ├── addFace
│   │   │   │   │   └── index.js ------处理人脸添加的主要逻辑
│   │   │   │   ├── checkLogin
│   │   │   │   │   └── index.js ------处理登录检测的逻辑
│   │   │   │   ├── checkSleep
│   │   │   │   │   └── index.js ------处理睡眠检测的逻辑
│   │   │   │   ├── clockIn
│   │   │   │   │   └── index.js ------处理打卡的主要逻辑
│   │   │   │   └── faceAction.js - 动作函数入口
│   │   │   ├── before ----------------动作前的预处理逻辑
│   │   │   │   ├── checkLogin
│   │   │   │   │   └── index.js ------登录前置函数操作
│   │   │   │   └── faceBefore.js -预处理入口
│   │   │   ├── db --------------------数据库相关逻辑
│   │   │   │   └── db.js
│   │   │   ├── defaultAssign ---------默认配置和参数分配
│   │   │   │   └── assign.js
│   │   │   ├── dom -------------------DOM 操作相关逻辑
│   │   │   │   ├── createFaceElements.js -创建人脸相关的 DOM 元素
│   │   │   │   └── defaultElement.js ---默认元素配置
│   │   │   ├── log ---------屏蔽插件相关内警告
│   │   │   │   └── log.js
│   │   │   └── index.js --------------核心模块的入口文件
│   │   ├── styles --------------------样式文件
│   │   │   ├── template
│   │   │   │   ├── addFace -----------人脸添加的样式模板
│   │   │   │   │   ├── index.css -----添加人脸的样式文件
│   │   │   │   │   └── index.js ------添加人脸的逻辑
│   │   │   │   └── checkLogin --------登录检测的样式模板
│   │   │   │       ├── index.css -----登录检测的样式文件
│   │   │   │       └── index.js ------登录检测的逻辑
│   │   │   ├── faceColor.js ----------与人脸样式颜色相关的逻辑
│   │   │   └── root.css --------------全局样式
│   │   ├── util ----------------------通用工具函数
│   │   │    ├── cameraAccessUtils.js --处理摄像头访问的工具
│   │   │    ├── cameraUtils.js --------摄像头操作的通用工具
│   │   │    ├── checkIfMeetsUtils.js --检查条件满足的工具
│   │   │    ├── deviceUtil.js ---------设备相关的工具函数
│   │   │    ├── distanceUtils.js ------距离计算工具
│   │   │    ├── drawingUtils.js -------绘制相关的工具函数
│   │   │    ├── faceMesh.js -----------人脸网格处理相关逻辑
│   │   │    ├── getImageReturnUtils.js -处理图像返回的工具
│   │   │    ├── getKey.js -------------获取键值的工具函数
│   │   │    ├── imageUtils.js ---------图像处理相关工具
│   │   │    └── isEmptyFunctionUtil.js -检查空函数的工具
│   │   └── index.js ----------------------程序的主要入口 
```

## 动作新增

如果我们需要新增一个新的动作

（1）`Constant.ts` 首先在当前枚举的 `FACE_TYPE` 新增一个类别，如：'faceNew'

（2）在 `action` 文件夹，创建一个 'faceNew' 的文件夹，然后在当前文件夹创建index.js

（3）创建完成后，基本入口都是一样的，具体参考其他的人脸动作，如下：

```javascript
export default (appData,results,currentObj,callBackResult,stopRecording,startRecording) => {
    // 在这里写你具体动作算法
};
```
（4）使用方式
```html
<div id="myface"></div>

<script>
    effet.init({
        el: 'myface',
        type:'faceNew',
        callBack: (data) => {
            console.log(data);
        }
    });
</script>
```
（5）默认值设置，可在 `assign.js` 设置你的默认值，具体参考其他值的设置方式

（6）样式编辑，基于 `appearance` 参数，判断当前是否有样式，在 `assign.js` 人脸打卡跟睡眠检测被强制为 false，
如果你当前新增的这个类别也没有样式，应该跟其他两个模式一样，强制为false，如果需要样式，则需要在
styles/template文件夹下面新增一个文件夹叫 `faceNew` 然后在这个文件夹创建index.css 跟index.js 然后写具体的操作

## 项目依赖

以下是项目中使用到的主要依赖及其版本信息：

- ![Babel Core](https://img.shields.io/badge/@babel/core-v7.25.2-blue) **@babel/core**: ^7.25.2
- ![Babel Preset Env](https://img.shields.io/badge/@babel/preset--env-v7.25.3-blue) **@babel/preset-env**: ^7.25.3
- ![Babel Loader](https://img.shields.io/badge/babel--loader-v9.1.3-blue) **babel-loader**: ^9.1.3
- ![CSS Loader](https://img.shields.io/badge/css--loader-v7.1.2-blue) **css-loader**: ^7.1.2
- ![CSS Minimizer Webpack Plugin](https://img.shields.io/badge/css--minimizer--webpack--plugin-v7.0.0-blue) **css-minimizer-webpack-plugin**: ^7.0.0
- ![File Loader](https://img.shields.io/badge/file--loader-v6.2.0-blue) **file-loader**: ^6.2.0
- ![Mini CSS Extract Plugin](https://img.shields.io/badge/mini--css--extract--plugin-v2.9.1-blue) **mini-css-extract-plugin**: ^2.9.1
- ![PostCSS](https://img.shields.io/badge/postcss-v8.4.41-blue) **postcss**: ^8.4.41
- ![PostCSS Loader](https://img.shields.io/badge/postcss--loader-v8.1.1-blue) **postcss-loader**: ^8.1.1
- ![Style Loader](https://img.shields.io/badge/style--loader-v4.0.0-blue) **style-loader**: ^4.0.0
- ![TS Loader](https://img.shields.io/badge/ts--loader-v9.5.1-blue) **ts-loader**: ^9.5.1
- ![TypeScript](https://img.shields.io/badge/typescript-v5.5.4-blue) **typescript**: ^5.5.4
- ![Webpack](https://img.shields.io/badge/webpack-v5.0.0-blue) **webpack**: ^5.0.0
- ![Webpack CLI](https://img.shields.io/badge/webpack--cli-v4.0.0-blue) **webpack-cli**: ^4.0.0

特别注意，本项目中使用到了 [facemesh.js](https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/)，请确保使用的是最新版本以获取最新的功能和改进。

## 使用方式

具体使用和 API 文档请查看 [官方网站](https://faceeffet.com)，以获取详细信息和更多示例。

## 许可证

本项目采用 MIT 许可证，详细信息请查看 [LICENSE](./LICENSE) 文件。
