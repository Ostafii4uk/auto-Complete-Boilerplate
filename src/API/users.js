const API_URL = "https://jsonplaceholder.typicode.com/users";

export const getUsers = () => {
  return fetch(API_URL)
    .then(res => res.json())
}