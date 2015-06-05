function Timer(){
    this.init();
    this.mainTimerArr = [];
}

Timer.prototype = {  //这里setInterval 的使用有问题，正在调试中...
    init: function(){
        var self = this;
        $('#main').click(function(){
            self.codeDance();
        });
        $('#sub').click(function(){
            self.clear();
            self.sub();
        });
    },
    codeDance: function(){
        var self = this;
        function codeDancing(){
            var now = Date.now();
            $.ajax({
                url: 'data/d.json',
                type: 'get',
                dataType: 'json',
                success: function(json){
                    console.log(now, 'main', json.mos);
                }
            });

            console.log(self.mainTimerArr);
        }
        //codeDancing();
        self.mainTimerArr.push(setInterval(codeDancing, 2000));
    },
    clear: function(){
        var self = this;
        var len = self.mainTimerArr.length;
        if(len){
            for(var i = 0; i < len; i++){
                clearInterval(self.mainTimerArr[i]);
            }
        }
        console.log('after clear, mainTimerArr is '+self.mainTimerArr);
    },
    sub: function(){
        var self = this;
        function codeDancing(){
            $.ajax({
                url: 'data/d.json',
                type: 'get',
                dataType: 'json',
                success: function(json){
                    console.log('sub', json.mos, self.mainTimerArr);
                }
            });
        }
        //codeDancing();
        var subTimer = setInterval(codeDancing, 2000);
        $('#popup').show()
            .find('.close').click(function(){
                $(this).parents('#popup').hide();
                clearInterval(subTimer);
                subTimer = null;
                self.codeDance();
            }).end().find('.inner').draggable({
                handle: '.hd',
                cursor: 'move'
            });
    }
};