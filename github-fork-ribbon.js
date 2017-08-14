/**
 * @author Merrier
 * QQ:953075999
 * @website: http://www.merrier.wang
 * @name github-fork-ribbon 0.2.0
 * @description 用于为网页自动生成fork github按钮的JS插件
 *
 * 调用方法：
 * 提供 var fg = new githubFork() 构造函数，构建githubFork实例
 */

;(function(window, undefined){

    // 开启严格模式
    "use strict";

    // 工具函数

    // 对象合并
    function extend(o,n,override) {
        for(var key in n){
            if(n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)){
                o[key]=n[key];
            }
        }
        return o;
    }

    // 判断当前userAgent
    function isMobile(){
        return /Mobile/i.test(navigator.userAgent);
    }

    // 解析query
    function queryExtract(paras) {
        var url = location.search;
        var paraString = url.substring(1).split("&");
        var paraObj = {};
        for (var i = 0, len=paraString.length; i < len; i++) {
            var j = paraString[i];
            if(j) {
                paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
            }
        }

        if(!paras) return paraObj;
        var returnValue = paraObj[paras.toLowerCase()];
        return returnValue ? returnValue.trim() : "";
    }

    // 生成跳转链接
    function getUrl(opt_url){
        var hostName = location.hostname;
        var index = hostName.indexOf('.github.io');
        var query = queryExtract('githubFork');
        var realUrl = opt_url;

        if(realUrl === defaults.url){   // 用户没有自定义url参数
            if(index !== -1) {
                realUrl = '//github.com/' + hostName.slice(0, index);
            }else if (!!query){
                realUrl = '//github.com/' + query;
            }
        }
        return realUrl;
    }

    // 生成类名
    function classNameCreate(pos,type){
        var base = 'github-fork-ribbon';
        var result = '';

        if(pos.indexOf('left') !== -1){
            base += ' gf-ribbon-left';
        }
        if(pos.indexOf('bottom') !== -1){
            base += 'gf-ribbon-bottom';
        }
        result = base + ' gf-ribbon-' + type;
        return result;
    }

    // 默认参数
    var defaults = {
        text : 'Fork me on Github', // 展示文本,请不要过长或过短，目前无法根据文本长度动态改变ribbon大小
        url : '//github.com/merrier/', // 跳转链接
        position: ['right','top'], // 位置，array类型
        type: 'black',  // 样式类型，目前只支持四种：'black','orange','red',green
        zIndex: 2,  // 层级
        fixed: false,   // 是否position设置为fixed
        target: '_blank', // 何处打开链接，和a标签的target属性一致
        fontSize: '13px', // 字体大小,
        isMobileHide: true //移动端是否隐藏
    };

    // 插件构造函数
    var githubFork = function(opt) {
        githubFork.prototype.options = extend(defaults,opt,true); //初始化时配置参数

        return githubFork.prototype.init(this.options);
    };

    githubFork.prototype = {
        constructor: githubFork,

        getDom: function(){
            return document.getElementsByClassName('github-fork-ribbon')[0];
        },
        create: function(opt,callback){
            githubFork.prototype.options = extend(githubFork.prototype.options,opt,true); // 如果用户调用create()时传入参数，需要重置参数
            if(!this.hasDom){
                var node = document.createElement('a');
                var url = getUrl(this.options.url);
                node.className = classNameCreate(this.options.position,this.options.type);
                node.setAttribute('target',this.options.target);
                node.setAttribute('href', url);
                node.setAttribute('data-ribbon', this.options.text);
                node.setAttribute('title', this.options.text);
                node.style.zIndex = this.options.zIndex;
                node.style.fontSize = this.options.fontSize;
                document.getElementsByTagName('body')[0].appendChild(node);
                this.hasDom = true;

                if(isMobile() && this.options.isMobileHide) {
                    this.hide();
                }
            }
            callback && callback();
            return this;
        },
        show: function(callback){
            if(this.hasDom){
                var node = this.getDom();
                node.style.display = 'block';
            }
            callback && callback();
            return this;
        },
        hide: function(callback){
            if(this.hasDom){
                var node = this.getDom();
                node.style.display = 'none';
            }
            callback && callback();
            return this;
        },
        remove: function(callback){
            if(this.hasDom){
                var node = this.getDom();
                document.getElementsByTagName('body')[0].removeChild(node);
                this.hasDom = false;
            }
            callback && callback();
            return this;
        },
        config: function(opt,callback){
            if(this.hasDom && opt){
                this.remove().create(opt);
            }
            callback && callback();
            return this;
        }
    };

    // 初始化方法
    githubFork.prototype.init = function(options){
        this.hasDom = false; //检查dom树中githubFork的节点是否存在
        return this.create(options);
    };

    // 初始化实例时即调用init方法
    githubFork.prototype.init.prototype = githubFork.prototype;

    if(location.hostname.indexOf('.github.io') !== -1 || !!queryExtract('githubFork')){ // 自动生成按钮
        return new githubFork({url:getUrl(defaults.url)});
    }

    // 暴露接口(支持CMD、AMD规范)
    if (typeof module !== "undefined" && module.exports) {
        module.exports = githubFork;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return githubFork;});
    } else {
        window.githubFork = githubFork;
    }

})(window);




