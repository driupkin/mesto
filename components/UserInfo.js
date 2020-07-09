export default class UserInfo {
    constructor(data) {
        this._name = document.querySelector(data.name);
        this._description = document.querySelector(data.description);
    }
    getUserInfo() {
        this._formValues = {};
        this._formValues.name = this._name.textContent;
        this._formValues.description = this._description.textContent;
        console.log(this._formValues);
        return this._formValues;
    }
    setUserInfo() {
        this._name.textContent = nameInput.value;
        this._description.textContent = jobInput.value;
    }
}