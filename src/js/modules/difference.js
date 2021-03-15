export default class Difference {
    constructor(oldOficer, newOficer, items) {
        try {
            this.oldOficer = document.querySelector(oldOficer);
            this.newOficer = document.querySelector(newOficer);
            this.oldItems = this.oldOficer.querySelectorAll(items);
            this.newItems = this.newOficer.querySelectorAll(items);
            this.oldCounter = 0;
            this.newCounter = 0;
        } catch (e) {}
    }

    hideItems(items) {
        items.forEach((item, i, arr) => {
            if (i < arr.length - 1) {
                item.classList.add('animated');
                item.style.display = 'none';

            }
        });
    }

    bindTriggers(container, items, counter) {
        container.querySelector('.plus').addEventListener('click', () => {
            if (counter !== items.length - 2) {
                items[counter].style.display = 'flex';
                items[counter].classList.add('fadeIn');
                counter++;
            } else {
                items[counter].style.display = 'flex';
                items[counter].classList.add('fadeIn');
                items[counter + 1].remove();
            }
        });
    }

    init() {
        try {
            this.hideItems(this.oldItems);
            this.hideItems(this.newItems);
            this.bindTriggers(this.oldOficer, this.oldItems, this.oldCounter);
            this.bindTriggers(this.newOficer, this.newItems, this.newCounter);

        } catch (e) {}
    }
}