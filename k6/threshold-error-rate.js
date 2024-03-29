import http from 'k6/http';
import { sleep } from 'k6';

export const options = {
    thresholds: {
        // During the whole test execution, the error rate must be lower than 1%.
        http_req_failed: ['rate<0.01'],
    },
};

export default function () {
    http.get('https://te2st-api.k6.io/public/crocodiles/1/');
    sleep(1);
}
