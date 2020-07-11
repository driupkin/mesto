import { Card } from './Card.js';
import FormValidator from './FormValidator.js';
import { validation, initialCards } from './constants.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
const editProfile = document.querySelector('.profile__button-edit');
const addProfile = document.querySelector('.profile__button-add');
const elements = document.querySelector('.elements');
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_description');
const formButtonAddCards = document.querySelector('.form__button_add-card');
const selector = document.querySelector('.form');
const cardsSelector = document.querySelector('.form_cards');
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
            items: item, renderer: (item) => {
                const newCard = new Card(item.place, item.url, '#card', () => {
                    const popupWithImage = new PopupWithImage({ urlValue: item.url, nameValue: item.place }, '.popup_cards');
                    popupWithImage.open();
                    popupWithImage.setEventListeners();
                });
                const cardElement = newCard.generateCard();
                newCardList.addItem(cardElement);
                
            } 
        }, '.elements'); newCardList.renderItems();
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
        console.log(item);
        newUser.setUserInfo({ name: item.name, description: item.description });
    });
    formValidation.enableValidation();
    nameInput.value = newUser.getUserInfo().name;
    jobInput.value = newUser.getUserInfo().description;
    popupEditProfile.open();
    popupEditProfile.setEventListeners();
    formValidation.cleanErrosFields();
});