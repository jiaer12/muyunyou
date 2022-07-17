import './slider.css'
import './btn.css'

import Slider from './module';

import render from './slider.art'                           // 得到模板

import { getData} from 'api/getData';

const layoutEL = document.getElementsByClassName('slider-layout')[0]
// const layoutEL = document.getElementById('slide-layout')
getData('https://www.imooc.com/api/mall-wepApp/index/slider')
    .then(data => {
        layoutEL.innerHTML = render({ items: data });
        console.log(layoutEL.innerHTML)
        console.log(document.querySelector('.slider'))
        const slider = new Slider(document.querySelector('.slider'), {
            initialIndex: 0,
            animation: true,
            speed: 300,
            autoplay: 3000
        });
        
        window.onresize = function () {
            const sliderEl = document.querySelector('.slider')
            const sliderContentEl = sliderEl.querySelector('.slider-content');
            const sliderItemEls = sliderContentEl.querySelectorAll('.slider-item');
            console.log(sliderItemEls[0].offsetWidth)
        }
        const bannerEl = document.getElementById('banner')
        const leftbtnEl = document.getElementById('left_btn')
        const rightbtnEl = document.getElementById('right_btn')
        leftbtnEl.addEventListener('click', () => {
            slider.prev();
        }, false)
        rightbtnEl.addEventListener('click', () => {
            slider.next();
        }, false)
        bannerEl.addEventListener('mouseenter', () => {
            slider.pause();
        }, false)
        bannerEl.addEventListener('mouseleave', () => {
            slider.autoplay()
        }, false)
    });

