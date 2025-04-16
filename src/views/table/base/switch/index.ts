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
  const clickSwitch = (checked: boolean | string | number, cbData: any) => {
    console.log("switchClick-", checked, "cbData---", cbData);
  };

  return {
    changeSwitch,
    clickSwitch,
    switchLoading,
  };
}
