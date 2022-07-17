import BaseSlider from './base.js'
import keyboard from './keyboard.js'

// 继承基类
class Slider extends BaseSlider {       // Slider继承于BaseSlider
    constructor(el,options){
        super(el,options);              // 继承父类的属性el，options
        this.bindEvent();               // 自己的方法
    }
    bindEvent(){                        // 定义自己的方法
        keyboard.bindEvent(this)        // 键盘控制
    }
}
export default Slider                   // 暴露自己的默认类Slider