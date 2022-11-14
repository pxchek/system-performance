import http from 'k6/http';

/**
 * A simple test script to run k6 and capture the metrics.
 */
export default function () {
    http.get('https://test-api.k6.io/public/crocodiles/');
}