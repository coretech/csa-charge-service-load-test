import { SharedArray } from "k6/data";
import http from 'k6/http';
import { check } from 'k6';
import { parse } from 'papaparse';

const csvData = new SharedArray("another data name", function() {
    return parse(open('assets/testData.csv'), { header: true }).data;
});

const BASE_URL = 'https://csa-analytics-service.qa-private.aws.idt.net'

export const options = {
    scenarios: {
        analyticsServiceLoad: {
            executor: 'ramping-arrival-rate',
            startTime: '0s',
            gracefulStop: '30s',
            timeUnit: '1m',
            preAllocatedVUs: 30,
            maxVUs: 100,
            stages: [
                {duration: '10s', target: 10},
                {duration: '30s', target: 15},
                {duration: '1m', target: 10},
                {duration: '1m', target: 15},
                {duration: '1m', target: 15},
                {duration: '1m', target: 15},
                {duration: '1m', target: 10},
                {duration: '1m', target: 15},
                {duration: '1m', target: 20},
                {duration: '1m', target: 20},
                {duration: '1m', target: 15},
                {duration: '1m', target: 20},
                {duration: '1m', target: 15},
                {duration: '1m', target: 20},
                {duration: '1m', target: 15},
                {duration: '1m', target: 20},
                {duration: '1m', target: 15},
                {duration: '1m', target: 20},
                {duration: '1m', target: 20},
                {duration: '1m', target: 20},
                {duration: '1m', target: 15},
                {duration: '1m', target: 20},
                {duration: '1m', target: 10},
                {duration: '1m', target: 20},
                {duration: '1m', target: 20},
                {duration: '1m', target: 10},
                {duration: '1m', target: 20},
                {duration: '1m', target: 15},
                {duration: '1m', target: 20},
                {duration: '1m', target: 10},
                {duration: '1m', target: 30},
                {duration: '1m', target: 15},
                {duration: '1m', target: 30},
                {duration: '1m', target: 30},
                {duration: '1m', target: 30},
                {duration: '1m', target: 15},
                {duration: '1m', target: 30},
                {duration: '1m', target: 30},
                {duration: '1m', target: 15},
                {duration: '1m', target: 30},
                {duration: '1m', target: 20},
                {duration: '1m', target: 30},
                {duration: '1m', target: 15},
                {duration: '1m', target: 30},
                {duration: '1m', target: 10},
                {duration: '1m', target: 15},
                {duration: '1m', target: 30},
                {duration: '1m', target: 20},
                {duration: '1m', target: 20},
                {duration: '1m', target: 20},
                {duration: '1m', target: 10},
                {duration: '1m', target: 20},
                {duration: '1m', target: 15},
                {duration: '1m', target: 20},
                {duration: '1m', target: 10},
                {duration: '1m', target: 20},
                {duration: '1m', target: 20},
                {duration: '1m', target: 15},
                {duration: '30s', target: 10},
                {duration: '10s', target: 10},
                {duration: '1m', target: 0}
            ]
        }
    },
    thresholds: {
        // http_req_failed: ['rate<0.01'], // http errors should be less than 1%
        // http_req_duration: ['p(50)<5200'] // 50% of requests should be below 200ms
    },
}

export default function () {

    let requestParam = getRandonRequestParam()

    let url = `${BASE_URL}${requestParam}`
    let params = {
        headers: {
            'Accept': 'application/json',
            'IDT-Client-Type': 'VIP'
        },
    };

    let res = http.get(url, params);
    console.log(`${res.status} – ${url}`);


    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}

function getRandonRequestParam(){
    let randIndex =  getRandomInt(0, csvData.length);
    return csvData[randIndex].request_parameter;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
