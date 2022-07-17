// 轮播图特效

(function () {

    var carousel_list = document.getElementById('carousel_list');                   // 得到元素
    var left_btn = document.getElementById('left_btn')
    var rigth_btn = document.getElementById('right_btn')
    var circle_ol = document.getElementById('circle_ol')
    var circle_ol_lis = circle_ol.getElementsByTagName('li')
    var banner = document.getElementById('banner')


    var clone_li = carousel_list.firstElementChild.cloneNode(true);                 // 克隆第一张li
    carousel_list.append(clone_li)                                                  // 上树操作

    var idx = 0;                                                                    // 当前显示的图片序号从0开始
    var lock = true;                                                                // 设置节流锁

    // 右按键事件监听
    rigth_btn.onclick = right_btn_handler;
    function right_btn_handler() {
        if(!lock) return;
        lock = false;                                                               // 关锁
        carousel_list.style.transition = 'transform .5s ease 0s'                    // 加上过渡
        idx++;                                                                      // 图片序号数+1
        carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';        // 拉动的距离
        if (idx > 4) {                                                              // 判断是否是最后一张，如果是，则需要瞬间移动回来
            setTimeout(function () {
                carousel_list.style.transition = 'none';                            // 去掉过渡
                carousel_list.style.transform = 'none';                             // 删除transform属性
                idx = 0;                                                            // 图片序号重新变为0
            }, 500)
        }
        setCircles();                                                               // 设置小圆点
        setTimeout(function(){                                                      // 设置一个定时器，等动画结束之后再开锁
            lock = true;
        },500)
    };

    // 左按键事件监听
    left_btn.onclick = function () {
        if(!lock) return;
        lock = false;
        if (idx == 0) {
            carousel_list.style.transition = 'none';                                // 去掉过渡
            carousel_list.style.transform = 'translateX(' + -16.66 * 5 + '%)';      // 瞬间到最后一张图片
            idx = 4;
            // 在刚刚的瞬移发生之后再加上过渡
            setTimeout(function () {
                carousel_list.style.transition = 'transform .5s ease 0s'            // 加上过渡
                carousel_list.style.transform = 'translateX(' + -16.66 * 4 + '%)';  // 然后再从最后一张图片往左拉动
            }, 0)
        } else {
            idx--;                                                                  // 图片序号数-1
            carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)';    // 然后再从最后一张图片往左拉动
        }
        setCircles();                                                               // 设置小圆点
        setTimeout(function(){
            lock = true;
        },500)
    }


    // 设置小圆点的current再谁身上，序号为idx的小圆点才有current类名，其他的都没有
    function setCircles() {
        for (var i = 0; i <= 4; i++) {
            // 0、1、2、3、4除以5的余数都是他本身，但是5除以5等于0
            // 这里%5的目的就是为了右按钮它右一瞬间，idx会成为5，500ms之后才变为0
            if (i == idx % 5) {
                circle_ol_lis[i].className = 'current';

            } else {
                circle_ol_lis[i].className = '';
            }
        }
    }

    // 事件委托，小圆点的监听。（点击哪个小圆点就跳转到哪个图片）
    circle_ol.onclick = function(e){
        if(e.target.tagName.toLowerCase()=="li"){
            var n = Number(e.target.getAttribute('data-n'));
            idx = n;
            carousel_list.style.transform = 'translateX(' + -16.66 * idx + '%)'
            setCircles()
        }
    }

    // 定时器，实现动画自动轮播
    var timer = setInterval(right_btn_handler,2500)

    // 鼠标进入，自动轮播暂停
    banner.onmouseenter = function() {
        clearInterval(timer)
    }

    // 鼠标离开，自动轮播
    banner.onmouseleave = function() {
        clearInterval(timer)
        timer = setInterval(right_btn_handler,2500)
    }


})();