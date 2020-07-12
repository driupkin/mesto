import { Card } from '../components/card.js';
import FormValidator from '../components/FormValidator.js';
import {
    validation, initialCards,
    editProfile, addProfile,
    nameInput, jobInput,
    formButtonAddCards,
    selector, cardsSelector
} from '../utils/constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js.js';

const formValidation = new FormValidator(validation, selector);
const cardsFormValidation = new FormValidator(validation, cardsSelector);

// добавление карточек из массива
const cardList = new Section({
    items: initialCards, renderer: (item) => {
        const card = new Card(item.name, item.link, '#card', () => {
            const popupWithImage = new PopupWithImage({ urlValue: item.link, nameValue: item.name }, '.popup_cards');
            popupWithImage.open();
            popupWithImage.setEventListeners();
        });
        const cardElement = card.generateCard();
        cardList.addItem(cardElement);
    }
}, '.elements');
cardList.renderItems();

// Добавление новых карточек
addProfile.addEventListener('click', () => {
    formButtonAddCards.classList.add('form__button_inactive');
    const popupAddCard = new PopupWithForm('.popup_add-cards', (item) => {
        const newCardList = new Section({
            items: [item], renderer: (item) => {
                const newCard = new Card(item.place, item.url, '#card', () => {
                    const newPopupWithImage = new PopupWithImage({ urlValue: item.url, nameValue: item.place }, '.popup_cards');
                    newPopupWithImage.open();
                    newPopupWithImage.setEventListeners();
                });
                const newCardElement = newCard.generateCard();
                newCardList.addItem(newCardElement);
            }
        }, '.elements');
        newCardList.renderItems();
    });
    cardsFormValidation.enableValidation();
    popupAddCard.open();
    popupAddCard.setEventListeners();
    cardsFormValidation.cleanErrosFields();
});

// Изменение данных в профиле
editProfile.addEventListener('click', () => {
    const newUser = new UserInfo({ name: '.profile__name', description: '.profile__subtitle' });
    const popupEditProfile = new PopupWithForm('.popup_edit-profile', (item) => {
        newUser.setUserInfo({ name: item.name, description: item.description });
    });
    formValidation.enableValidation();
    nameInput.value = newUser.getUserInfo().name;
    jobInput.value = newUser.getUserInfo().description;
    popupEditProfile.open();
    popupEditProfile.setEventListeners();
    formValidation.cleanErrosFields();
});