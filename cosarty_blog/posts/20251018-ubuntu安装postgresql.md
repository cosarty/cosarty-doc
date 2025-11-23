---
tag:
  - 技巧
category:
  - 运维
date: 2025-10-18
---

# Ubuntu安装postgresql

**开始安装**

```bash
sudo apt update
sudo apt install postgresql postgresql-contrib
```

**配置文件**

```bash
/etc/postgresql/[version]/main/postgresql.conf
/etc/postgresql/[version]/main/pg_hba.conf
```

**查看可用命令**

```bash
service postgresql

```

进入到postgres用户：`sudo su postgres`

psql命令行,进去postgresql：`psql`

`\l`:列出所有数据库

`\c [database_name]`:连接到指定数据库

`\dt`:列出当前数据库中的所有表

`\q`:退出psql命令行

`\du`:列出所有用户

**创建用户和修改密码**

```sql  
ALTER USER postgres WITH PASSWORD '554d2032dffb19a316f809bf2a54e20b';

CREATE USER cosarty_engine WITH PASSWORD 'df053b62061f9b757677a1597ece61c0';

ALTER USER cosarty_engine WITH SUPERUSER;

DROP USER cosarty_engine;

CREATE DATABASE pod_engine;
```

`man psql`:查看psql命令手册

允许远程连接
编辑pg_hba.conf文件，添加如下内容：

```conf
host    all             all             0.0.0.0/0           scram-sha-256
```

修改 postgresql.conf文件，找到listen_addresses一行，修改为：

```conf
listen_addresses = '*'
```
