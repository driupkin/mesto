export default class UserInfo {
    constructor(data) {
        this._name = document.querySelector(data.name);
        this._description = document.querySelector(data.description);
    }
    getUserInfo() {
        this._formValues = {};
        this._formValues.name = this._name.textContent;
        this._formValues.description = this._description.textContent;
        return this._formValues;
    }
    setUserInfo(data) {
        this._name.textContent = data.name;
        this._description.textContent = data.description;
    }
}