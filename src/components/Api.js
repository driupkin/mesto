export default class Api {
    constructor({ url, headers }) {
        this.url = url;
        this.headers = headers;
    }
    getTasks() {
        return fetch(this.url, { headers: this.headers })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.error(`Ошибка : ${res.status}`);
                }
            });
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.error(`Ошибка : ${res.status}`);
                }
            });
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
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    console.error(`Ошибка : ${res.status}`);
                }
            });
    }
}