/*
 * @Description: 自定义函数，将毫秒转换为更易读的格式
 */
import dayjs from "dayjs";
import duration from "dayjs/plugin/duration";

// 插件的注册
dayjs.extend(duration);

/**
 * 将毫秒转换为更易读的格式
 * @param ms 毫秒
 */
export function msToReadable(ms: number) {
  if (!ms) return "";
  if (ms < 1000) {
    return `${ms}毫秒`;
  }
  const durationObj = dayjs.duration(ms);
  return durationObj.humanize(); // 使用humanize方法简化输出
}

/**
 * 将秒转换为更易读的格式
 * @param s 秒
 */
export function sToReadable(s: number) {
  if (!s) return "";
  if (s < 60) {
    return `${s}秒`;
  }
  const durationObj = dayjs.duration(s);
  return durationObj.humanize(); // 使用humanize方法简化输出
}
