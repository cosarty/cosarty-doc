# linux 笔记

## 更新源

输入以下命令备份原来的源。

```shell
sudo cp /etc/apt/sources.list /etc/apt/sources.list.bak
```

再输入以下命令打开 sources.list 配置文件更换源。

```bash
sudo vim /etc/apt/sources.list
```

配置内容如下

```bash
deb http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-security main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-updates main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-proposed main restricted universe multiverse
deb-src http://mirrors.aliyun.com/ubuntu/ focal-backports main restricted universe multiverse
```

再输入命令更新源

```bash
sudo apt-get update
```

最后输入命令更新一下软件即可。

```bash
sudo apt-get upgrade
```
