const BASE_AUTH_URL = 'https://auth.nomoreparties.co';

function checkResponseStatus(res) {
  if (res.ok) return res.json();

  return Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
}

export function register(userData) {
  return fetch(`${BASE_AUTH_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(checkResponseStatus);
}

export function authorize(userData) {
  return fetch(`${BASE_AUTH_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then(checkResponseStatus);
}

export function checkToken(token) {
  return fetch(`${BASE_AUTH_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
    .then(checkResponseStatus);
}
