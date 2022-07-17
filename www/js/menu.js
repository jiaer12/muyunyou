(function () {
    var bannerNavUl = document.getElementById('banner-nav-ul')

    // 事件委托
    bannerNavUl.onmouseover = function (e) {
        if (e.target.tagName.toLowerCase() == "li") {                   // 如果点击了这个li
            var name = e.target.getAttribute('data-t');                 // 得到他的data-t属性
            var lis = bannerNavUl.querySelectorAll('li')                // 匹配到所有的li
            for (var i = 0; i < lis.length; i++) {                      // 先做排他操作
                lis[i].className = `${name}`
            }
            e.target.className = `${name} current`

            var themenu = document.querySelector('.menus-box .menu[data-t=' + name + ']')       // 寻找匹配的menu

            var memus = document.querySelectorAll('.menus-box .menu')   // 寻找所有menu

            for (var i = 0; i < memus.length; i++) {                    // 排他操作
                memus[i].className = 'menu'
            }
            themenu.className = 'menu current'

            themenu.onmouseleave=function(){                            // 当鼠标离开这个二级菜单
                themenu.className = 'menu'                              // 隐藏二级菜单
                e.target.className = `${name}`                          // 取消一级菜单的加深效果
            }
        }
    }
})();