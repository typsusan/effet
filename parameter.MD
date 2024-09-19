## 参数应用范围解释
`ALL` 代表所有模式都可以应用当前参数<br>
`人脸登录` 当前参数只针对于 **人脸登录** 有效<br>
`人脸打卡` 当前参数只针对于 **人脸打卡** 有效<br>
`睡眠检测` 当前参数只针对于 **睡眠检测** 有效<br>


## 入参对象值
| 名称          | 类型                       | 应用范围   | 默认值         | 是否必填                                               | 描述                                                                                                                                                             |
|-------------|--------------------------|--------|--------------|----------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------|
| el | `String` \ `HTMLElement` | `ALL`  |                                                                                                           | <a style="color:red; text-decoration:none; ">是</a> | 主要face框架容器，可传入class,或者id，或者直接直接传一个元素                                                                                                                           |
| blur | `Number`                 | `人脸登录` | 8                                                                                                      | 否                                                  | 针对于 **“人脸登录”** 模式 登录成功后，镜头的模糊度                                                                                                                                 |
| dataRange | `Array`                  | `人脸登录` | [1, 1.5, 2.1]                                                                                      | 否                                                  | 针对于 **“人脸登录”** 模式，视频截取的第几秒                                                                                                                                     |
| face | `Object`                 | `ALL`  | {<br>maxNumFaces:1,<br>refineLandmarks:true,<br>minDetectionConfidence:0.5,<br>minTrackingConfidence:0.5<br>}| 否                                                  | <a href="#face-parameters" style="color:blue; text-decoration:none; font-weight:bold;">点击查看详细参数</a>                                                            |
| type| `FACE_TYPE`              | `ALL`  | FACE_TYPE.LOGIN                                                                                              | 否                                                  | <a href="#face-parameters-face-type" style="color:blue; text-decoration:none; font-weight:bold;">点击查看详细参数</a>                                                  |
|threshold| `Object`                 | `人脸登录` | {<br>lips:0.05, <br>eye:0.011,<br>headShake:0.01<br>}                                                   | 否                                                  | <a href="#face-parameters-threshold" style="color:blue; text-decoration:none; font-weight:bold;">点击查看详细参数</a>                                                  |
|before| `function`               | `ALL`  |                                                                                                            | 否                                                  | 人脸框架执行前的前置函数，一但使用了before函数，则会覆盖框架自带的before函数， <br><a href="#face-parameters-before" style="color:blue; text-decoration:none; font-weight:bold;">查看前置函数调用方式</a> |  
|action| `function`               | `ALL`  |                                                                                                            | 否                                                  | 人脸动作函数，一但使用action函数，则会覆盖框架自带的action函数<br>  <a href="#face-parameters-action" style="color:blue; text-decoration:none; font-weight:bold;">查看动作函数调用方式</a>    |
|faceStyle| `Object`                 | `ALL`  | null                                                                                                      | 否                                                  | 人脸样式网格样式，可以给人脸画一个网格线，单独给眼睛，鼻子，嘴巴轮廓单独上色  <br>  <a href="#face-parameters-face-style" style="color:blue; text-decoration:none; font-weight:bold;">查看参数示例</a> |
|loading| `FACE_LOADING`           | `ALL`  | null                                                                                                       | 否                                                  | 填写了则会有默认的加载动画效果，查看参数详细  <br><a href="#face-parameters-loading" style="color:blue; text-decoration:none; font-weight:bold;">点击查看详细参数</a>                |
|faceTemplate| `Object`                 | `ALL`  | null                                                                                                    | 否                                                  | 人脸样式模板，可用于，人脸登录，人脸打卡，睡眠检测  <br><a href="#face-parameters-faceTemplate" style="color:blue; text-decoration:none; font-weight:bold;">点击查看详细参数</a>            |
|callBack| ` function`              | `ALL`  |                                                                                                             | <a style="color:red; text-decoration:none; ">是</a>                                                   | 当前是一个回调函数，会打印整个人脸运行的回调消息，可在当前方法进行后端的调用  <br><a href="#face-parameters-callBack" style="color:blue; text-decoration:none; font-weight:bold;">查看回调函数调用方法</a> |
|punchDistance| ` Number`                | `人脸打卡` | 20                                                                                                     | 否                                                  | 打卡距离，人脸正对摄像头的距离，默认20厘米          |
|punchSuccessColor| ` String`                | `人脸打卡` | #00d6e1                                                                                            | 否                                                  | 打卡验证成功后的外框颜色                    |
|sleepEarThreshold| ` Number`                | `睡眠检测` | 0.2                                                                                                 | 否                                                  | 睡眠检测，当眼睛闭眼的阈值                   |
|sleepTime| ` Number`                | `睡眠检测` | 2                                                                                                          | 否                                                  | 睡眠检测，单位秒，当闭眼多久则判断是在睡眠           |
|sleepContinuousPush| ` Boolean`               | `睡眠检测` | false                                                                                               | 否                                                  | 当前检测到睡眠，是否持续推送消息，默认为false,只推送一次 |



