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

* 如果你只需要默认的样式和位置，同时并不是通过Github Pages构建，那么你也可以通过添加query的形式直接使用插件，query的形式如下（当然，你也可以new一个实例进行更多配置）：

```bash
&githubFork=your-github-name
```

## 文档（Documentation）

### 配置项（Configuration）

`github-fork-ribbon`将首先判断当前URL中是否含有`.github.io`hostname或query`githubFork=your-github-name`，如果符合这两种情况，将默认生成一个按钮；否则需要new一个githubFork实例进行调用：
new实例类似于下面这种：

```js
var gf = new githubFork({
    text: 'Fork me on Github',
    url: '//github.com/merrier/',
    position: ['left', 'top'],
    type: 'red',
    zIndex: 2,
    fixed: false,
    target: '_top',
    fontSize: '14px',
    isMobileHide: true,
})
```

text: String

> default: 'Fork me on Github'

按钮的文本，因为没有加入过长隐藏的功能（0.2.0），所以请不要设置过长字符

url: String

> default: '//github.com/merrier/',

按钮跳转的链接

position: Array

> default: ['right', 'top']

按钮的位置，分为四种：右上、左上、右下、左下，请确保该配置项为这四种位置的数组

type: String

> default: 'black'

按钮的颜色类似，默认共有四种颜色（0.2.0），分别为黑色、红色、橘色和绿色，如下表所示：

配置项（Configuration）

因为可以通过三种方式




