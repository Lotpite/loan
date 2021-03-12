export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
    }

    bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (document.querySelector('iframe#frame')) {
                    this.overlay.style.display = "flex";
                } else {
                    const path = btn.getAttribute('data-url');
                    console.log(path);
                    this.createPlayer(path);
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = "none";
            this.player.stopVideo();
        });
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
        });

        this.overlay.style.display = 'flex';
    }

    init() {
        const tag = document.createElement('script'); // создаем тег script

        tag.src = "https://www.youtube.com/iframe_api"; // пушим ссылку на фрейм апи
        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); //вставляем в начало

        this.bindTriggers();
        this.bindCloseBtn();
    }
}



/* 
 bindTriggers() {
        this.btns.forEach(btn => {
            btn.addEventListener('click', () => {
                if (document.querySelector('iframe#frame')) {
                    this.overlay.style.display = "flex";
                } else {
                    const path = btn.getAttribute('data-url'); // берем ссылку из верстки кнопки

                    this.createPlayer(path);
                    console.log('hello');
                }
            });
        });
    }

    bindCloseBtn() {
        this.close.addEventListener('click', () => {
            this.overlay.style.display = "none";
            this.player.stopVideo();
        });
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', { // YT подтягивается / 'frame' блок куда
            height: '100%',
            width: '100%',
            videoId: `${url}`, // ID of Video from youtube
        });

        console.log(this.player);
        this.overlay.style.display = "flex";
    }

    init() {
        const tag = document.createElement('script'); // создаем переменную tag c тегом script

        tag.src = "https://www.youtube.com/iframe_api"; // добавляем параметр src 
        const firstScriptTag = document.getElementsByTagName('script')[0]; // находим первый скрипт
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); // перед первым скриптом помещаем скрипт с АРІ
        this.bindTriggers();
        this.bindCloseBtn();
*/