## <a id="face-parameters"></a>face 参数详细说明
`当前对象是基于FaceMesh.js 的二次封装，下面是effet.js 自带参数，可以传FaceMesh.js的参数体`

| 名称          | 类型                 | 默认值         | 描述                                   |
|-------------|--------------------|-------------|--------------------------------------|
| maxNumFaces | `Number`            | 1           | 最大检测到的人脸数，如果选择的是**人脸登录**模式，则当前值强制为 1 |
| refineLandmarks | `Boolean`       | true        | 是否精细化人脸特征点检测                         |
| minDetectionConfidence | `Number` | 0.5         | 最小检测置信度                              |
| minTrackingConfidence  | `Number` | 0.5         | 最小跟踪置信度                              |


## <a id="face-parameters-face-type"></a>type 参数详细说明

| 名称          | 类型        | 默认值        | 描述     |
|-------------|-----------|------------|--------|
| LOGIN | `String`  |            | 人脸登录模式 |
| CLOCK_IN | `String` |        | 人脸打卡模式 |
| SLEEP | `String`  |        | 睡眠检测模式 |



## <a id="face-parameters-loading"></a>loading 参数详细说明

| 名称          | 类型        | 默认值        | 描述 |
|-------------|-----------|------------|---------|
| EYE | `String`  |        | 眼睛加载动画方式 |
| MATRIX | `String` |        | 百叶窗加载动画方式 |
| SEMICIRCLE | `String`  |        | 线条旋转加载动画方式 |

## <a id="face-parameters-threshold"></a>threshold 参数详细说明
`当前对象，只针对于人脸登录模式`

| 名称          | 类型       | 默认值        | 描述     |
|-------------|----------|------------|--------|
| lips | `Number` |     0.05       | 张张嘴的阈值 |
| eye | `Number` |     0.011   | 眨眨眼的阈值 |
| headShake | `Number` |     0.01   | 摇摇头的阈值 |

## <a id="face-parameters-before"></a> before 使用方式

```javascript

effet.init({
    el: 'myface',
    blur: 8,
    dataRange: [1, 1.5, 2.1],
    face: {
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    },
    type:effet.FACE_TYPE.LOGIN,
    threshold:{
        lips:0.05,
        eye:0.011,
        headShake:0.01,
    },
    /**
     * @param appData 当前框架内置对象所有属性值
     * @param currentObj 当前对象
     * @param callBackResult 回调函数
     * @param stopRecording 停止录制
     * @param startRecording 重新开始录制，可以不用调用，可以直接调用effet.restart方法
     */
    before:(appData,currentObj,callBackResult,stopRecording,startRecording)=>{
        console.log(appData)
        console.log(currentObj)
        // 调用回调函数
        callBackResult(currentObj, '请张张嘴巴');
        // 停止录制
       // stopRecording(currentObj)
    }
});

```

## <a id="face-parameters-action"></a>action 使用方式

```javascript
let result = 0;
effet.init({
        el: 'myface',
        blur: 8,
        dataRange: [1, 1.5, 2.1],
        face: {
            maxNumFaces: 1,
            refineLandmarks: true,
            minDetectionConfidence: 0.5,
            minTrackingConfidence: 0.5
        },
        type:effet.FACE_TYPE.LOGIN,
        threshold:{
            lips:0.05,
            eye:0.011,
            headShake:0.01,
        },
        /**
         * @param appData 当前框架内置对象所有属性值
         * @param results 人脸关键点位
         * @param currentObj 当前对象
         * @param callBackResult 回调函数
         * @param stopRecording 停止录制
         * @param startRecording 重新开始录制，可以不用调用，可以直接调用effet.restart方法
         */
        action:(appData,results,currentObj,callBackResult,stopRecording,startRecording)=>{
                const landmarks = results.multiFaceLandmarks[0]; // 拿到第0张人脸，可循环
                // 获取面部关键点
                const upperLipBottom = landmarks[13];
                const lowerLipTop = landmarks[14];
                const leftEyeTop = landmarks[159];
                const leftEyeBottom = landmarks[145];
                const rightEyeTop = landmarks[386];
                const rightEyeBottom = landmarks[374];
                const noseTip = landmarks[1]; // 鼻尖的标记点
                result += noseTip.y;
                if (result >= 200){
                    stopRecording(currentObj)
                }
                console.log(result)
        }
    });

```

