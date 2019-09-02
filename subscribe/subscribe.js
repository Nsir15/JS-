~(function(window){

    class Subscribe{
        constructor(){
            // 事件池
            this.pool = [];

        };

        add(fn){
            let pool = this.pool;
            this.pool.forEach((item,index)=>{
                item === fn
                return;
            });
            this.pool.push(fn);
        };

        // 执行后从事件池删除掉
        // fire(){
        //     this.pool.forEach((item,index)=>{
        //         item();
        //         // this.pool.splice(index,1)
        //         this.pool[index] = null;
                
        //     });
        // };
        // remove(fn){
        //     if (!this.pool.length) return;
        //     debugger
        //     this.pool.forEach((item,index)=>{
        //         if (item === fn) {
        //             this.pool.splice(index,1); //会造成数组塌陷 比如执行fn1 后 把fn1删除，然后后面继续执行fire的时候就会跳过fn2
        //         }
        //     });
        // };

        remove(fn){
            if (!this.pool.length) {
                return;
            }
            this.pool.forEach((item,index) => {
                if (item === fn) {
                    this.pool[index] = null;
                }
            });
        };

        fire(){
            for (let index = 0; index < this.pool.length; index++) {
                const element = this.pool[index];
                if (element === null) {
                    this.pool.splice(index,1);
                    i--;
                    continue;
                }
                element();
            }
        }
    };

    window.Subscribe = Subscribe;
})(window);