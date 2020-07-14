export default class Card {
    constructor(values, cardTemplate, handleCardClick) {
        this._nameValue = values.nameValue;
        this._urlValue = values.urlValue;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
    }

    _getTemplate() {
        const cardElement = document
            .querySelector(this._cardTemplate)
            .content
            .querySelector('.element')
            .cloneNode(true);
        return cardElement;
    }

    generateCard() {
        this._element = this._getTemplate();
        this._setEventListeners();
        this._element.querySelector('.element__image').alt = this._nameValue;
        this._element.querySelector('.element__image').src = this._urlValue;
        this._element.querySelector('.element__paragraph').textContent = this._nameValue;
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._element.querySelector('.element__like').classList.toggle('element__like_active');
        });
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._element.remove();
            this._element = null;
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick();
        });
    }
}