export function getTokenFromLocalStorage() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('token');
    }
    return null; // 或返回其他默认值
}

// 使用示例函数获取token
// import {getTokenFromLocalStorage} from "/lib/getTokenFromLocalStorage";
// console.log(getTokenFromLocalStorage());