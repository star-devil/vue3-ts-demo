import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { defineConfig, loadEnv } from "vite";

// 在启动项目和打包代码时进行代码检查, 如果检查有error类型的问题就启动或打包失败, warn类型的问题不影响启动和打包
import eslint from "vite-plugin-eslint";
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite";
//自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default ({ command, mode }) => {
  const env = loadEnv(mode, process.cwd());
  console.log(command);

  return defineConfig({
    plugins: [
      vue(),
      AutoImport({
        //安装两行后你会发现在组件中不用再导入ref，reactive等
        imports: ["vue", "vue-router"],
        //存放的位置
        dts: "src/auto-import.d.ts",
        // eslint报错解决
        eslintrc: {
          enabled: false, // Default `false`
          filepath: "./.eslintrc-auto-import.json", // Default `./.eslintrc-auto-import.json`
          globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
        },
      }),
      Components({
        // 引入组件的,包括自定义组件
        // 存放的位置
        dts: "src/components.d.ts",
      }),
      eslint({ lintOnStart: true, cache: false }),
    ],
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
      },
    },
    // 在.env.production文件中配置VITE_DROP_CONSOLE = true,
    // 打包时自动去除console和debugger
    esbuild: {
      drop: env?.VITE_DROP_CONSOLE === "true" ? ["console", "debugger"] : [],
    },
    server: {
      host: "localhost", // 指定服务器主机名
      port: 8880, // 指定服务器端口
      hmr: true, // 开启热更新
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
      https: false, // 是否开启 https
      proxy: {},
    },
  });
};
