const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCards = document.querySelector('.popup_add-cards');
const editPprofile = document.querySelector('.profile__button-edit');
const addProfile = document.querySelector('.profile__button-add');
const closePopup = document.querySelector('.popup__close');
const popupCards = document.querySelector('.popup_cards');
const closePopupAddCards = document.querySelector('.popup__close_add-card');
const closePopupCardsButton = document.querySelector('.popup__close_card');
const formElement = document.querySelector('.form');
const addFormCards = document.querySelector('.form-cards');
const profileName = document.querySelector('.profile__name');
const profileDescription = document.querySelector('.profile__subtitle');
const elements = document.querySelector('.elements');
const popupImage = document.querySelector('.popup__image');
const popupSubTitle = document.querySelector('.popup__subtitle');
const nameInput = document.querySelector('.form__input_name');
const jobInput = document.querySelector('.form__input_description');
const placeInput = document.querySelector('.form__input_place');
const urlInput = document.querySelector('.form__input_url');
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
//  enableValidation({
//   formSelector: '.form',
//   inputSelector: '.form__input',
//   submitButtonSelector: '.form__button',
//   inactiveButtonClass: 'form__button_disabled',
//   inputErrorClass: 'form__input_type_error',
//   errorClass: 'form__error_visible'
// });
// Функция открытия-закрытия попапа
function popupOpenClose(popupName) {
    popupName.classList.toggle('popup_opened');
    formInput();
}
// добавление карточек
function addCards(nameValue, urlValue) {
    const cardTemplate = document.querySelector('#card').content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardElementImage = cardElement.querySelector('.element__image');
    cardElementImage.alt = nameValue;
    cardElementImage.src = urlValue;
    cardElement.querySelector('.element__paragraph').textContent = nameValue;
    // добавляем слушатель лайка
    cardElement.querySelector('.element__like').addEventListener('click', function (evt) {
        evt.target.classList.toggle('element__like_active');
    });
    // добавляем слушатель удаления
    cardElement.querySelector('.element__trash').addEventListener('click', function (evt) {
        evt.target.closest('.element').remove();
    });
    // Открытие попапа с картинкой
    cardElementImage.addEventListener('click', function () {
        popupImage.setAttribute('src', urlValue);
        popupImage.setAttribute('alt', nameValue);
        popupSubTitle.textContent = nameValue;
        popupOpenClose(popupCards);
    }
    );
    elements.prepend(cardElement);

}
// сохранение карточек
function addFormSubmitHandler(evt) {
    evt.preventDefault();
    addCards(placeInput.value, urlInput.value);
    popupOpenClose(popupAddCards);
    addFormCards.reset();
}

initialCards.forEach(item => addCards(item.name, item.link));

function formInput() {
    //Заполнение формы имя
    nameInput.value = profileName.textContent;
    // Заполнение формы "описаниие"
    jobInput.value = profileDescription.textContent;
}

// Изменение данных в профиле
function formSubmitHandler(evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileDescription.textContent = jobInput.value;
    popupOpenClose(popupEditProfile);
}


// добавляем подпись ошибки заполнения формы
const showInputError = (formElement, inputElement, errorMessage) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.add('form__input_type_error');
    errorElement.textContent = errorMessage;
    errorElement.classList.add('form__input-error_active'); // возможно не понадобится
};
// убираем подпись ошибки заполнения формы
const hideInputError = (formElement, inputElement) => {
    const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
    inputElement.classList.remove('form__input_type_error');
    errorElement.classList.remove('form__input-error_active');
    errorElement.textContent = '';
};
// проверка валидности заполнения формы
const checkInputValidity = (formElement, inputElement) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
        hideInputError(formElement, inputElement);
    }
};

const hasInvalidInput = (inputList) => {
    return inputList.some((inputElement) => {
        return !inputElement.validity.valid;
    });
};
// активация, дезактивация кнопки формы
const toggleButtonState = (inputList, buttonElement) => {
    if (hasInvalidInput(inputList)) {
        buttonElement.classList.add('form__button_inactive');
    } else {
        buttonElement.classList.remove('form__button_inactive');
    }
}
// слушатель ввода для каждого поля форм
const setEventListeners = (formElement) => {
    const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__button');
    console.log(formElement);
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement);
            toggleButtonState(inputList, buttonElement);
        });
    });
};

const enableValidation = () => {
    const formList = Array.from(document.querySelectorAll('.form'));
    formList.forEach((formElement) => {
        const fieldsetList = Array.from(formElement.querySelectorAll('.form__field'));
        fieldsetList.forEach((fieldset) => {
            setEventListeners(fieldset);
        });
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
    });
};

enableValidation();

formElement.addEventListener('submit', formSubmitHandler);
addFormCards.addEventListener('submit', addFormSubmitHandler);
editPprofile.addEventListener('click', evt => popupOpenClose(popupEditProfile));
addProfile.addEventListener('click', evt => popupOpenClose(popupAddCards));
// функция закрытия попапа кликом по фону
function popupOverlayClose() {
    const popup = Array.from(document.querySelectorAll('.popup'));
    popup.forEach((item) => {
        item.addEventListener('click', evt => {
            if (evt.target === item)
                popupOpenClose(item);
        });
    });
}
popupOverlayClose()
closePopup.addEventListener('click', evt => popupOpenClose(popupEditProfile));
closePopupAddCards.addEventListener('click', evt => popupOpenClose(popupAddCards));
closePopupCardsButton.addEventListener('click', evt => popupOpenClose(popupCards));
document.addEventListener('keydown', (evt) => {
    if (evt.key === 'Escape') {
        popupEditProfile.classList.remove('popup_opened');
        popupAddCards.classList.remove('popup_opened');
        popupCards.classList.remove('popup_opened');
    }
});