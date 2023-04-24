const {google} = require('googleapis');
require('dotenv').config();

// Provide the required configuration
// const CREDENTIALS = JSON.parse(process.env.CREDENTIALS);
// const calendarId = process.env.CALENDAR_ID;
const CREDENTIALS = {"type": "service_account", "project_id": "youtubevideosscraping", "private_key_id": "8ff96d3acae19e550a72c01c1156318bb3055ad3", "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNft972fdX9CQB\nwqqZytna/jxqcp6/ZUKFrZvr9vBvxmOJPx11nIHDARZpMjbvvoHQRTPWI8K5Hfv4\n+E8G3A/plDd9SZfMwqzshxVjCwBEe23+DxR00RRVpaIsXwV1a9c6oJ75OThfZ1UE\nZG+XNRSQkfNcWrnHdudeJETXrfsfqzVTAaFvXZBn7bGFtFSryVa2CA1KchQbPTgu\nqhV8CoNh+UoqbCWByAn+ZFuVoE5Ny4H3UcdqfCxYs5t74Im7myZi2HDjK/Ba6TqY\n1KEefYnDpsMvIv96JH8DsEZ7C1+irLqgciTkBK5C1/ucSbqvtl75pb6bVzyZ2M73\nMKzSTKlDAgMBAAECggEAEBsYB/x64tVbNxobRed8sKnJcWxfXc/haVnEhTd6+7+4\nUGr2c5/bGb4NlBwf6yVqxjiOSgPOgLTFaWuIwhhgVOXNfY/VinJdnEIwHm2fzT5B\nTi6/YzJ53gaX0dN2uY/EtC8flpfx/6Q5KRl4F4lM/dG6mavwsJ30n0/HZ4IW0xHz\nrPbaOzV1FaMlxa+lDTXrshOoS76a9BbCY7qDjfUwrVyokUlSTCrg91dZZokv1A43\n+F3CFNrUHZsgrJjjD+JYamC5tROt8Y06NotpyFQNxSX1xcZmtZF3oVTgc1wDkk6I\nSbIkcaLfdL6l0yl+L28kv/QuLWMLmhkLaNyIeQvwtQKBgQDnrVGiSbYHOYI/EffB\nldOQ5m9kLYImrppSREzHwCUKDdJIacB2CibepbXksIQNV5Qe93AZ/ToyWTFenz0v\nRIDtG3F1fpE+NuU3JdetCBINdQZ8BK1sHWs70pMZYBy+xvCKUNQEk4Hoetmtf/dV\nE05hxm+dmqxUpIlP28HqOzi7bQKBgQDjEeMsBj8IcQS7jMKX4KiAXCA0hMhR9zRB\neJYBuvZQG+RTRIa5r1dZvGT21qCvC37Uh4hxUJrEUwcFVF/JxJt3neqag9v1ovkV\n4E3zejs8c+tdbq5Eyrw+MWmkApy+5T/PT+uR1bDYMOZtt+ExwbgyRi3GN4E3S6AC\n/KKAbKTZbwKBgBxwhT3jyImYgKmXXg+QgdkewHvOrlRrSJxir/4xUxqp2a9z8+FJ\nm73nH64EESHGJ3OpskQudq9pjYrtB0i/Iwh4PvRKZi/58ydS6Offvr+SJwqgVF2a\nOuisD8ykpMKyjyKbi3tIVEEim4gV1lnGNfAAuQDi1NbLH+QCuQo03OD9AoGAVDw2\nggZvK7qBfvHg3mbBG50RdWosxftmr0MEou+woFc4hItPT2L0jJ2O9uL4CPfCvSTq\nQN8eCuaiHCAIyNjes6kpdtijqKQkszDauhAGGY8HKUn97Bcpbgj2n5k4fLiey1Fi\nml8jk4/Qa7NjHwo2QrA2GupMTS8I1RLTVcD4BpECgYEAzMJHYOKlDfNysg4dQnxx\n6EXOvKoIDk6HO7HY6Y+dTpSOaIpQAPCAH0cvbHoLftFIpxBD8UbGPIRu+TuoaL3Q\nIlq1rH8DGGru4rsyFlQjR4JEEoCne6a2lRXA1hMowNjQbOK03V9gqt10L/Sf1G7O\nq1qaPFToHa0/xm/+NtjJ2OE=\n-----END PRIVATE KEY-----\n", "client_email": "sport-calendar@youtubevideosscraping.iam.gserviceaccount.com", "client_id": "100874968205871947167", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/sport-calendar%40youtubevideosscraping.iam.gserviceaccount.com"}
const calendarId = "61706ee992192057306feb54ab3dc9e4bbe44d0b4f68b02e52632a6217aace0e@group.calendar.google.com"

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({version : "v3"});

const auth = new google.auth.JWT(
    CREDENTIALS.client_email,
    null,
    CREDENTIALS.private_key,
    SCOPES
);

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+01:00';

// Get date-time string for calender
const dateTimeForCalander = () => {

    let date = new Date();

    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = `0${month}`;
    }
    let day = date.getDate();
    if (day < 10) {
        day = `0${day}`;
    }
    let hour = date.getHours();
    if (hour < 10) {
        hour = `0${hour}`;
    }
    let minute = date.getMinutes();
    if (minute < 10) {
        minute = `0${minute}`;
    }

    let newDateTime = `${year}-${month}-${day}T${hour}:${minute}:00.000${TIMEOFFSET}`;

    let event = new Date(Date.parse(newDateTime));

    let startDate = event;
    // Delay in end time is 1
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours()+1));

    return {
        'start': startDate,
        'end': endDate
    }
};
// console.log(dateTimeForCalander());
// Insert new event to Google Calendar
const insertEvent = async (event) => {

    try {
        let response = await calendar.events.insert({
            auth: auth,
            calendarId: calendarId,
            resource: event
        });
    
        if (response['status'] == 200 && response['statusText'] === 'OK') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at insertEvent --> ${error}`);
        return 0;
    }
};

let dateTime = dateTimeForCalander();

// Event for Google Calendar
let event = {
    'summary': `This is the summary.`,
    'description': `This is the description.`,
    'start': {
        'dateTime': dateTime['start'],
        'timeZone': 'Africa/Tunis'
    },
    'end': {
        'dateTime': dateTime['end'],
        'timeZone': 'Africa/Tunis'
    }
};

// insertEvent(event)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Get all the events between two dates
const getEvents = async (dateTimeStart, dateTimeEnd) => {

    try {
        let response = await calendar.events.list({
            auth: auth,
            calendarId: calendarId,
            timeMin: dateTimeStart,
            timeMax: dateTimeEnd,
            timeZone: 'Africa/Tunis'
        });
    
        let items = response['data']['items'];
        return items;
    } catch (error) {
        console.log(`Error at getEvents --> ${error}`);
        return 0;
    }
};

let start = '2023-04-24T00:00:00.000Z';
let end = '2023-04-25T00:00:00.000Z';

// getEvents(start, end)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });

// Delete an event from eventID
const deleteEvent = async (eventId) => {

    try {
        let response = await calendar.events.delete({
            auth: auth,
            calendarId: calendarId,
            eventId: eventId
        });

        if (response.data === '') {
            return 1;
        } else {
            return 0;
        }
    } catch (error) {
        console.log(`Error at deleteEvent --> ${error}`);
        return 0;
    }
};

let eventId = '82mkmcf5v1bf2vumhhmpd6bvrk';

// deleteEvent(eventId)
//     .then((res) => {
//         console.log(res);
//     })
//     .catch((err) => {
//         console.log(err);
//     });