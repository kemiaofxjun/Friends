# 我的友链信息

```
title: 喵落阁
url: https://home.kemeow.top
avatar: https://www.gravatar.com/avatar/7614b285e795f21e780247019c4e15c4?s=256
description: 愿你看清一切真相后，依旧热爱你的家人和朋友。
```
## 基本要求
---
> 如果你和我很熟了的话，直接[发邮件](mailto:kemiaofriends@163.com)吧。

- 首先，希望您已经在您的站点上的友链板块添加了我的网站。
- 其次，您不是本着**卖广告**的目的来交换，您的网站属于**个人博客**。
- 网站的域名十分重要，如果是免费域名的话就请暂时不要考虑了~~，除非混熟了~~
    - 免费域名包括但不限于下述定义：
      - 由Freenom公司运营的免费域名后缀，如.ml、.tk
      - 部分企业的静态网站托管服务的默认域名，如：
        - oschina.io
        - gitee.io
        - coding.me
        - coding.io
        - coding-pages.com
        - ......
    - 免费域名不包括下述等定义：
      - 向Freenom公司付费购买的.ml、.tk等域名
      - 由Automattic公司运营的wordpress.com在线博客服务
      - 其他任何包含于Public Suffix List的免费子域名服务，如github.io，gitlab.io等
      - ......
- 您的网站应至少能从中国大陆正常访问
- 我诚恳地希望您的网站不要充斥着广告、洗稿、搬运等低质内容
  - 网站和博客可以长草，但不要滥竽充数
  - 最终解释权归我本人所有
- 您的站点符合中国大陆及中国香港的有关法律法规，不涉及敏感内容
- 此外，您还必须会使用`Git`与`GitHub`，设置此仓库即意在考验您最基本的使用技巧

## 开始交换
---
如果您认为您的站点符合上方的要求，那么**欢迎交换**！

### **注意：您提交的信息有可能被修改**

如果有修改，我会将修改内容在PR中进行告知
- 为了友链相关页面和组件的统一性和美观性，可能会对您的昵称进行缩短处理，例如昵称包含博客、XX的XX等内容或形式可能会被简化。
- 所有的友链链接要求为博客主页链接，而不是个人主页链接。

## 您要准备的

> 您的全部站点信息，包括您的站点本身，均应符合中国大陆及中国香港的有关法律法规，不涉及任何敏感内容

1. 自己站点的logo
  - Logo应为正方形或圆形
  - 使用常见图形文件格式（如`png`、`jpg`、`svg`等，不包括`tiff`、`gif`、`icns`）。
  - Logo必需符合**GravaterG分级**要求（即适合在任何网站上展示给**任何年龄段**的**任何人**）
  - 您站点的logo会被储存到我站的图床上并进行压缩，更新可能不及时，如需修改请提PR
2. 准备需要展示的站点名称
  - 站点名称应适合在任何网站上展示给任何年龄段的任何人
3. 准备一条站点描述（Slogan），不建议太长

## 交换步骤
1. 在`GitHub`上派生(`Fork`)这个仓库
2. 【可选但强烈建议】在`src/links.yml`目录中提交你的站点logo
  - 文件名格式为`[domain].[format]`，如`example.com.png`，`blog.example.com.jpg`
  - `commit`的标题应当名为`Add: [filename] ( [url] )`，如`Add: example.com.png ( https://example.com )`
  - 原则上应小于`1 MiB`
3. 修改`src/links.yml`文件和`links.json`
  - 按照如下格式将你的网站信息添加到 `links.yml` 文件的末尾：
  ```
  "Name": # 名称置于双引号之中，不要太长
    url: https://example.com/ # 网站的URL，注意缩进【是博客链接哦】
    img: https://xxx/xxx/xxx/[YOUR_FILE_HERE] # 网站 Logo 的 URL，将[YOUR_FILE_HERE]换成上面提交的图片，当然，自备图床更好
    text: "你的介绍" # 网站的 Slogan，置于双引号之中，注意缩进
  ```
- `commit`的标题应为`Add: [sitename] ( [url] )`，如`Add: example blog ( https://example.com )`
- 对于logo的链接，如果您执行了第二步，则将`[YOUR_FILE_HERE]`换成上面提交的图片的文件名，否则请填入您自行准备的链接，建议使用稳定的图床
    - logo的引用地址，您可以在`yandao.is-a.dev`与`source.friends.ydlk.cc`中任选其一，后者对中国大陆地区友好，但存在缓存延迟
4. 完成上述步骤后，请新建一个`Pull Request`
  - PR标题应为`Add: [sitename] ( [url] )`，如`Add: example blog ( https://example.com )`
  - 如有补充，请在PR中一并说明，例如特殊的RSS地址等
 
---
除了上述做法，完全不会的直接在[issue](https://github.com/kemiaofxjun/Friends/issues/1)里添加友链也行。

## 出现问题的友链
---
如果友链出现问题会展示在这里，不再进行友链相关审查，如果已解决问题还请主动告知。


> 如有恢复/误报，请联系我 <mailto:kemiaofriends@163.com>
> 
> 如因网站备案而无法访问的，会在这里一并展示出来。

