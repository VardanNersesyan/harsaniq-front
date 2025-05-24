// utils/api.js

const BASE_URL = 'http://62.109.13.102:3333';

export async function getData(endpoint = '/data') {
    console.log(`${BASE_URL}${endpoint}`);
    try {
        const response = await fetch(`${BASE_URL}${endpoint}`);
        console.log(response);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('GET request failed:', error);
    }
}

export async function postData(payload) {
    try {
        const response = await fetch(`${BASE_URL}/data`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                content: {
                    data: payload
                }
            })
        });
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('POST request failed:', error);
    }
}
