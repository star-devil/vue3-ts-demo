/*
 * @Author: wangqiaoling
 * @Date: 2024-03-26 10:35:16
 * @LastEditTime: 2024-03-28 17:39:08
 * @LastEditors: wangqiaoling
 * @Description: 封装表格内渲染的开关组件
 */
import { changeStatus } from "@api/mock/table";
/**
 * switch开关触发回调
 */
export function useTableSwitch(data: any) {
  const switchLoading = ref(false);

  const changeSwitch = (checked: string | boolean | number, record: any) => {
    switchLoading.value = true;
    changeStatus({ id: record.key, isOnline: checked })
      .then((res) => {
        data.value = res.data.content;
      })
      .finally(() => {
        switchLoading.value = false;
      });
  };
  const clickSwitch = (checked: boolean | string | number, cbData) => {
    console.log("switchClick-", checked, "cbData---", cbData);
  };

  return {
    changeSwitch,
    clickSwitch,
    switchLoading,
  };
}
