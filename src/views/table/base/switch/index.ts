/*
 * @Author: wangqiaoling
 * @Date: 2024-03-26 10:35:16
 * @LastEditTime: 2024-03-26 10:39:33
 * @LastEditors: wangqiaoling
 * @Description: 封装表格内渲染的开关组件
 */
/**
 * switch开关触发回调
 */
export function useTableSwitch(data: any) {
  const changeSwitch = (checked, record) => {
    const index = Number(record.key);
    data[index - 1].status = checked ? "on" : "off";
  };
  const clickSwitch = (checked, record) => {
    console.log("switchClick-", checked, record);
  };
  return {
    changeSwitch,
    clickSwitch,
  };
}
