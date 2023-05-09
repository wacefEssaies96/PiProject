const EventModel = require("../../models/Sports/EventCalendarSportModel")
const { google } = require('googleapis');
require('dotenv').config();
const User = require("../../models/Users/user");

// Provide the required configuration
const CREDENTIALS = { "type": "service_account", "project_id": "youtubevideosscraping", "private_key_id": "8ff96d3acae19e550a72c01c1156318bb3055ad3", "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDNft972fdX9CQB\nwqqZytna/jxqcp6/ZUKFrZvr9vBvxmOJPx11nIHDARZpMjbvvoHQRTPWI8K5Hfv4\n+E8G3A/plDd9SZfMwqzshxVjCwBEe23+DxR00RRVpaIsXwV1a9c6oJ75OThfZ1UE\nZG+XNRSQkfNcWrnHdudeJETXrfsfqzVTAaFvXZBn7bGFtFSryVa2CA1KchQbPTgu\nqhV8CoNh+UoqbCWByAn+ZFuVoE5Ny4H3UcdqfCxYs5t74Im7myZi2HDjK/Ba6TqY\n1KEefYnDpsMvIv96JH8DsEZ7C1+irLqgciTkBK5C1/ucSbqvtl75pb6bVzyZ2M73\nMKzSTKlDAgMBAAECggEAEBsYB/x64tVbNxobRed8sKnJcWxfXc/haVnEhTd6+7+4\nUGr2c5/bGb4NlBwf6yVqxjiOSgPOgLTFaWuIwhhgVOXNfY/VinJdnEIwHm2fzT5B\nTi6/YzJ53gaX0dN2uY/EtC8flpfx/6Q5KRl4F4lM/dG6mavwsJ30n0/HZ4IW0xHz\nrPbaOzV1FaMlxa+lDTXrshOoS76a9BbCY7qDjfUwrVyokUlSTCrg91dZZokv1A43\n+F3CFNrUHZsgrJjjD+JYamC5tROt8Y06NotpyFQNxSX1xcZmtZF3oVTgc1wDkk6I\nSbIkcaLfdL6l0yl+L28kv/QuLWMLmhkLaNyIeQvwtQKBgQDnrVGiSbYHOYI/EffB\nldOQ5m9kLYImrppSREzHwCUKDdJIacB2CibepbXksIQNV5Qe93AZ/ToyWTFenz0v\nRIDtG3F1fpE+NuU3JdetCBINdQZ8BK1sHWs70pMZYBy+xvCKUNQEk4Hoetmtf/dV\nE05hxm+dmqxUpIlP28HqOzi7bQKBgQDjEeMsBj8IcQS7jMKX4KiAXCA0hMhR9zRB\neJYBuvZQG+RTRIa5r1dZvGT21qCvC37Uh4hxUJrEUwcFVF/JxJt3neqag9v1ovkV\n4E3zejs8c+tdbq5Eyrw+MWmkApy+5T/PT+uR1bDYMOZtt+ExwbgyRi3GN4E3S6AC\n/KKAbKTZbwKBgBxwhT3jyImYgKmXXg+QgdkewHvOrlRrSJxir/4xUxqp2a9z8+FJ\nm73nH64EESHGJ3OpskQudq9pjYrtB0i/Iwh4PvRKZi/58ydS6Offvr+SJwqgVF2a\nOuisD8ykpMKyjyKbi3tIVEEim4gV1lnGNfAAuQDi1NbLH+QCuQo03OD9AoGAVDw2\nggZvK7qBfvHg3mbBG50RdWosxftmr0MEou+woFc4hItPT2L0jJ2O9uL4CPfCvSTq\nQN8eCuaiHCAIyNjes6kpdtijqKQkszDauhAGGY8HKUn97Bcpbgj2n5k4fLiey1Fi\nml8jk4/Qa7NjHwo2QrA2GupMTS8I1RLTVcD4BpECgYEAzMJHYOKlDfNysg4dQnxx\n6EXOvKoIDk6HO7HY6Y+dTpSOaIpQAPCAH0cvbHoLftFIpxBD8UbGPIRu+TuoaL3Q\nIlq1rH8DGGru4rsyFlQjR4JEEoCne6a2lRXA1hMowNjQbOK03V9gqt10L/Sf1G7O\nq1qaPFToHa0/xm/+NtjJ2OE=\n-----END PRIVATE KEY-----\n", "client_email": "sport-calendar@youtubevideosscraping.iam.gserviceaccount.com", "client_id": "100874968205871947167", "auth_uri": "https://accounts.google.com/o/oauth2/auth", "token_uri": "https://oauth2.googleapis.com/token", "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs", "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/sport-calendar%40youtubevideosscraping.iam.gserviceaccount.com" }
const calendarId = "61706ee992192057306feb54ab3dc9e4bbe44d0b4f68b02e52632a6217aace0e@group.calendar.google.com"

