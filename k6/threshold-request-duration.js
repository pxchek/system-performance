import http from 'k6/http';
import { sleep } from 'k6';

/**
 * ➜  k6 git:(main) ✗ k6 run threshold-request-duration.js
 *
 *           /\      |‾‾| /‾‾/   /‾‾/
 *      /\  /  \     |  |/  /   /  /
 *     /  \/    \    |     (   /   ‾‾\
 *    /          \   |  |\  \ |  (‾)  |
 *   / __________ \  |__| \__\ \_____/ .io
 *
 *   execution: local
 *      script: threshold-request-duration.js
 *      output: -
 *
 *   scenarios: (100.00%) 1 scenario, 1 max VUs, 10m30s max duration (incl. graceful stop):
 *            * default: 1 iterations for each of 1 VUs (maxDuration: 10m0s, gracefulStop: 30s)
 *
 *
 * running (00m01.2s), 0/1 VUs, 1 complete and 0 interrupted iterations
 * default ✓ [======================================] 1 VUs  00m01.2s/10m0s  1/1 iters, 1 per VU
 *
 *      data_received..................: 5.8 kB 4.9 kB/s
 *      data_sent......................: 466 B  394 B/s
 *      http_req_blocked...............: avg=111.93ms min=111.93ms med=111.93ms max=111.93ms p(90)=111.93ms p(95)=111.93ms
 *      http_req_connecting............: avg=42.12ms  min=42.12ms  med=42.12ms  max=42.12ms  p(90)=42.12ms  p(95)=42.12ms
 *    ✓ http_req_duration..............: avg=64.92ms  min=64.92ms  med=64.92ms  max=64.92ms  p(90)=64.92ms  p(95)=64.92ms
 *        { expected_response:true }...: avg=64.92ms  min=64.92ms  med=64.92ms  max=64.92ms  p(90)=64.92ms  p(95)=64.92ms
 *      http_req_failed................: 0.00%  ✓ 0        ✗ 1
 *      http_req_receiving.............: avg=184µs    min=184µs    med=184µs    max=184µs    p(90)=184µs    p(95)=184µs
 *      http_req_sending...............: avg=1.11ms   min=1.11ms   med=1.11ms   max=1.11ms   p(90)=1.11ms   p(95)=1.11ms
 *      http_req_tls_handshaking.......: avg=65.85ms  min=65.85ms  med=65.85ms  max=65.85ms  p(90)=65.85ms  p(95)=65.85ms
 *      http_req_waiting...............: avg=63.62ms  min=63.62ms  med=63.62ms  max=63.62ms  p(90)=63.62ms  p(95)=63.62ms
 *      http_reqs......................: 1      0.846034/s
 *      iteration_duration.............: avg=1.17s    min=1.17s    med=1.17s    max=1.17s    p(90)=1.17s    p(95)=1.17s
 *      iterations.....................: 1      0.846034/s
 *      vus............................: 1      min=1      max=1
 *      vus_max........................: 1      min=1      max=1
 *
 * http_reqs    Counter    How many total HTTP requests k6 generated.
 * http_req_blocked    Trend    Time spent blocked (waiting for a free TCP connection slot) before initiating the request. float
 * http_req_connecting    Trend    Time spent establishing TCP connection to the remote host. float
 * http_req_tls_handshaking    Trend    Time spent handshaking TLS session with remote host
 * http_req_sending    Trend    Time spent sending data to the remote host. float
 * http_req_waiting    Trend    Time spent waiting for response from remote host (a.k.a. “time to first byte”, or “TTFB”). float
 * http_req_receiving    Trend    Time spent receiving response data from the remote host. float
 * http_req_duration    Trend    Total time for the request. It's equal to http_req_sending + http_req_waiting + http_req_receiving (i.e. how long did the remote server take to process the request and respond, without the initial DNS lookup/connection times). float
 * http_req_failed    Rate    The rate of failed requests according to setResponseCallback.
 * @type {{thresholds: {http_req_duration: string[]}}}
 */

export const options = {
    thresholds: {
        // 90% of requests must finish within 400ms, 95% within 800, and 99.9% within 2s.
        http_req_duration: ['p(90) < 75', 'p(95) < 800', 'p(99.9) < 2000'],
    },
};

export default function () {
    const res1 = http.get('https://test-api.k6.io/public/crocodiles/1/');
    sleep(1);
}
