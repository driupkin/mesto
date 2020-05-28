const popup = document.querySelector('.popup');
const editPprofile = document.querySelector('.profile__button-edit');
const addProfile = document.querySelector('.profile__button-add');
const closePopup = document.querySelector('.popup__close');
const formButton = document.querySelector('.form__button');
const formTitle = document.querySelector('.form__title');

let formElement = document.querySelector('.form');
let profileName = document.querySelector('.profile__name');
let nameInput = document.querySelector('.form__input_name');
let profileDescription = document.querySelector('.profile__subtitle');
let jobInput = document.querySelector('.form__input_description');
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }

];
addInitialCards(6);
function formInput() {
    //Заполнение формы имя
    nameInput.value = profileName.textContent;
    nameInput.placeholder = 'Имя профиля';
    // Заполнение формы "описаниие"
    jobInput.value = profileDescription.textContent;
    jobInput.placeholder = 'Описание';
}
function addFormInput() {
    nameInput.value = '';
    nameInput.placeholder = 'Название';
    /* Заполнение формы "описаниие"*/
    jobInput.value = '';
    jobInput.placeholder = 'Ссылка на картинку';
}
/*Функция открытия-закрытия попапа*/
function popupOpenClose() {
    popup.classList.toggle('popup_opened');
    formTitle.textContent = 'Редактировать профиль';
    formInput();
}

function addPopupOpen() {
    popup.classList.toggle('popup_opened');
    formTitle.textContent = 'Новое место';
    addFormInput();
}
// Изменение данных в профиле
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupOpenClose();
}
// сохранение карточек
/**function addFormSubmitHandler(evt) {
    evt.preventDefault();
    initialCards.unshift({ name: `${nameInput.value}`, link: `${jobInput.value}` });
    addInitialCards(1);
    addPopupOpen();
}*/
formElement.addEventListener('submit', formSubmitHandler);
editPprofile.addEventListener('click', popupOpenClose);
closePopup.addEventListener('click', popupOpenClose);
addProfile.addEventListener('click', addPopupOpen);
// карточки из массива
function addInitialCards(index) {
    for (let i = 0; i < index; i++) {
        const cardTemplate = document.querySelector('#card').content;
        const elements = document.querySelector('.elements');
        const cardElement = cardTemplate.cloneNode(true);
        cardElement.querySelector('.element__image').src = initialCards[i].link;
        cardElement.querySelector('.element__image').alt = initialCards[i].name;
        cardElement.querySelector('.element__paragraph').textContent = initialCards[i].name;
        elements.prepend(cardElement);
        // лайк
        const likeButton = document.querySelector('.element__like');
        likeButton.addEventListener('click', function (evt) {
            evt.target.classList.toggle('element__like_active');
        });
        // удаление карточки    
        const trashButton = document.querySelector('.element__trash');
        trashButton.addEventListener('click', function (evt) {
            evt.target.closest('.element').remove();
        });
    };


}
