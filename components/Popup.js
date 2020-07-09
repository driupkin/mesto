export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
    }



    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keydown', ()=> this._handleEscClose());
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keydown', () => this._handleEscClose());
    }

    _handleEscClose() {
      return  (evt) => {
            if (evt.key === 'Escape') {
                console.log(evt.key);
                this.close();
            }
        }
    }

    setEventListeners() {
        const buttonClose = this._popup.querySelector('.popup__close');
        buttonClose.addEventListener('click', () => this.close());
        this._popup.addEventListener('mousedown', evt => {
            if (evt.target === this._popup) {
                this.close();
            }
        });
    }
}