## <a id="face-parameters-face-style"></a> faceStyle 参数详细
`faceStyle对象本身是非必填的，以及它下面的子对象也是非必填，填了就应用对应的颜色`
```javascript
 effet.init({
    el: 'myface',
    blur: 8,
    dataRange: [1, 1.5, 2.1],
    face: {
        maxNumFaces: 1,
        refineLandmarks: true,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    },
    type:effet.FACE_TYPE.LOGIN,
    threshold:{
        lips:0.05,
        eye:0.011,
        headShake:0.01,
    },
    faceStyle: {
        faceColor: { // 整个人脸网格颜色
            color:'#21d86e', // 线条颜色
            line:1 // 线条粗度
        },
        rightEye:{ // 右眼颜色
            color:'#297ae9',
            line:2,
        },
        rightEyebrow:{ // 右眉毛
            color:'#297ae9',
            line:2,
        },
        rightIris:{ // 右眼珠
            color: 'red',
            line:1
        },
        leftEye:{ // 左眼颜色
            color: 'red',
            line:1
        },
        leftEyebrow:{ // 左眉毛
            color: 'blue',
            line:1
        },
        leftIris:{ // 左眼珠
            color: 'blue',
            line:1
        },
        oval:{ // 脸型最外层轮廓颜色
            color: 'blue',
            line:1
        },
        lips:{ // 嘴唇颜色
            color: 'red',
            line:1
        }
    }
});
```

## <a id="face-parameters-faceTemplate"></a> faceTemplate 参数详细

| 名称          | 类型                 | 默认值            | 描述                                                                                                                                                        |
|-------------|--------------------|----------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| size | `FACE_SIZE`            | FACE_SIZE.MID  | 当前模板大小，一共3种类型<br><a href="#face-parameters-FACE_SIZE" style="color:blue; text-decoration:none; font-weight:bold;">点击查看详细参数</a>                            |
| type | `FACE_TEMPLATE`       | FACE_TEMPLATE.FACE_RULE | 模板类型,每个领域有不同的模板，人脸登录，人脸打卡，睡眠检测都有各自的模板<br><a href="#face-parameters-FACE_TEMPLATE" style="color:blue; text-decoration:none; font-weight:bold;">点击查看详细参数</a> |
| tips | `Boolean` | true           | 是否开启顶部的提示                                                                                                                                                 |


## <a id="face-parameters-FACE_SIZE"></a> faceTemplate.size 参数解释

| 名称          | 类型        | 默认值        | 描述  |
|-------------|-----------|------------|-----|
| MAX | `String`  |        | 最大  |
| MID | `String` |        | 一般  |
| MIN | `String`  |        | 最小  |


## <a id="face-parameters-FACE_TEMPLATE"></a> faceTemplate.type 参数解释


| 名称          | 类型        | 应用范围     | 效果描述                       |
|-------------|-----------|----------|----------------------------|
| FACE_RULE | `String`  | `人脸登录模式` | 效果一个圆圈带水波纹的效果，有顶部提示框，和半截提示 |

`使用方式,在调用之前需要先使用主对象来调用，如：FACE_TYPE，FACE_SIZE，FACE_TEMPLATE来点下面的字段`

```javascript
  effet.init({
        el: 'myface',
        type:effet.FACE_TYPE.LOGIN,
        faceTemplate:{
            size:effet.FACE_SIZE.MID,
            type:effet.FACE_TEMPLATE.FACE_RULE,
            tips:false
        }
    });
```

## <a id="face-parameters-callBack"></a> callBack 回调函数

```javascript
  effet.init({
    el: 'myface',
    callBack: (data) => {
        // 当前打印每一步进行的消息，具体可查看下面参数解释
        console.log(data);
    }
});
```
## callBack 回调返回参数解释


| 名称          | 类型            | 描述                                                |
|-------------|---------------|---------------------------------------------------|
| videoElement | `HTMLElement` | 当前人脸video标签视频的元素                                  |
| canvasElement | `HTMLElement` | 当前人脸canvas标签的元素                                   |
| progress_message | `String`      | 正在进行哪一步的回调消息                                      |
| parentElement | `HTMLElement` | 当前el元素，整个主体，最外层                                   |
|step| `Number`      | 进行到了哪一步，返回数字类型                                    |
|base64Array| `Array`       | 当前人脸图片                                            |
|video| `MP4`         | 人脸拍摄视频，只有人脸登录模式才有，其他模式为NULL                       |
|secretKey| `String`      | 唯一密钥值，同时当前图片的左上角和右下角也被注入了水印密钥值，可一并传入后台根据密钥对比来当前图片 |
