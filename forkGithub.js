/**
 * @author Merrier
 * QQ:953075999
 * @website: http://www.merrier.wang
 * @name github-fork-ribbon 2.0.0
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
        url : 'https://github.com/merrier/', // 跳转链接
        position: ['right','top'], // 位置，array类型
        type: 'black',  // 样式类型，目前只支持四种：'black','orange','red',green
        zIndex: 2,  // 层级
        fixed: false,   // 是否position设置为fixed
        target: '_blank' // 何处打开链接，和a标签的target属性一致
    };

    // 插件构造函数
    var forkGithub = function(opt) {
        forkGithub.prototype.options = extend(defaults,opt,true); //初始化时配置参数

        return forkGithub.prototype.init(this.options);
    };

    forkGithub.prototype = {
        constructor: forkGithub,

        getDom: function(){
            return document.getElementsByClassName('forkGithub-ribbon')[0];
        },
        create: function(opt,callback){
            forkGithub.prototype.options = extend(forkGithub.prototype.options,opt,true); // 如果用户调用create()时传入参数，需要重置参数
            if(!this.hasDom){

                var node = document.createElement('a');
                node.className = classNameCreate(this.options.position,this.options.type);
                node.setAttribute('target','');
                node.setAttribute('href','');
                node.setAttribute('data-ribbon','');
                node.setAttribute('title','');
                node.style.zIndex = this.options.zIndex;

                // var node = document.createElement('div');
                // node.innerHTML = '<a href=' + this.options.url + '>' + this.options.text + '</a>';
                // node.innerHTML = '<a target="' + this.options.target + '" href=' + this.options.url + '>' + 'fork me on github' + '</a>';
                // node.className = 'forkGithub-ribbon forkGithub-ribbon-' + this.options.position;
                // node.style.backgroundColor = this.options.bgColor;
                // this.options.fixed ? node.style.position = 'fixed' : 'absolute';
                document.getElementsByTagName('body')[0].appendChild(node);
                this.hasDom = true;
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
    forkGithub.prototype.init = function(options){
        this.hasDom = false; //检查dom树中forkGithub的节点是否存在
        return this.create(options);
    };

    // 初始化实例时即调用init方法
    forkGithub.prototype.init.prototype = forkGithub.prototype;

    // 暴露接口(支持CMD、AMD规范)
    if (typeof module !== "undefined" && module.exports) {
        module.exports = forkGithub;
    } else if (typeof define === "function" && define.amd) {
        define(function(){return forkGithub;});
    } else {
        window.forkGithub = forkGithub;
    }

})(window);




