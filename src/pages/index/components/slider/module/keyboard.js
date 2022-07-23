// 键盘控制幻灯片左右切换

import {LEFT_KEYCODE,RIGHT_KEYCODE} from './constants.js'   // 导入常量

const keyboard = {
    bindEvent(slider){                              
        document.addEventListener('keyup',ev=>{             // 绑定按键功能
            if (ev.code === LEFT_KEYCODE){                  // 按下左按键往上一张切换
                slider.prev();
            }else if(ev.code === RIGHT_KEYCODE){            // 按下有按键往上一张切换
                slider.next();
            }
        },false);
    }
};

export default keyboard;