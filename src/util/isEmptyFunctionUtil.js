export default (func,name)=>{
    if (typeof func !== 'function') return
    let funcString = func.toString().trim();
    funcString = funcString.replace(/\/\/.*$/mg, '')
        .replace(/\/\*[\s\S]*?\*\//g, '');
    const bodyMatch = funcString.match(/{([\s\S]*)}/);
    if (bodyMatch && bodyMatch[1].trim().length === 0) {
        console.warn("The '"+name+"' function is a null function and does not perform any action")
    }
}