// Google calendar API settings
const SCOPES = 'https://www.googleapis.com/auth/calendar';
const calendar = google.calendar({ version: "v3" });

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
    let endDate = new Date(new Date(startDate).setHours(startDate.getHours() + 1));

    return {
        'start': startDate,
        'end': endDate
    }
};

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

// Create and Save a new Calendar Event
exports.create = async (req, res) => {
    const userId = req.params.userId;
    let user = null;

    //find user by id
    try {
        user = await User.findById(userId);
        if (!user) {
            console.log("User not found");
        }

    } catch (err) {
        console.log("Internal server error");
    }

    // Validate request
    if (!req.body.summary) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }

    // Create an event
    var newEvent = new EventModel({
        summary: req.body.summary,
        description: req.body.description,
        start: {
            'dateTime': req.body.start,
            'timeZone': 'Africa/Tunis'
        },
        end: {
            'dateTime': req.body.end,
            'timeZone': 'Africa/Tunis'
        }
    })

    newEvent.save()
        .then(data => console.log(data))
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the event!"
            });
        });

    //insert event in the google calendar
    insertEvent(newEvent)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });

    // update user
    try {
        const newUser = user;
        newUser.SportEvents.push(newEvent)

        // Update the User in the database
        const result = await User.findByIdAndUpdate(userId, newUser, { new: true });

        res.json({ "newEvent": newEvent, "updatedUser": result }); // return the updated User object
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update User' });
    }
};

//get all Events 
exports.findAll = (req, res) => {
    EventModel.find()
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
}

//get Event by id
exports.findEventById = (req, res) => {
    EventModel.findById(req.params.id)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
}

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

//get events between two dates 
exports.findEventsBetweenTwoDates = (req, res) => {
    let start = req.body.startDate
    let end = req.body.endDate
    getEvents(start, end)
        .then(event => res.json(event))
        .catch(err => res.status(400).json('Error: ' + err));
}

//get events from calendar
exports.getEventsCalendar = async (req, res) => {
    calendar.events.list({
        auth: auth,
        calendarId: calendarId,
        // timeMin: (new Date()).toISOString(),
        maxResults: 10,
        singleEvents: true,
        orderBy: 'startTime',
    }
        //   , (err, res) => {
        //     if (err) return console.log('The API returned an error: ' + err);
        //     const eventsFromCalendar = res.data.items;
        //     // Combine events from MongoDB and Google Calendar
        //     // const events = [...eventsFromDb, ...eventsFromCalendar];
        //     // res.json(events);
        //     res.send(eventsFromCalendar)
        //   }
    ).then(data => res.send(data.data.items))
        .catch(err => err.status(500).json({ error: 'Failed to get events' }))
}

