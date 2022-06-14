import fetch from 'node-fetch';
const { CAL_API, CAL_ID } = process.env;

const today = new Date()
today.setDate(today.getDate() - 1)
const BASEPARAMS = `orderBy=startTime&singleEvents=true&timeMin=${today.toISOString()}`
const BASEURL = `https://www.googleapis.com/calendar/v3/calendars/${CAL_ID}/events?${BASEPARAMS}`

const HEADERS = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'GET',
}

exports.handler = async function (event, context) {
    const finalURL = `${BASEURL}${event.queryStringParameters.maxResults ? `&maxResults=${event.queryStringParameters.maxResults}` : ''}&key=${CAL_API}`
    try {
        if (event.httpMethod === 'GET') {
            return fetch(finalURL)
                .then((response) => response.json())
                .then((data) => ({
                    statusCode: 200,
                    body: JSON.stringify(data.items, null, 2),
                    HEADERS,
                }))
        }
        return {
            statusCode: 401
        }
    } catch (e) {
        console.error(e)
        return {
            statusCode: 500,
            body: e.toString()
        }
    }
}