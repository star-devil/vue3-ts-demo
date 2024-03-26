/*
 * @Author: wangqiaoling
 * @Date: 2024-03-26 10:35:16
 * @LastEditTime: 2024-03-26 13:14:52
 * @LastEditors: wangqiaoling
 * @Description: 封装表格内渲染的开关组件
 */
import { changeStatus } from "@api/mock/table";
/**
 * switch开关触发回调
 */
export function useTableSwitch(data: any) {
  const changeSwitch = async (checked: boolean, record: any) => {
    changeStatus({ id: record.key, isOnline: checked }).then((res) => {
      data.value = res.data.content;
    });
  };
  const clickSwitch = (checked, record) => {
    console.log("switchClick-", checked, record);
  };
  return {
    changeSwitch,
    clickSwitch,
  };
}
