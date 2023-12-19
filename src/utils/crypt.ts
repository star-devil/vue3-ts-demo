/*
 * @Author: wangqiaoling
 * @Date: 2023-12-18 14:07:09
 * @LastEditTime: 2023-12-19 09:39:22
 * @LastEditors: wangqiaoling
 * @Description: 数据加密解密
 */
import CryptoJS from "crypto-js";

const key = "r4lHpyNLtXMgsIFviyIVjFNi0nNSWuWrbFxeRT9USKTYZjbswzdMjymavWO2oYkF"; // 生成密钥请妥善保存，不要硬编码在代码中；最好放入环境变量或者由服务端返回。此处只用作示范

/**
 * 加密对象
 * @param {any} data 加密内容
 * @returns
 */
function dataEncrypt(data: any) {
  return CryptoJS.AES.encrypt(JSON.stringify(data), key).toString();
}

/**
 * 解密对象
 * @param {string} data 解密内容
 * @returns
 */
function dataDecrypt(data: string) {
  const decrypt = CryptoJS.AES.decrypt(data, key);
  return JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
}

export { dataDecrypt, dataEncrypt };
