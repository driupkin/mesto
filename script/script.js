const popup = document.querySelector('.popup');
const editPprofile = document.querySelector('.profile__button-edit');
const closePopup = document.querySelector('.popup__close');
const formButton = document.querySelector('.form__button');
let formElement = document.querySelector('.form');
let profileName = document.querySelector('.profile__name');
let nameInput = document.querySelector('.form__input_name');
let profileDescription = document.querySelector('.profile__subtitle');
let jobInput = document.querySelector('.form__input_description');
function formInput() {
    /**Заполнение формы имя */
    nameInput.value = profileName.textContent;
    /* Заполнение формы "описаниие"*/
    jobInput.value = profileDescription.textContent;
}
/*Функция открытия попапа*/
function popupOpened() {
    popup.classList.add('popup_opened');
    formInput();
}
/*Функция закрытия попапа*/
function popupClosed() {
    popup.classList.remove('popup_opened');
}
/**Изменение данных в профиле */
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupClosed();
}
popupClosed();
formElement.addEventListener('submit', formSubmitHandler);
editPprofile.addEventListener('click', popupOpened);
closePopup.addEventListener('click', popupClosed);