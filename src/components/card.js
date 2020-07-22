export default class Card {
    constructor(values = {}, cardTemplate, handleCardClick, handleTrashClick) {
        this._nameValue = values.nameValue;
        this._urlValue = values.urlValue;
        this._likesValue = values.likesValue;
        this._ownerId = values.ownerId;
        this._cardOwnerId = values.cardOwnerId;
        this._idValue = values.idValue;
        this._cardTemplate = cardTemplate;
        this._handleCardClick = handleCardClick;
        this._handleTrashClick = handleTrashClick;
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
        this._element.querySelector('.elment__likes-count').textContent = this._likesValue.length;
        if (this._cardOwnerId === this._ownerId) {
            this._element.querySelector('.element__trash').classList.add('element__trash_active');
        }        
        return this._element;
    }

    _setEventListeners() {
        this._element.querySelector('.element__like').addEventListener('click', () => {
            this._element.querySelector('.element__like').classList.toggle('element__like_active');
        });
        this._element.querySelector('.element__trash').addEventListener('click', () => {
            this._handleTrashClick();
        });
        this._element.querySelector('.element__image').addEventListener('click', () => {
            this._handleCardClick(this._nameValue, this._urlValue);
        });
    }
}