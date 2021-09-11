import { myToken, baseUrl } from './constants';

class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  _checkPromiseStatus(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Ошибка: ${response.status}`);
  }

  getUserInfoFromServer() {
    return fetch(`${this._baseUrl}/users/me`, { headers: this._headers }).then(
      (response) => this._checkPromiseStatus(response)
    );
  }

  getInitialCardsFromServer() {
    return fetch(`${this._baseUrl}/cards`, { headers: this._headers }).then(
      (response) => this._checkPromiseStatus(response)
    );
  }

  patchUserInfoToServer({ name, about }) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((response) => this._checkPromiseStatus(response));
  }

  postNewCardToServer({ name, link }) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then((response) => this._checkPromiseStatus(response));
  }

  deleteCardOnServer(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((response) => this._checkPromiseStatus(response));
  }

  putLikeCards(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'PUT',
      headers: this._headers,
    }).then((response) => this._checkPromiseStatus(response));
  }

  deleteLikeCards(cardId) {
    return fetch(`${this._baseUrl}/cards/likes/${cardId}`, {
      method: 'DELETE',
      headers: this._headers,
    }).then((response) => this._checkPromiseStatus(response));
  }

  patchUserAvatar(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then((response) => this._checkPromiseStatus(response));
  }
}

// const myToken = 'f2403b1e-b069-4c41-a72d-caa156ab74c7';
// const myId = '553193e6af6a1a8f2737e6f2';
// const baseUrl = 'https://nomoreparties.co/v1/cohort-26';

const api = new Api({
  baseUrl,
  headers: {
    authorization: myToken,
    'Content-Type': 'application/json',
  },
});

export default api;
