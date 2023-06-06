
- 使用pnpm搭建monorepo

- .npmrc 文件目的就是将所有依赖的包都放到node_module中  shamefully-hoist = true

- pnpm-workspace.yaml  配置工作目录是packages目录下的包 主要是用来干啥的

- 支持typescript pnpm install typescript -w , pnpm tsc --init

- 两个包之间怎么相互依赖

- 打包之后的种类 1. esm-bundler 2. esm-browser 3. cjs 4. global 这几种有什么区别

- runtime-dom(浏览器操作的api，dom的增删改查) / runtime-core