// Delete an event from eventID
const deleteEventformCalendar = async (eventId) => {

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

//delete a Event by id
exports.deleteEvent = async (req, res) => {

    let e = null
    let id = req.params.id
    //find event by id
    try {
        e = await EventModel.findById(id);
        if (!e) {
            console.log("Event not found");
        }
    } catch (err) {
        console.log("Internal server error");
    }

    let list = getEvents(e.start.dateTime, e.end.dateTime)
        .then(() =>
            EventModel.findByIdAndDelete(req.params.id)
                .then(async () => {
                    res.json('Event type deleted!')

                    await User.updateMany({}, { $pull: { SportEvents: { _id: req.params.id } } })

                    //delete event from calendar
                    for (let index = 0; index < list.length; index++) {
                        deleteEventformCalendar(list[index].id)
                            .then((res) => {
                                console.log(res);
                            })
                            .catch((err) => {
                                console.log(err);
                            });
                    }
                })
                .catch(err => res.status(400).json('Error: ' + err))
        )
        .catch(err => res.status(400).json('Error: ' + err));
}

//update a Event
exports.updateEvent = async (req, res) => {

    let e = null
    let id = req.params.id
    //find event by id
    try {
        e = await EventModel.findById(id);
        if (!e) {
            console.log("Event not found");
        }
    } catch (err) {
        console.log("Internal server error");
    }

    let list = getEvents(e.start.dateTime, e.end.dateTime)
        .then((data) => {
            EventModel.findById(req.params.id)
                .then(async (event) => {
                    event.summary = req.body.summary;
                    event.description = req.body.description;

                    event.save()
                        .then(() => res.json('Event updated!'))
                        .catch(err => res.status(400).json('Error: ' + err));

                    await User.updateMany({}, { $set: { SportEvents: event } })

                    console.log(data);
                    for (let index = 0; index < list.length; index++) {
                        console.log("hi");
                        console.log({ "id": list[index].id });
                        // deleteEventformCalendar(list[index].id)
                        //     .then((res) => {
                        //         console.log(res);
                        //     })
                        //     .catch((err) => {
                        //         console.log(err);
                        //     });

                        // Update the event using the Calendar API
                        calendar.events.update({
                            auth: auth,
                            calendarId: calendarId,
                            eventId: list[index].id,
                            resource: event
                        }, (err, res) => {
                            if (err) {
                                console.error(`Error updating event: ${err}`);
                            } else {
                                console.log('Event updated successfully:', res.data);
                            }
                        });
                    }

                    // insertEvent(event)
                    //     .then((res) => {
                    //         console.log(res);
                    //     })
                    //     .catch((err) => {
                    //         console.log(err);
                    //     });
                })
                .catch(err => res.status(400).json('Error: ' + err));
        })
}

//get all events of a specific user
//get Event by id
exports.getEventsUser = (req, res) => {
    User.findById(req.params.id)
        .then(user => res.json(user.SportEvents))
        .catch(err => res.status(400).json('Error: ' + err));
}






///////////////////////////////////////NOTIFICATION////////////////////////////////////////////





const moment = require('moment');
const sgMail = require('@sendgrid/mail')
API_KEY = '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'

sgMail.setApiKey(API_KEY)

const sendEmail = async (receiver, source, subject, content) => {
    // msg object
    const message = {
        to: receiver,
        from: source,
        subject: subject,
        html: content,
    }

    //send email
    await sgMail.send(message)
        .then(res => console.log({ result: res, msg: 'Email sent...' }))
        .catch(err => console.log(err.message))
}

const checkEvents = async () => {
    const now = moment();

    const events = EventModel.find()
        .then(async (events) => {
            if (events) {
                for (const event of events) {
                    const start = moment(event.start.dateTime);
                    if (start.diff(now, 'minutes') <= 15) {
                        await sendEmail('haifaarouri29@gmail.com',
                            'haifa.arouri@esprit.tn',
                            `Reminder: Upcoming event - ${event.summary}`,
                            `You have an upcoming event - ${event.summary} scheduled for ${start.format('LLL')}`,
                            (error, info) => {
                                if (error) {
                                    console.log('Error sending email', error);
                                } else {
                                    console.log('Email sent: ' + info.response);
                                }
                            });
                    }
                }
            }
        })
        .catch(err => res.status(400).json('Error: ' + err));
};

// call the checkEvents function every 5 minutes
setInterval(checkEvents, 5 * 60 * 1000);