export default class Popup {
    constructor(popupSelector) {
        this._popup = document.querySelector(popupSelector);
        this.hadleClose = this._handleEscClose();
    }

    open() {
        this._popup.classList.add('popup_opened');        
        document.addEventListener('keydown', this.hadleClose);
        
    }

    close() {
        this._popup.classList.remove('popup_opened');        
        document.removeEventListener('keydown', this.hadleClose);
    }

    _handleEscClose = () => {
        return (evt) => { 
            evt.key === 'Escape'
                ? this.close()
                : null;
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