/*
 * @Author: wangqiaoling
 * @Date: 2024-03-26 10:35:16
 * @LastEditTime: 2024-03-27 15:56:59
 * @LastEditors: wangqiaoling
 * @Description: 封装表格内渲染的开关组件
 */
import { changeStatus } from "@api/mock/table";
/**
 * switch开关触发回调
 */
export function useTableSwitch(data: any) {
  const changeSwitch = (checked: string | boolean | number, record: any) => {
    return new Promise((resolve, reject) => {
      changeStatus({ id: record.key, isOnline: checked })
        .then((res) => {
          data.value = res.data.content;
          resolve("success");
        })
        .catch(() => {
          reject("fail");
        });
    });
  };
  const clickSwitch = (checked: boolean | string | number, e: Event) => {
    console.log("switchClick-", checked, e);
  };
  return {
    changeSwitch,
    clickSwitch,
  };
}
