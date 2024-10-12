---
description: '使用github action 可持续集成部署阿里云'
tag:
  - vue
  - cicd
category: 
  - 前端
  - 部署
date: 2023-05-23
---

#  github action 部署阿里云

::: info

Github Actions是由Github创建的 CI/CD服务。 它的目的是使所有软件开发工作流程的自动化变得容易。 直接从GitHub构建，测试和部署代码。CI（持续集成）由很多操作组成，比如代码合并、运行测试、登录远程服务器，发布到第三方服务等等。GitHub 把这些操作就称为 actions。

:::



## 1、在项目下创建./github/workflow/deploy-docs.yml文件

```yaml
name: deploy to aliyun

on:
  push:
    branches: ['master']

jobs:
  deploy-website:
    runs-on: ubuntu-latest
    steps:
      # 切换分支
      - name: Checkout
        uses: actions/checkout@master
      - name: 安装 pnpm
        uses: pnpm/action-setup@v2
        with:
          version: 7
          run_install: true
      - name: 设置 Node.js
        uses: actions/setup-node@v3
        with:
          node-version: 16
          cache: pnpm
      # npm install and build
      - name: 安装依赖
        run: pnpm install --frozen-lockfile
        env:
          CI: true
      - name: 构建文档
        env:
          NODE_OPTIONS: --max_old_space_size=8192
        run: pnpm run docs:build
         # > cosarty_blog/.vuepress/dist/.nojekyll
      # Deploy to aliyun
      - name: 部署到阿里服务器
        uses: easingthemes/ssh-deploy@main
        env:
          SSH_PRIVATE_KEY: ${{ secrets.ALIYUN_SERVER_ACCESS_TOKEN }}
          ARGS: "-avz --delete"
          SOURCE: "cosarty_blog/.vuepress/dist/"
          REMOTE_HOST: ${{ secrets.ALIYUN_SERVER_HOST }}
          REMOTE_USER: root
          TARGET: /var/www/html/

```

Github Action 有下面这些概念

- **workflow**(工作流程)：指整个持续集成的流程，包含执行脚本任务、执行触发事件等
- **Events** （事件）：触发流程的钩子，例如提交代码触发，新建 Issues 触发等等。
- **Jobs** (任务)：每一个工作流程包含一个或多个任务，任务按顺序执行，每一个任务都会执行 shell 脚本。
- **Steps** (步骤)：每一个 `Job` 包含一个或多个 `Step`, Step 按顺序执行。
- **Actions**（动作): 每一个 `Step` 包含一个或多个 `Action`, 按顺序执行。
- **Runners**（执行环境): `workflow` 运行时的服务器，每一个 `Runner` 可以运行一个 `Job`.

## 2.ssh 密钥配置

进入你的云服务器，执行以下命令生成密钥

```bash
cd /root/.ssh
ssh-keygen -m PEM -t rsa -b 4096 -C "你的git邮箱地址"
```

不断点空格完成密钥生成，会生成私钥`id_rsa`，公钥`id_rsa.pub`

复制~~公钥~~私钥，到以下文件

```bash
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

然后在github->setting->ssh 里创建你的公钥，title无所谓

![1685000730582](../.vuepress/public/assets/posts/20230523/1685000730582.png)

然后进入你的项目setting，配置域名和私钥，私钥记得全部复制过来，包括(-----BEGIN RSA PRIVATE KEY-----)

New 一个 secret，名字叫ALIYUN_SERVER_ACCESS_TOKEN，然后把刚刚复制的值放进去，保存
接着再创建几个

```bash
ALIYUN_SERVER_HOST = 阿里云服务器的地址
ALIYUN_REMOTE_USER = 阿里云user，一般是root
ALIYUN_TARGET = 目标路径
```

![1685000807965](../.vuepress/public/assets/posts/20230523/1685000807965.png)

然后就可以看到你的action开始执行了

![1685000847831](../.vuepress/public/assets/posts/20230523/1685000847831.png)

如果有报错，permission denied，到服务器上执行

```bash
chmod 700 /root/.ssh/authorized_keys
```

## 3.可能出现的错误

### 报错bash: rsync: command not found

这是因为服务器没有安装rsync
去安装rsync即可：

```bash
yum install rsync
```

### 报错 Load key “/home/runner/.ssh/deploy_key”: invalid format

说明ssh的key格式不匹配，可以参考上面配置 secret重新生成key，也可以将现有的转换成PEM格式：

```bash
ssh-keygen -p -f ~/.ssh/id_rsa -m pem
```

