# 手写promise

    function MyPromise(executor){
        // 保留一个this的副本
        let _this = this;
        // 初始状态为"pending"
        // Promise一共有三个状态，pending, fulfilled, rejected
        _this.$status = "pending";
        // 两个回调函数
        _this.successCallback = undefined;
        _this.failCallback  = undefined;
        executor(resolve.bind(_this),reject.bind(_this));

        function resolve(params){
            if(_this.$status === "pending"){
                _this.$status = "fulfilled";
            };
            
            successCallback(params);
        }
        function reject(params){
            if(_this.$status === "pending"){
                _this.$status = "rejected";
            }
            fillCallback(params);
        }
    }

    MyPromise.prototype.then = function(resolve, reject){
        this.successCallback = resolve;
        this.fillCallback = reject;
    }