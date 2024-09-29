export default (appData,landmarks, currentObj, property) =>{
    const canvasWidth = appData.canvasElement.width;
    const leftCheek = landmarks[234];
    const rightCheek = landmarks[454];
    // 检查关键点是否存在
    if (!leftCheek || !rightCheek) {
        return false;
    }
    const headWidth = Math.abs(rightCheek.x - leftCheek.x) * canvasWidth;
    const distance = (canvasWidth * 0.5) / headWidth * 10;
    return distance <= currentObj[property];
}
