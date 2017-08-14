# github-fork-ribbon

一个自动为你的网页添加fork按钮的原生javascript插件，简单实用！

## 版本说明

### v0.1.0
* 生成ribbon之后可重新配置参数

### v0.2.0（最新）
* 样式大变样，可定制化选项更多
* 如果hostname中有'.github.io'，将不需配置即可生成ribbon

## 特色（Features）
github-fork-ribbon是原生javascript插件，不依赖任何库，同时具有以下特色：

* 支持自定义fork按钮样式

* 可以自动匹配[Github Pages](https://pages.github.com/)

* 支持CMD、AMD规范

用法（Usage）

下载：

[下载最新版本github-fork-ribbon]()

然后，引用以下两个文件：

```html
<link href='github-fork-ribbon.css' rel='stylesheet' />
<script src='github-fork-ribbon.js'></script>
```

然后，你可以通过两种种方式为你的网页生成fork按钮：

* new一个实例的方式，以下为一个简单示例（参数含义后面会介绍到）：

```javascript
var fg = new githubFork({
    type: 'orange',
    url: 'http://github.com/merrier/',
});
```

* 如果你的网页是通过Github Pages构建，那么如果你当前网页的location.hostname是XXXX.github.io的形式的话，插件将自动添加一个fork按钮到网页的右上角，同时指向为你的github地址；当然，你也可以通过上面的方式进行更多配置

* 如果你只需要默认的样式和位置，同时并不是通过Github Pages构建，那么你也可以通过添加query的形式直接使用插件，query的形式如下；同时，你也可以new一个示例进行更多配置：

```bash
&githubFork=your-github-name
```

文档（Documentation）

配置项（Configuration）

因为可以通过三种方式




