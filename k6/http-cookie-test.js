import http from 'k6/http';

export default function () {
    http.get('https://httpbin.test.k6.io/cookies', {
        cookies: {
            my_cookie: 'hello world',
        },
    });
}
