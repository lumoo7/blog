---
title: 怎样在github上发布go开源项目
published: 2024-03-01
description: ''
image: ''
tags: []
category: ''
draft: false 
---
# 在github上放开源项目
在踩了一些坑之后，我终于走通了这个流程。
在github上发布go项目，主要经历下面的过程：
## 创建仓库
创建了一个名为mtool的仓库。
![创建仓库](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/y0RxRn.png)
## 初始化
```shell
git clone https://github.com/lumoo7/mtool.git

cd mtool

go mod init github.com/lumoo7/mtool
```
## 创建文件
在mtool目录中创建一个time_tool.go文件。
在文件中写入下面的代码做测试。
```go
package mtool

import "time"

func TimeFormat(t time.Time) string {
	return t.Format("2006.01.02 15:16:17")
}

func Now() string {
	return TimeFormat(time.Now())
}
```
## 推送到github
```shell
git add -A 
git commit -m "add time_tool.go"
git push
```
## 发布
![发布截图1](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/Yymo70.png)
![发布截图2](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/mBxSpY.png)

![发布截图3](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/oVmlYX.png)![发布截图4](https://raw.githubusercontent.com/lumoo7/picutre_bed/main/uPic/1s2VOI.png)
## 使用
```shell
go get github.com/lumoo7/mtool
```

```GO
package main

import (
	"fmt"
	"github.com/lumoo7/mtool"
) 

func main() {
	fmt.Println(mtool.Now())
}
```

# 项目结构和包名的关系

