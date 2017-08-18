/**
 * @author Merrier
 * QQ:953075999
 * @website: http://www.merrier.wang
 * @name github-fork-ribbon 0.2.0
 * @description 用于为网页生成fork github按钮的原生JS插件
 *
 * 调用方法：
 * 提供 var githubForkRibbon = new githubFork() 构造函数，构建githubFork实例
 */

;(function (window, undefined) {

    // 开启严格模式
    "use strict";

    // 工具函数

    // 添加样式
    function addStyle(css) {
        var style = document.createElement("style");
        style.type = "text/css";
        try {
            style.appendChild(document.createTextNode(css));
        } catch (ex) {
            style.styleSheet.cssText = css;
        }
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    // 对象合并
    function extend(o, n, override) {
        for (var key in n) {
            if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
                o[key] = n[key];
            }
        }
        return o;
    }

    // 判断当前userAgent
    function isMobile() {
        return /Mobile/i.test(navigator.userAgent);
    }

    // 解析query
    function queryExtract(paras) {
        var url = location.search;
        var paraString = url.substring(1).split("&");
        var paraObj = {};
        for (var i = 0, len = paraString.length; i < len; i++) {
            var j = paraString[i];
            if (j) {
                paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
            }
        }

        if (!paras) return paraObj;
        var returnValue = paraObj[paras.toLowerCase()];
        return returnValue ? returnValue.trim() : "";
    }

    // 生成跳转链接
    function getUrl(opt_url) {
        var hostName = location.hostname;
        var index = hostName.indexOf('.github.io');
        var query = queryExtract('githubFork');
        var realUrl = opt_url;

        if (realUrl === defaults.url) {   // 用户没有自定义url参数
            if (index !== -1) {
                realUrl = '//github.com/' + hostName.slice(0, index);
            } else if (!!query) {
                realUrl = '//github.com/' + query;
            }
        }
        return realUrl;
    }

    // 生成类名
    function classNameCreate(pos, type) {
        var result = 'github-fork-ribbon';

        if (!!pos && pos.indexOf('left') !== -1) {
            result += ' gf-ribbon-left';
        }
        if (!!pos && pos.indexOf('bottom') !== -1) {
            result += 'gf-ribbon-bottom';
        }
        if(!!type){
            result += ' gf-ribbon-' + type;
        }
        return result;
    }

    // 默认参数
    var defaults = {
        text: 'Fork me on Github', // 展示文本,请不要过长或过短，目前无法根据文本长度动态改变ribbon大小
        url: '//github.com/merrier/', // 跳转链接
        position: ['right', 'top'], // 位置，array类型
        type: 'black',  // 样式类型，目前只支持四种：'black','orange','red',green
        zIndex: 2,  // 层级
        fixed: false,   // 是否position设置为fixed
        target: '_blank', // 何处打开链接，和a标签的target属性一致
        fontSize: '13px', // 字体大小,
        isMobileHide: false //移动端是否隐藏
    };

    // 插件构造函数
    var githubFork = function (opt) {
        githubFork.prototype.options = extend(defaults, opt, true); //初始化时配置参数
        return githubFork.prototype.init(this.options);
    };

    githubFork.prototype = {
        constructor: githubFork,
        _setStyle: function (dom, opt) {
            dom.className = classNameCreate(opt.position, this.options.type);
            dom.setAttribute('target', opt.target || this.options.target);
            dom.setAttribute('href', getUrl(opt.url || this.options.url));
            dom.setAttribute('data-ribbon', opt.text || this.options.text);
            dom.setAttribute('title', opt.text || this.options.text);
            dom.style.zIndex = opt.zIndex || this.options.zIndex;
            dom.style.fontSize = opt.fontSize || this.options.fontSize;
        },
        _getDom: function () {
            return document.getElementsByClassName('github-fork-ribbon')[0];
        },
        create: function (opt, callback) {
            this.options = extend(githubFork.prototype.options, opt, true); // 如果用户调用create()时传入参数，需要重置参数
            if (!this.hasDom) {
                var node = document.createElement('a');
                this._setStyle(node, this.options);
                document.getElementsByTagName('body')[0].appendChild(node);
            } else {
                this._setStyle(this._getDom(), opt);
            }
            this.hasDom = true;
            if (isMobile() && this.options.isMobileHide) {
                this.hide();
            }
            callback && callback();
            return this;
        },
        show: function (callback) {
            if (this.hasDom) {
                var node = this._getDom();
                node.style.display = 'block';
            }
            callback && callback();
            return this;
        },
        hide: function (callback) {
            if (this.hasDom) {
                var node = this._getDom();
                node.style.display = 'none';
            }
            callback && callback();
            return this;
        },
        remove: function (callback) {
            if (this.hasDom) {
                var node = this._getDom();
                document.getElementsByTagName('body')[0].removeChild(node);
                this.hasDom = false;
            }
            callback && callback();
            return this;
        },
        config: function (opt, callback) {
            if (this.hasDom && opt) {
                this._setStyle(this._getDom(), opt);
            }
            callback && callback();
            return this;
        }
    };

    // 初始化方法
    githubFork.prototype.init = function (options) {
        this.hasDom = false; //检查dom树中githubFork的节点是否存在
        return this.create(options);
    };

    // 初始化实例时即调用init方法
    githubFork.prototype.init.prototype = githubFork.prototype;

    // 暴露接口(支持CMD、AMD规范)
    if (typeof module !== "undefined" && module.exports) {
        module.exports = githubFork;
    } else if (typeof define === "function" && define.amd) {
        define(function () {
            return githubFork;
        });
    } else {
        window.githubFork = githubFork;
    }

    // 通过自执行函数将样式添加至head
    (function () {
        var css = '.github-fork-ribbon {width: 12.1em;height: 12.1em;position: absolute;overflow: hidden;top: 0;right: 0;z-index: 2;font-size: 13px;text-decoration: none;text-indent: -999999px;}.github-fork-ribbon:before, .github-fork-ribbon:after{position: absolute;display: block;width: 15.38em;height: 1.54em;top: 3.23em;right: -3.23em; -webkit-box-sizing: content-box; -moz-box-sizing: content-box;box-sizing: content-box; -webkit-transform: rotate(45deg); -moz-transform: rotate(45deg); -ms-transform: rotate(45deg); -o-transform: rotate(45deg);transform: rotate(45deg);}.github-fork-ribbon:before {content: "";padding: .38em 0;background-color: #333;background-image: -webkit-gradient(linear, left top, left bottom, from(rgba(0, 0, 0, 0)), to(rgba(0, 0, 0, 0.15)));background-image: -webkit-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));background-image: -moz-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));background-image: -ms-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));background-image: -o-linear-gradient(top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15));background-image: linear-gradient(to bottom, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.15)); -webkit-box-shadow: 0 0.15em 0.23em 0 rgba(0, 0, 0, 0.5); -moz-box-shadow: 0 .15em .23em 0 rgba(0, 0, 0, 0.5);box-shadow: 0 0.15em 0.23em 0 rgba(0, 0, 0, 0.5);pointer-events: auto;}.github-fork-ribbon:after {content: attr(data-ribbon);color: #fff;font: 700 1em "Helvetica Neue", Helvetica, Arial, sans-serif;line-height: 1.54em;text-decoration: none;text-shadow: 0 -0.08em rgba(0, 0, 0, 0.5);text-align: center;text-indent: 0;padding: .15em 0;margin: .15em 0;border-width: .08em 0;border-style: dotted;border-color: #fff;border-color: rgba(255, 255, 255, 0.7);}.github-fork-ribbon.gf-ribbon-fixed {position: fixed;}.github-fork-ribbon.gf-ribbon-left {left: 0;right: auto;}.github-fork-ribbon.gf-ribbon-bottom {top: auto;bottom: 0;}.github-fork-ribbon.gf-ribbon-left:before,.github-fork-ribbon.gf-ribbon-left:after {left: -3.23em;right: auto;}.github-fork-ribbon.gf-ribbon-left.gf-ribbon-top:before,.github-fork-ribbon.gf-ribbon-left.gf-ribbon-top:after,.github-fork-ribbon.gf-ribbon-right.gf-ribbon-bottom:before,.github-fork-ribbon.gf-ribbon-right.gf-ribbon-bottom:after { -webkit-transform: rotate(-45deg); -moz-transform: rotate(-45deg); -ms-transform: rotate(-45deg); -o-transform: rotate(-45deg);transform: rotate(-45deg);}.github-fork-ribbon.gf-ribbon-black:before {background-color: #333;}.github-fork-ribbon.gf-ribbon-red:before {background-color: #a00;}.github-fork-ribbon.gf-ribbon-orange:before {background-color: #f80;}.github-fork-ribbon.gf-ribbon-green:before {background-color: #090;}';
        addStyle(css);
    })();

    // 判断hostname和query是否存在
    if (location.hostname.indexOf('.github.io') !== -1 || !!queryExtract('githubFork')) { // 自动生成按钮
        return window.githubForkRibbon = new githubFork({url: getUrl(defaults.url)});
    }

})(window);