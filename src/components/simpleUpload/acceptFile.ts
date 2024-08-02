/*
 * @Author: wangqiaoling
 * @Date: 2024-07-26 16:22:18
 * @LastEditTime: 2024-08-01 14:45:11
 * @LastEditors: wangqiaoling
 * @Description: 上传文件时接收的文件类型，如果在组件使用中没有限制上传文件类型，将会使用这个文件。
 */
export const ACCEPT_CONFIG = {
  image: [".png", ".jpg", ".jpeg", ".gif", ".bmp", ".webp"],
  video: [
    ".mp4",
    ".rmvb",
    ".mkv",
    ".wmv",
    ".flv",
    ".avi",
    ".m3u8",
    ".swf",
    ".3gp",
    ".flv",
  ],
  audio: [".mp3", ".wav", ".wma", ".ogg", ".aac", ".flac"],
  document: [
    ".doc",
    ".docx",
    ".xls",
    ".xlsx",
    ".ppt",
    ".pptx",
    ".pdf",
    ".txt",
    ".tif",
    ".tiff",
    ".rar",
    ".zip",
    ".pages",
    ".epub",
    ".pdf",
    ".numbers",
    ".csv",
    ".keynote",
  ],
  getAll() {
    return [...this.image, ...this.video, ...this.document];
  },
};
