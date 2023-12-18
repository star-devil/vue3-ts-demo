/*
 * @Author: wangqiaoling
 * @Date: 2023-12-18 10:17:06
 * @LastEditTime: 2023-12-18 10:29:05
 * @LastEditors: wangqiaoling
 * @Description: Iconify Icon在Vue里本地使用（用于内网环境）https://docs.iconify.design/icon-components/vue/offline.html
 */
import { Icon as IconifyIcon, addIcon } from "@iconify/vue/dist/offline";
import { defineComponent, h } from "vue";

export default defineComponent({
  name: "IconifyIconOffline",
  components: { IconifyIcon },
  props: {
    icon: {
      default: "",
    },
  },
  render() {
    if (typeof this.icon === "object") addIcon(this.icon, this.icon);
    const attrs = this.$attrs;
    return h(
      IconifyIcon,
      {
        icon: this.icon,
        style: attrs?.style
          ? Object.assign(attrs.style, { outline: "none" })
          : { outline: "none" },
        ...attrs,
      },
      {
        default: () => [],
      }
    );
  },
});
