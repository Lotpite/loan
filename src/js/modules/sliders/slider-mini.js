import Slider from './slider';

export default class MiniSlider extends Slider {
    constructor(container, btns, prev, next, activeClass, animate, autoplay) {
        super(container, btns, prev, next, activeClass, animate, autoplay);
    }

    moveBtnsToEnd() {
        this.slides.forEach((slide, i) => {
            if (slide.tagName === 'BUTTON') {
                this.container.appendChild(this.slides[i]);
            }
        });
    }

    decorizeSlides() {
        this.slides.forEach(slide => {
            slide.classList.remove(this.activeClass);
            if (this.animate) {
                slide.querySelector('.card__title').style.opacity = '0.4';
                slide.querySelector('.card__controls-arrow').style.opacity = '0';
            }
        });

        this.slides[0].classList.add(this.activeClass);
        if (this.animate) {
            this.slides[0].querySelector('.card__title').style.opacity = '1';
            this.slides[0].querySelector('.card__controls-arrow').style.opacity = '1';
        }
    }

    createArray() {}


    bindTriggers() {

        this.next.addEventListener('click', () => {

            this.container.appendChild(this.slides[0]);

            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName === "BUTTON") {
                    this.container.appendChild(this.slides[i]);
                }
            }
            this.decorizeSlides();
        });



        this.prev.addEventListener('click', () => {

            for (let i = this.slides.length - 1; i > 0; i--) {
                if (this.slides[i].tagName !== "BUTTON") {
                    let active = this.slides[i];
                    console.log(this.slides[i].nextSibling);
                    this.container.insertBefore(active, this.slides[0]);
                    this.decorizeSlides();
                    break;
                }
            }
        });
    }


    init() {
        this.container.style.cssText = `
            display: flex;
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.bindTriggers();
        this.decorizeSlides();
    }
}