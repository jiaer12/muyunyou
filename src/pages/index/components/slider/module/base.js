// 要实现的基类
import { ELEMENT_NODE_TYPE, SLIDER_ANIMATION_CLASS_NAME } from "./constants";       // 引入常量
import DEFAULTS from "./defaults";                                                  // 引入默认值

class BaseSlider {                                              // 创建一个基本的类
    constructor(el, options) {                                  // 设置el为节点，options为数组，存放用户传入的值
        if (el.nodeType !== ELEMENT_NODE_TYPE) {                // el要传入元素节点，元素节点的nodeType是1
            throw new Error('实例化的时候,请传入DOM元素!');     // 判断如果不是dom，则抛出一个错误
        }
        // this.option就成为了实际参数
        this.options = { ...DEFAULTS, ...options };             // 合并两个对象，首先是options，其次使用默认参数DEFAULTS填充

        // 获取元素
        const sliderEl = el;
        const sliderContentEl = sliderEl.querySelector('.slider-content');
        const sliderItemEls = sliderContentEl.querySelectorAll('.slider-item');

        // 添加到this上，为了方便在方法中使用
        this.sliderEl = sliderEl;
        this.sliderContentEl = sliderContentEl;
        this.sliderItemEls = sliderItemEls;
        this.minIndex = 0;                                      // 最小索引
        this.maxIndex = sliderItemEls.length - 1;               // 最大索引，就是存放照片的li的个数减1
        this.currIndex = this.getCorrectedIndex(this.options.initialIndex);         // 当前索引，就是传进来的的索引,但是需要判断是否合法
        this.itemWidth = this.sliderItemEls[0].offsetWidth;     // 获取slider-item的宽度（每次移动的距离）
        this.init();                                            // 初始化
    }

    // 获取修正后的索引值
    getCorrectedIndex(index) {
        if (index < this.minIndex) {                            // 如果比最小值还小，就换到最后一张照片的index
            return this.maxIndex;
        }
        if (index > this.maxIndex) {                            // 如果比最大值还大，就换到第一张照片的index
            return this.minIndex
        }
        return index;
    }

    // 初始化
    init() {
        this.setItemsWidth();                                   // 为每个slider-item设置宽度
        this.setContentWidth();                                 // 为slider-content设置宽度
        this.move(this.getDistance());                          // 切换到初始索引（用户输入的或者是默认的）
        if (this.options.animation) {                           // 开启动画
            this.openAnimation();
        }
        if (this.options.autoplay) {                            // 自动切换
            this.autoplay();
        }
    }

    // 设置slider-item的宽度
    setItemsWidth() {
        for (const item of this.sliderItemEls) {                 // 遍历每个slider-item，然后设置宽度。就是每一张照片填充满这个页面的宽度
            item.style.width = `${this.itemWidth}px`;
        }
    }

    // 设置slider-content的宽度
    setContentWidth() {
        this.sliderContentEl.style.width = `${this.sliderItemEls.length * this.itemWidth}px`;   // 每个slider-item的宽度*slider-item的个数
    }

    // 不带动画的移动
    move(distance) {
        this.sliderContentEl.style.transform = `translate3d(${distance}px,0px,0px)`;
    }

    // 获取要移动的距离
    getDistance(index = this.currIndex) {
        return -index * this.itemWidth;
    }

    // 开启动画
    openAnimation() {
        this.sliderContentEl.classList.add(SLIDER_ANIMATION_CLASS_NAME);
    }

    // 自动切换
    autoplay() {
        if (this.options.autoplay <= 0) return;                 // 如果被设置为不自动切换，就直接返回
        this.pause();
        this.autoplayTimer = setInterval(() => {                // 设置一个定时器,时间为用户设置的时间
            this.next();                                        // 向下一张图片切换
        }, this.options.autoplay)
    }

    // 暂停自动切换
    pause() {
        clearInterval(this.autoplayTimer)
    }
    
    // 切换成下一张图片
    next() {
        this.to(this.currIndex + 1);
    }

    // 切换成上一张图片
    prev() {
        this.to(this.currIndex - 1);
    }

    // 切换到index索引对应的幻灯片
    to(index) {
        index = this.getCorrectedIndex(index)                   // index传进来的值可能不合法，因此要校正一下index
        if (this.currIndex === index) return                    // 如果传进来的index就等于当前的currindex，因此不需要切换
        this.currIndex = index;                                 // 如果索引不一样，把当前的currindex设置为传进来的index
        const distance = this.getDistance()                     // 获取要移动的距离，而且还不用传值，因为getDistance的默认参数就是currIndex
        // 开始移动，但是要判断是否是有动画的移动
        if (this.options.animation) {                            // 如果结果为true，则调用有动画的移动
            this.movewithAnimation(distance)
        } else {                                                 // 否则调用无动画的移动
            this.move(distance)
        }
    }

    // 带动画的移动
    movewithAnimation(distance) {
        this.setAnimationSpeed();                   // 设置动画的速度
        this.move(distance)                         // 动画移动
        // 动画移动完成之后，需要关闭动画
        this.sliderContentEl.addEventListener(
            'transitionend', () => {
                this.closeAnimation();
            }, false)
    }

    // 设置切换动画的速度
    setAnimationSpeed(speed = this.options.speed) {
        this.sliderContentEl.style.transitionDuration = `${speed}ms`;
    }

    // 关闭动画
    closeAnimation() {
        this.setAnimationSpeed(0);          // 直接把动画切换速度设置为0
    }






}
export default BaseSlider;