/*
 * @Author: wangqiaoling
 * @Date: 2023-12-18 14:07:09
 * @LastEditTime: 2023-12-18 17:08:29
 * @LastEditors: wangqiaoling
 * @Description: 数据加密解密党发
 */
import CryptoJS from "crypto-js";

const key = "r4lHpyNLtXMgsIFviyIVjFNi0nNSWuWrbFxeRT9USKTYZjbswzdMjymavWO2oYkF";
/**
 * 解密字符
 * @param {String} word 解密内容
 * @returns
 */

function plainTextDecrypt(word: string) {
  const decrypt = CryptoJS.AES.decrypt(word, key);
  return decrypt.toString(CryptoJS.enc.Utf8);
}

/**
 * 加密字符
 * @param {String} word 加密内容
 * @returns
 */
function plainTextEncrypt(word: string) {
  const encrypted = CryptoJS.AES.encrypt(word, key);
  return encrypted.toString();
}
/**
 * 解密对象
 * @param {string} data 解密内容
 * @returns
 */

function objectDecrypt(data: string) {
  const decrypt = CryptoJS.AES.decrypt(data, key);
  return JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
}

/**
 * 加密对象
 * @param {object} data 加密内容
 * @returns
 */
function objectEncrypt(data: object) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

export { objectDecrypt, objectEncrypt, plainTextDecrypt, plainTextEncrypt };
