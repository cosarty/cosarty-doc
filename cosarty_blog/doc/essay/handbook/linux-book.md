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

## systemctl 如何查看日志

1.查看服务的最新日志

```bash
# 基本格式
journalctl -u service-name

# 实际示例
journalctl -u nginx.service
journalctl -u docker.service
```

2.实时查看日志（类似 tail -f）

```bash
# 持续查看最新日志
journalctl -u service-name -f

# 查看最新的50行并持续追踪
journalctl -u service-name -n 50 -f
```

3.查看特定时间段的日志

```bash
# 查看今天的日志
journalctl -u service-name --since today

# 查看特定时间范围的日志
journalctl -u service-name --since "2024-01-01 00:00:00" --until "2024-01-02 00:00:00"

# 查看最近1小时的日志
journalctl -u service-name --since "1 hour ago"

```

4.查看启动时的日志

```bash
# 查看系统本次启动的日志
journalctl -u service-name -b

# 查看上次启动的日志
journalctl -u service-name -b -1
```

5.按照不同输出格式查看

```bash
# 输出简短信息
journalctl -u service-name -o short

# 输出详细信息
journalctl -u service-name -o verbose

# JSON格式输出
journalctl -u service-name -o json

# JSON格式且每行一个条目
journalctl -u service-name -o json-pretty
```

6.查看最近的日志条目

```bash
# 查看最后100行
journalctl -u service-name -n 100

# 查看最后200行
journalctl -u service-name -n 200
```

7.反向输出日志（最新的先显示）

```bash
journalctl -u service-name -r
```

8.查看系统启动时间

```bash

systemctl status

# 查看启动耗时
systemd-analyze

# 查看每个服务的启动耗时
systemd-analyze blame
```

9.结合 grep 使用

```bash
# 搜索包含特定关键字的日志
journalctl -u service-name | grep "error"

# 使用不区分大小写的搜索
journalctl -u service-name | grep -i "error"
```

### 实用技巧：

1.清理旧日志

```bash
# 只保留最近两天的日志
journalctl --vacuum-time=2d

# 只保留500M的日志
journalctl --vacuum-size=500M

```

2.查看日志占用空间

```bash
journalctl --disk-usage
```

3.导出日志

```bash
# 导出到文件
journalctl -u service-name > service-logs.txt

# 导出最近1000行
journalctl -u service-name -n 1000 > recent-logs.txt
```

4.组合使用多个选项

```bash
# 查看最近一小时的错误日志
journalctl -u service-name --since "1 hour ago" -p err

# 实时查看错误日志
journalctl -u service-name -p err -f
```
