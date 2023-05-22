
- 使用pnpm搭建monorepo

- .npmrc 文件目的就是将所有依赖的包都放到node_module中  shamefully-hoist = true

- pnpm-workspace.yaml  配置工作目录是packages目录下的包 主要是用来干啥的

- 支持typescript pnpm install typescript -w , pnpm tsc --init

- 两个包之间怎么相互依赖
