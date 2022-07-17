(function(){
    var backtotop = document.getElementById('backtotop');

    var timer;
    // 返回顶部按钮的监听
    backtotop.onclick = function(){
        // 设表先关
        clearInterval(timer)
        // 设置定时器
        timer = setInterval(function(){
            document.documentElement.scrollTop-=100;
            if(document.documentElement.scrollTop<=0){
                clearInterval(timer)
            }
        },20)
    }
    window.onscroll = function(){
        if (document.documentElement.scrollTop>0){
            backtotop.style.display = 'block'
        }else{
            backtotop.style.display = 'none'
        }
    }

})();