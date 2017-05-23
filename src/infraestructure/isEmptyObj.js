export default function isEmptyObj(obj){
    delete obj[""];
    return Object.getOwnPropertyNames(obj).length === 0;
}