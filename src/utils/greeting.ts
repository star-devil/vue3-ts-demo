/*
 * @Author: wangqiaoling
 * @Date: 2024-01-30 15:17:36
 * @LastEditTime: 2024-01-30 15:19:02
 * @LastEditors: wangqiaoling
 * @Description: 根据时间返回欢迎语
 */
export const getGreeting = () => {
  let greeting = "";

  const currentHour = new Date().getHours();

  if (currentHour >= 5 && currentHour < 12) {
    greeting = "早上好，新的一天开始了！";
  } else if (currentHour >= 12 && currentHour < 14) {
    greeting = "中午好，吃饭时间到了！";
  } else if (currentHour >= 14 && currentHour < 18) {
    greeting = "下午好，加油继续努力！";
  } else if (currentHour >= 18 && currentHour < 24) {
    greeting = "晚上好，放松一下吧！";
  } else {
    greeting = "夜深了，请注意休息，明天会更好！";
  }
  return greeting;
};
