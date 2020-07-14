import Popup from './Popup.js';
export default class PopupWithImage extends Popup {
    constructor(data, popupSelector, imageItemsSelectors) {
        super(popupSelector);
        this._urlValue = data.urlValue;
        this._nameValue = data.nameValue;
        this._popupImage = document.querySelector(imageItemsSelectors.imageSelector);
        this._popupSubTitle = document.querySelector(imageItemsSelectors.subtitleSelector);
    }
    open() {
        super.open();
        this._popupImage.setAttribute('src', this._urlValue);
        this._popupImage.setAttribute('alt', this._nameValue);
        this._popupSubTitle.textContent = this._nameValue;
    }
}