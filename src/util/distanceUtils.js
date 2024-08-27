export function distance (point1, point2){
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
}


export function calculateDistance(point1, point2) {
    if (!point1 || !point2) {
        return null;
    }
    return Math.sqrt(
        Math.pow((point1.x - point2.x), 2) + Math.pow((point1.y - point2.y), 2)
    );
}
