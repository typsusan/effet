export default (obj = {})=>{
    obj.width = obj.width || 640;
    obj.height = obj.height || 480;
    obj.blur = obj.blur || 8;
    if (!obj.faceStyle) {
        obj.faceStyle = {};
        obj.faceStyle.faceColor = {
            color: '#2cc1dc',
            line: 1
        };
    } else {
        if (!obj.faceStyle.faceColor) {
            obj.faceStyle.faceColor = {
                color: '#2cc1dc',
                line: 1
            };
        } else {
            if (!obj.faceStyle.faceColor.color) {
                obj.faceStyle.faceColor.color = '#2cc1dc';
            }
            if (typeof obj.faceStyle.faceColor.line !== 'number') {
                obj.faceStyle.faceColor.line = 1;
            }
        }
    }
}
