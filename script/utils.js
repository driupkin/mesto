import { popupList } from './constants.js';

const handleEscClose = (evt) => {
    popupList.forEach((item) => {
        if (evt.key === 'Escape') {
            item.classList.remove('popup_opened');
        }
    });
}

export function openPopup(popup) {
    popup.classList.add('popup_opened');
    document.addEventListener('keydown', handleEscClose);
}

export function closePopup(popup) {
    popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', handleEscClose);
}