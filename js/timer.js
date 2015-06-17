function Timer(){
    this.init();
    this.mainTimer = [];
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
                    console.log(now, 'main', json.mos, '------from codeDancing');
                }
            });

            console.log(self.mainTimer);
        }
        //codeDancing();
        self.mainTimer  = setInterval(codeDancing, 2000);
    },
    clear: function(){
        var self = this;
        var len = self.mainTimer.length;
        if(len){
            for(var i = 0; i < len; i++){
                clearInterval(self.mainTimer[i]);
                self.mainTimer[i] = null;
            }
        }
        console.log('after clear, mainTimer is '+self.mainTimer);
    },
    sub: function(){
        var self = this;
        function codeDancing2(){
            $.ajax({
                url: 'data/d.json',
                type: 'get',
                dataType: 'json',
                success: function(json){
                    console.log('sub', json.mos, self.mainTimer, '-----from inner method codeDancing2');
                }
            });
        }
        //codeDancing();
        var subTimer = setInterval(codeDancing2, 2000);
        $('#popup').show()
            .find('.close').click(function(){
                $(this).parents('#popup').hide()
                    .find('.inner').css({
                    left: 'auto',
                    top: 'auto'
                });
                clearInterval(subTimer);
                subTimer = null;
                self.codeDance();
            }).end().find('.inner').draggable({
                handle: '.hd',
                cursor: 'move'
            });
    }
};