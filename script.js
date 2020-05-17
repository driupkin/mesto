let popup = document.querySelector('.popup');
/**Заполнение формы имя */
let profileTitle = document.querySelector('.profile__title');
let profileTitleText = profileTitle.querySelector('p');
let nameInput = document.querySelector('.form__input_name');
nameInput.value = (profileTitleText.textContent);
/* Заполнение формы "описаниие"*/
let profileDescription = document.querySelector('.profile__subtitle');
let jobInput = document.querySelector('.form__input_description');
jobInput.value = (profileDescription.textContent);
/*Функция открытия попапа*/
function popupOpened() {
    popup.classList.add('popup_opened');
}
let editPprofile = document.querySelector('.profile__button_edit');
editPprofile.addEventListener('click', popupOpened);
/*Функция закрытия попапа*/
function popupClosed() {
    popup.classList.remove('popup_opened');
}
let closePopup = document.querySelector('.popup__close');
closePopup.addEventListener('click', popupClosed);
/**Изменение данных в профиле */
let formElement = document.querySelector('.form__field');
function formSubmitHandler(evt) {
    evt.preventDefault();
    nameInput.getAttribute('value');
    jobInput.getAttribute('value');
    profileTitleText.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
}
formElement.addEventListener('submit', formSubmitHandler);
let formButton = document.querySelector('.form__button');

formButton.addEventListener('click', formSubmitHandler);
formButton.addEventListener('click', popupClosed);