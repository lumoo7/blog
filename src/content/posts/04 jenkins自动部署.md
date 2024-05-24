---
title: jenkins自动部署
published: 2024-05-21
description: ''
image: ''
tags: [jenkins]
category: 'jenkins'
draft: false 
---

# devops
在我的理解中，devops是通过自动化流程来使得软件构建、测试、发布更加快捷、频繁和可靠。

最经典的devops能力环图片：
![](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/CVXq3e.png "devops能力环")

devops的好处：
1. 持续、高效交付；
2. 快速部署，提高稳定性；

实现devops的工具：
1. 代码仓库
2. 构建工具
3. 自动部署
4. 持续集成
5. 配置管理
6. 容器
7. 编排
8. 服务注册与发现
9. 脚本语言
10. 日志管理
11. 系统、性能监控
12. 压力测试
13. 项目管理

# 使用jenkins
如果按照devops能力环来实施devops，那将是一个非常复杂的过程。回涉及到项目管理、产品、开发、测试、运营等多个岗位。

不过在我们这个小小小小小小小厂，肯定是一人身兼多职，就用不到如此多岗位的参与（就没有这么完善的岗位）。

在“<font color="orange">只要跑起来就行</font>”的方针指导下，我开始了我的jenkins初尝试。

<font color="green">第一步</font>安装jenkins
```shell
docker pull jenkins
docker run -d \
    --name jenkins \
    -v /usr/bin/docker:/usr/bin/docker \
    -v /var/run/docker.sock:/var/run/docker.sock \
    -p 10011:10011 \
    8e7bd57a40fa
```
注意一定要把`docker`和`docker.sock`这两个加进卷里，因为我们是想在jenkins容器里面使用docker。如果直接在jenkins里面再去下载安装docker客户端的话，那容器就太大了，不符合我们想要的简短、尽量小的要求。

注意：如果像上面的操作，那么jenkins就会获得外部docker客户端的使用权限。

<font color="green">第二步</font>配置jenkins

等jenkins跑起来，咱就可以访问他的控制面板了。

直接访问：http://www.服务器IP:10011

![](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/j1LUhN.png "jenkins登录界面")

用户名和密码可以在日志里看到。

![](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/TQ85Q6.png "jenkins界面")

新建任务。

选用git做源码管理。

![alt text](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/GKu2cf.png "git")

使用hook作为构建触发。

![](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/uDBlc4.png "hook")

因为使用的是docker构建的，就不需要再弄其他的环境了。

直接执行shell命令就好了。
![](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/fpYJze.png "build shell")


```shell
docker rmi $(docker images -f "dangling=true" -q) || true

cd /var/jenkins_home/workspace/devops_back
docker stop devops_back || true
docker rm devops_back || true
docker rmi devops_back || true
docker build -t devops_back .
docker run --name devops_back -d -p 10020:10020 -p 10021:10021 -p 10022:10022 --network web-network --network-alias web devops_back
```



