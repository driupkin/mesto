export default class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }
    _handleResponse(res) {
        if (res.ok) {
            return res.json();
        } else {
            console.log('_handleResponse rejection')
            return Promise.reject(res.statusText)
        }
    }

    _handleResponseError(err) {
        console.log('_handleResponseError')
        return Promise.reject(err.message)
    }
    getData() {
        return fetch(this.url, { headers: this.headers })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    editProfile(values) {
        return fetch(this.url, {
            method: 'PATCH',
            headers: this.headers,
            body: JSON.stringify({
                name: values.name,
                about: values.description
            })
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    addCard(values) {
        return fetch(this.url, {
            method: 'POST',
            headers: this.headers,
            body: JSON.stringify({
                name: values.name,
                link: values.link
            })
        })
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    deleteCard(id) {
        return fetch(
            `${this.url}/${id}`,
            {
                headers: this.headers,
                method: 'DELETE',
            }
        )
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    putLike(id) {
        return fetch(
            `${this.url}/likes/${id}`,
            {
                headers: this.headers,
                method: 'PUT',
            }
        )
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
    deleteLike(id) {
        return fetch(
            `${this.url}/likes/${id}`,
            {
                headers: this.headers,
                method: 'DELETE',
            }
        )
            .then(this._handleResponse)
            .catch(this._handleResponseError)
    }
}