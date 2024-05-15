---
title: 记录一次数据库被黑经历
published: 2024-05-13
description: ''
image: ''
tags: [mysql]
category: 'mysql'
draft: false 
---

# 起因
由于后端的数据量不大，我在开发需要用到 mysql 的时候就在服务器上启动了一个 mysql 容器。
直接使用 root 权限，密码直接 admin123。

以前也没有遇到过数据库被劫持的事件，周围的同事也没有这样的经历。

我虽然知道简单的密码不安全，但也没有往坏的方向去想。

# 经过
其实事情在一周前已经发生了。我早上日常登录前端，发现是接口报错。第一想法是：后台挂了。于是我去看了下 docker 服务，果然容器退出了！
那时我也没往北劫持的方面想，我以为是哪个同事误操作把库给弄没了（我以前也误操作过，直接清空了一个表）。

还好我有备份的习惯，而且这个库的表结构简单，数据也是一些简单的测试数据。使用 gorm 做一下数据库迁移很快把数据库的结构搭好了，再把备份的数据导进去，完事儿～


今天早上来看，数据库被删了。我意识到了有问题，不对劲，太不对劲了。

先按照以前的操作把数据恢复，后台服务重启起来，然后再开始探究原因。

<font color="green">第一步</font>就是去看日志。

mysql 有7种日志，我需要看数据库的操作日志，那就应该找 binlog。
先看看 binlog 开了没，`show variables like '%log_bin%'`
![](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/W7cN1h.png "binlog位置")
可以发现 binlog 是开启的，因为 mysql 默认开启 binlog 日志。
而且可以看到 binlog 的存储位置。

知道了该找谁了那么就进去 mysql 容器去瞧瞧：

`docker exec -it mysql /bin/bash`

`cd /var/lib/mysql`


![](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/cqZkXZ.png "binlog")

发现他们了！

从名字就可以发现，binlog 是一个二进制的日志文件，直接打开是不能读取的。得用 mysqlbinlog 这个工具。

由于我使用的是容器 mysql，找了一圈都没在容器里找到这个工具在哪里。

那就把他们导出到本地吧！还好当初做了日志的映射。

使用 scp 命令导出到本地。我本地有使用 brew 安装的 mysql 服务，因此有  mysqlbinlog 工具。

`mysqlbinlog ./binlog.000002 > text2.txt`

为便于查看 使用 vscode 打开 txt 文件。



<font color="green">第二步</font>就是在日志里扒拉记录了。

功夫不负有心人，我们找到他了！
![](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/YV35Jx.png "binlog content 1")

在清晨的 4:38 分，有人建了一个我没见过的表（前面还建了个同名的库）。

接着就是一系列的删表记录了。
![](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/kqea6M.png "binlog content 2")

![](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/F1QUBv.png "binlog content 3")


<font color="green">第三步</font>就是恢复数据。
这一步是使用 binlog 的恢复点来恢复数据了。
我没有这样做，因为我有备份，而且数据不太重要。

<font color="green">第四步</font>就是加强数据库的安全了。

（1）更改密码，使用复杂的数据库密码。我想这次被劫持，大概率可能是密码被暴力破解了；

（2）添加子用户，绝对不能使用 root 去裸奔；

（3）打开其他日志，例如 general-log 日志，这个默认是关闭的；

（4）有必要的话，可以做一个 slave 库去备份主库的数据。
# 总结
这次事件没啥大影响，但是也给我上了一课。

以后在工作中要更加重视数据安全和日志记录。日志真的是一个寻根究底、按图索骥的好东西。



