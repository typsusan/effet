let divHeight = 0;
const directions = {};
let size = 285;
let densityFactor = 0.3;
let spinnerFaceAddCreated = false; // 确保只创建一次

export default (obj) => {

    function createSpinnerFaceAdd(size, densityFactor) {
        if (spinnerFaceAddCreated) return; // 已创建则直接返回

        const parent = obj.parentElement;

        let wh = size - 40;

        parent.innerHTML = `
        <div class="spinnerFaceAdd" id="spinnerFaceAdd">
            <video id="visio-login-video" style="display: none; z-index: 1;" width="${wh}" height="${wh}"></video>
            <canvas id="visio-login-canvas" style="z-index: 1;" width="${wh}" height="${wh}"></canvas>
        </div>
        `;

        const spinnerFaceAdd = document.getElementById('spinnerFaceAdd');
        const numberOfDivs = Math.ceil(size * densityFactor); // 调整密集度
        const radius = size / 2; // 计算半径

        for (let i = 0; i < numberOfDivs; i++) {
            const div = document.createElement('div');
            const rotationDegree = (360 / numberOfDivs) * i; // 计算每个div的旋转角度
            div.style.height = `${radius / 8}px`; // 设置div的高度为半径大小的八分之一
            divHeight = radius / 4;
            div.style.transform = `rotate(${rotationDegree}deg) translate(0, ${radius}px)`; // 旋转并移到圆周
            div.style.setProperty('--rotation', `${rotationDegree}deg`);
            div.style.setProperty('--translation', `${radius}px`);
            spinnerFaceAdd.appendChild(div);
        }

        // 每个方向分配 90° 的角度范围，共 4 个方向
        directions.up = getDivsByAngleRange(315, 360, numberOfDivs).concat(getDivsByAngleRange(0, 45, numberOfDivs)); // 上
        directions.right = getDivsByAngleRange(45, 135, numberOfDivs); // 右
        directions.down = getDivsByAngleRange(135, 225, numberOfDivs); // 下
        directions.left = getDivsByAngleRange(225, 315, numberOfDivs); // 左

        spinnerFaceAddCreated = true; // 标记为已创建
    }

    function getDivsByAngleRange(startAngle, endAngle, totalDivs) {
        const divs = [];
        for (let i = 0; i < totalDivs; i++) {
            const rotationDegree = (360 / totalDivs) * i;
            if ((startAngle <= endAngle && rotationDegree >= startAngle && rotationDegree < endAngle) ||
                (startAngle > endAngle && (rotationDegree >= startAngle || rotationDegree < endAngle))) {
                divs.push(i);
            }
        }
        return divs;
    }

    // 初始化创建一次spinnerFaceAdd
    createSpinnerFaceAdd(size, densityFactor);

    // 传入方向并触发对应方向的动画
    function animation(direction) {
        const divs = document.querySelectorAll('.spinnerFaceAdd div');
        const activeDivs = directions[direction]; // 获取该方向的div索引

        activeDivs.forEach((index, i) => {
            setTimeout(() => {
                const div = divs[index];
                div.style.height = '0'; // 初始高度为0
                void div.offsetWidth; // 强制重绘
                div.classList.add('moveFaceAdd', 'activeFaceAdd');
                div.style.height = divHeight + 'px'; // 重新设置高度
            }, i * 100);
        });
    }

    function destroy(){
        const divs = document.querySelectorAll('.spinnerFaceAdd div');
        divs.forEach(ele => {
            ele.classList.remove('moveFaceAdd','activeFaceAdd')
        })
    }

    // 外部调用时直接返回animation方法
    return {
        animation,
        destroy
    };
};
