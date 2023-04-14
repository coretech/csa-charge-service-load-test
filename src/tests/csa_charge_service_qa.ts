import {SharedArray} from "k6/data";
import http from 'k6/http';
import {check} from 'k6';
import {parse} from 'papaparse';

const getClassTab = new SharedArray("another data name", function () {
    return parse(open('assets/getClassTab.csv'), {header: true}).data;
});

const getDnis = new SharedArray("another data name", function () {
    return parse(open('assets/getDnis.csv'), {header: true}).data;
});

const getDnistype = new SharedArray("another data name", function () {
    return parse(open('assets/getDnistype.csv'), {header: true}).data;
});

const getRates = new SharedArray("another data name", function () {
    return parse(open('assets/getRates.csv'), {header: true}).data;
});

const getPlans = new SharedArray("another data name", function () {
    return parse(open('assets/getPlans.csv'), {header: true}).data;
});

const BASE_URL = 'https://psp-charge-service.awsqa.idt.net'

export const options = {
    scenarios: {
        getClassTabLoad: {
                executor: 'ramping-arrival-rate',
                startTime: '0s',
                gracefulStop: '30s',
                timeUnit: '1m',
                preAllocatedVUs: 2,
                maxVUs: 10,
                tags: {test_type: 'Get Class Tab'}, //Extra tags for the metrics generated by this scenario.
                exec: 'getClassTabLoad',
                stages: [
                    {duration: '30s', target: 2},
                    {duration: '1m', target: 3},
                    {duration: '5m', target: 4},
                    {duration: '5m', target: 5},
                    {duration: '5m', target: 6},
                    {duration: '5m', target: 3},
                    {duration: '1m', target: 2},
                    {duration: '10s', target: 1},
                    {duration: '10s', target: 0}
                ]
        },
        getDnisLoad: {
                executor: 'ramping-arrival-rate',
                startTime: '0s',
                gracefulStop: '30s',
                timeUnit: '1m',
                preAllocatedVUs: 2,
                maxVUs: 10,
                tags: {test_type: 'Get Dnis'}, //Extra tags for the metrics generated by this scenario.
                exec: 'getDnisLoad',
                stages: [
                    {duration: '30s', target: 2},
                    {duration: '1m', target: 3},
                    {duration: '5m', target: 4},
                    {duration: '5m', target: 5},
                    {duration: '5m', target: 6},
                    {duration: '5m', target: 3},
                    {duration: '1m', target: 2},
                    {duration: '10s', target: 1},
                    {duration: '10s', target: 0}
                ]
            },
            getDnistypeLoad: {
                    executor: 'ramping-arrival-rate',
                    startTime: '0s',
                    gracefulStop: '30s',
                    timeUnit: '1m',
                    preAllocatedVUs: 2,
                    maxVUs: 10,
                    tags: {test_type: 'Get Dnistype'}, //Extra tags for the metrics generated by this scenario.
                    exec: 'getDnistypeLoad',
                    stages: [
                        {duration: '30s', target: 2},
                        {duration: '1m', target: 3},
                        {duration: '5m', target: 4},
                        {duration: '5m', target: 5},
                        {duration: '5m', target: 6},
                        {duration: '5m', target: 3},
                        {duration: '1m', target: 2},
                        {duration: '10s', target: 1},
                        {duration: '10s', target: 0}
                    ]
            },
            getRatesLoad: {
                    executor: 'ramping-arrival-rate',
                    startTime: '0s',
                    gracefulStop: '30s',
                    timeUnit: '1m',
                    preAllocatedVUs: 2,
                    maxVUs: 10,
                    tags: {test_type: 'Get Rates'}, //Extra tags for the metrics generated by this scenario.
                    exec: 'getRatesLoad',
                    stages: [
                        {duration: '30s', target: 2},
                        {duration: '1m', target: 3},
                        {duration: '5m', target: 4},
                        {duration: '5m', target: 5},
                        {duration: '5m', target: 6},
                        {duration: '5m', target: 3},
                        {duration: '1m', target: 2},
                        {duration: '10s', target: 1},
                        {duration: '10s', target: 0}
                    ]
            },
                getUnlimitedPlansLoad: {
                    executor: 'ramping-arrival-rate',
                    startTime: '0s',
                    gracefulStop: '30s',
                    timeUnit: '1m',
                    preAllocatedVUs: 2,
                    maxVUs: 10,
                    tags: {test_type: 'Get Unlimited Plans'}, //Extra tags for the metrics generated by this scenario.
                    exec: 'getUnlimitedPlansLoad',
                    stages: [
                        {duration: '30s', target: 2},
                        {duration: '1m', target: 3},
                        {duration: '5m', target: 4},
                        {duration: '5m', target: 5},
                        {duration: '5m', target: 6},
                        {duration: '5m', target: 3},
                        {duration: '1m', target: 2},
                        {duration: '10s', target: 1},
                        {duration: '10s', target: 0}
                    ]
                }
            },
        thresholds: {
            // http_req_failed: ['rate<0.01'], // http errors should be less than 1%
            // http_req_duration: ['p(50)<5200'] // 50% of requests should be below 200ms
        },
    }

export function getClassTabLoad() {

    let requestParam = getRandonClass()

    let url = `${BASE_URL}${requestParam}`
    let params = {
        headers: {
            'Accept': 'application/json'
        },
    };

    let res = http.get(url, params);
    console.log(`${res.status} – ${url}`);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}

export function getDnisLoad() {

    let requestParam = getRandonDnis()

    let url = `${BASE_URL}${requestParam}`
    let params = {
        headers: {
            'Accept': 'application/json'
        },
    };

    let res = http.get(url, params);
    console.log(`${res.status} – ${url}`);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}

export function getDnistypeLoad() {

    let requestParam = getRandonDnistype()

    let url = `${BASE_URL}${requestParam}`
    let params = {
        headers: {
            'Accept': 'application/json'
        },
    };

    let res = http.get(url, params);
    console.log(`${res.status} – ${url}`);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}

export function getRatesLoad() {

    let requestParam = getRandomRates()

    let url = `${BASE_URL}${requestParam}`
    let params = {
        headers: {
            'Accept': 'application/json'
        },
    };

    let res = http.get(url, params);
    console.log(`${res.status} – ${url}`);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}

export function getUnlimitedPlansLoad() {

    let requestParam = getRandomPlans()

    let url = `${BASE_URL}${requestParam}`
    let params = {
        headers: {
            'Accept': 'application/json'
        },
    };

    let res = http.get(url, params);
    console.log(`${res.status} – ${url}`);

    check(res, {
        'status is 200': (r) => r.status === 200,
    });
}

export function getRandonClass() {
    let randIndex = getRandomInt(0, getClassTab.length);
    return getClassTab[randIndex].CLASSTAB;
}

function getRandonDnis() {
    let randIndex = getRandomInt(0, getDnis.length);
    return getDnis[randIndex].DNIS;
}

function getRandonDnistype() {
    let randIndex = getRandomInt(0, getDnistype.length);
    return getDnistype[randIndex].DNISTYPE;
}

function getRandomRates() {
    let randIndex = getRandomInt(0, getRates.length);
    return getRates[randIndex].RATES;
}

function getRandomPlans() {
    let randIndex = getRandomInt(0, getPlans.length);
    return getPlans[randIndex].PLANS;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}
