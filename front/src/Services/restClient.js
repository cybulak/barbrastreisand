import axios from 'axios';

const instance = axios.create({
    baseURL: '',
});

class restClient {
    static login = (username, password) =>
        instance.post('/login', {
            username,
            password,
        });

    static register = (firstname, lastname, username, password) =>
        instance.post('/register', {
            firstname,
            lastname,
            username,
            password
        });
}

export { restClient, instance };
