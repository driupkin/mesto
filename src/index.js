import './pages/index.css';
import Card from './components/card.js';
import FormValidator from './components/FormValidator.js';
import PopupWithImage from './components/PopupWithImage.js';
import PopupWithForm from './components/PopupWithForm.js';
import UserInfo from './components/UserInfo.js';
import Section from './components/Section.js';
import {
    validation, initialCards,
    editProfile, addProfile,
    nameInput, jobInput,
    formButtonAddCards, formButtonEditCards,
    selector, cardsSelector
} from './utils/constants.js';
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

const cardsFormValidation = new FormValidator(validation, cardsSelector);
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
popupAddCard.setEventListeners();

const newUser = new UserInfo({ name: '.profile__name', description: '.profile__subtitle' });
const formValidation = new FormValidator(validation, selector);
const popupEditProfile = new PopupWithForm('.popup_edit-profile', (item) => {
    newUser.setUserInfo({ name: item.name, description: item.description });
});
formValidation.enableValidation();
popupEditProfile.setEventListeners();

// Изменение данных в профиле
editProfile.addEventListener('click', () => {
    formButtonEditCards.classList.remove('form__button_inactive');
    nameInput.value = newUser.getUserInfo().name;
    jobInput.value = newUser.getUserInfo().description;
    popupEditProfile.open();
    formValidation.cleanErrorsFields();
});
// Добавление новых карточек
addProfile.addEventListener('click', () => {
    formButtonAddCards.classList.add('form__button_inactive');
    popupAddCard.open();
    cardsFormValidation.cleanErrorsFields();
});