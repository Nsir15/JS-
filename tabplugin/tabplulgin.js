;(function(window){

    class TabPlugin {
        constructor(container,options={}){

            this.container = container;

            //默认值，变量名不能用default ,是保留字
            let _default = {
                lastIndex:0,
                tabContainer:'tab',
                contentContainer:'content',
                callback:null,
                eventType:'click'
            };

            for (const attr in options) {
                if (options.hasOwnProperty(attr)) {
                    _default[attr] = options[attr];
                }
            }

            let tab = container.querySelector(`.${_default.tabContainer}`);
            this.contentList = container.querySelectorAll(`.${_default.contentContainer}`);
            this.liList = [].slice.call(tab.getElementsByTagName('li'));
            let lastIndex = 0;

            this.liList.forEach((item, index) => {
                item[`on${_default.eventType}`] = ()=> {
                    this.addClass(item, 'active');
                    this.addClass(this.contentList[index], 'active');
                    this.removeClass(this.liList[lastIndex], 'active');
                    this.removeClass(this.contentList[lastIndex], 'active');
                    lastIndex = index;
                };
            })

        }


    /*==把公共方法挂载到类的原型上==*/
        hasClass(element, className) {
            return element.className.replace(/^ +| +$/g, '').split(/ +/).indexOf(className) >= 0;
        };

        addClass(element, className) {
            if (this.hasClass(element, className)) return;
            element.className += ` ${className}`;
        };

        removeClass(element, className) {
            let arr = element.className.replace(/^ +| +$/g, '').split(/ +/);
            arr = arr.filter((item, index) => {
                return item !== className;
            });
            element.className = arr.join(' ');
        };

    };


    window.TabPlugin = TabPlugin;

})(window)