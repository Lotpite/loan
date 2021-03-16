export default class VideoPlayer {
    constructor(triggers, overlay) {
        this.btns = document.querySelectorAll(triggers);
        this.overlay = document.querySelector(overlay);
        this.close = this.overlay.querySelector('.close');
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    bindTriggers() {
        this.btns.forEach((btn, i) => {
            const blockedElem = btn.parentNode.nextElementSibling; // МОЖНО ИСПОЛЬЗОВАТЬ Closest!!!
            if (blockedElem) {
                if (i % 2 == 0) {
                    blockedElem.setAttribute('data-disabled', 'true');
                }
            }

            btn.addEventListener('click', () => {
                if (btn.parentNode.getAttribute('data-disabled') !== 'true') {
                    this.active = btn;

                    if (document.querySelector('iframe#frame')) {
                        this.overlay.style.display = "flex";
                        if (this.path !== btn.getAttribute('data-url')) {
                            this.path = btn.getAttribute('data-url');
                            this.player.loadVideoById({
                                videoId: this.path
                            });
                        }
                    } else {
                        this.path = btn.getAttribute('data-url');
                        console.log(this.path);
                        this.createPlayer(this.path);
                    }
                }
            });
        });
    }

    onPlayerStateChange(state) { //state передается автоматически 
        const blockedElem = this.active.parentNode.nextElementSibling;
        const playBtn = this.active.querySelector('svg').cloneNode(true);

        if (state.data === 0) {
            if (blockedElem.querySelector('.play__circle').classList.contains('closed')) {
                blockedElem.querySelector('.play__circle').classList.remove('closed');
                blockedElem.querySelector('svg').remove();
                blockedElem.querySelector('.play__circle').appendChild(playBtn);
                blockedElem.querySelector('.play__text').textContent = 'play video';
                blockedElem.querySelector('.play__text').classList.remove('attention');
                blockedElem.style.opacity = 1;
                blockedElem.style.filter = 'none';
                blockedElem.setAttribute('data-disabled', 'false');
            }
        }
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
            events: {
                'onStateChange': this.onPlayerStateChange
            }

        });

        this.overlay.style.display = 'flex';
    }

    init() {
        if (this.btns.length > 0) {
            const tag = document.createElement('script'); // создаем тег script

            tag.src = "https://www.youtube.com/iframe_api"; // пушим ссылку на фрейм апи
            const firstScriptTag = document.getElementsByTagName('script')[0];
            firstScriptTag.parentNode.insertBefore(tag, firstScriptTag); //вставляем в начало

            this.bindTriggers();
            this.bindCloseBtn();
        }
    }
}