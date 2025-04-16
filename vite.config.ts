import vue from "@vitejs/plugin-vue";
import { resolve } from "path";
import { ConfigEnv, UserConfigExport, defineConfig, loadEnv } from "vite";

// 在启动项目和打包代码时进行代码检查, 如果检查有error类型的问题就启动或打包失败, warn类型的问题不影响启动和打包
import eslint from "vite-plugin-eslint";
// 自动导入vue中hook reactive ref等
import AutoImport from "unplugin-auto-import/vite";
// 自动导入ui-组件 比如说ant-design-vue  element-plus等
import Components from "unplugin-vue-components/vite";
// 如果你使用了antdv：antdv自动按需引入组件
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
// 自动添加浏览器前缀
import autoprefixer from "autoprefixer";
// tailwindcss
import tailwindcss from "tailwindcss";
// mockJS
import { viteMockServe } from "vite-plugin-mock";
// vite对commonjs兼容性太差
import { viteCommonjs } from "@originjs/vite-plugin-commonjs";

// https://vitejs.dev/config/
export default ({ command, mode }: ConfigEnv): UserConfigExport => {
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
        resolvers: [
          // 如果你使用了antdv：
          AntDesignVueResolver({
            importStyle: false, // css in js
            resolveIcons: true, // 自动导入图标
          }),
        ],
      }),
      eslint({ lintOnStart: true, cache: false }),
      viteMockServe({
        mockPath: "./mock",
        localEnabled: command === "serve",
        prodEnabled: true,
        injectCode:
          "import { setupProdMockServer } from './api/mock/_mockProdServer.ts'; setupProdMockServer();",
        supportTs: true,
      }),
      viteCommonjs(),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: "@import '@/styles/theme.scss';",
        },
      },
      postcss: {
        // 关键代码
        plugins: [
          autoprefixer({
            // 自动添加前缀
            overrideBrowserslist: [
              "Android 4.1",
              "iOS 7.1",
              "Chrome > 31",
              "ff > 31",
              "ie >= 8",
              //'last 2 versions', // 所有主流浏览器最近2个版本
            ],
            grid: true,
          }),
          tailwindcss,
        ],
      },
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "src"),
        "@api": resolve(__dirname, "src/api"),
        "@store": resolve(__dirname, "src/store"),
        "@utils": resolve(__dirname, "src/utils"),
        "@assets": resolve(__dirname, "src/assets"),
        "@router": resolve(__dirname, "src/router"),
        "@types": resolve(__dirname, "types"),
      },
    },
    // 在.env.production文件中配置VITE_DROP_CONSOLE = true,
    // 打包时自动去除console和debugger
    esbuild: {
      drop: env?.VITE_DROP_CONSOLE === "true" ? ["console", "debugger"] : [],
    },
    server: {
      host: "0.0.0.0", // 指定服务器主机名
      port: 8000, // 指定服务器端口
      hmr: true, // 开启热更新
      open: true, // 在服务器启动时自动在浏览器中打开应用程序
      https: false, // 是否开启 https
      proxy: {
        // "/proxy-api": {
        //   target: "http://XX.XX.XX.XX:XXXX/",
        //   changeOrigin: true,
        //   rewrite: (path) => path.replace(RegExp("/proxy-api"), ""),
        // },
      },
    },
  });
};
