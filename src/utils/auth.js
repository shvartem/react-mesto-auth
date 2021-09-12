const BASE_AUTH_URL = 'https://auth.nomoreparties.co';

export function register(userData) {
  return fetch(`${BASE_AUTH_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  })
    .then((res) => {
      try {
        if (res.ok) return res.json();
      } catch (err) {
        return err;
      }

      return Promise.reject(`Ошибка: ${res.status}, ${res.statusText}`);
    })
    .then((data) => {
      console.log(data);

      return data;
    })
    .catch(console.log);
}
