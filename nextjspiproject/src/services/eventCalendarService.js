import axios from "axios"

export const deleteEvent = async (id) => {
    const res = await fetch(`${process.env.backurl}/api/eventCalendarSport/${id}`, {
        method: 'DELETE'
    })
    const data = await res.json()
    return data
}

// export const fetchSubTypeData = async (url) => {
//     const res = await fetch(url)
//     const data = await res.json()
//     return data
// }

export const submitEventForm = async (data, operationMode, userId) => {

    const method = operationMode === 'Add' ? 'POST' : 'PUT'
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            summary: data.target.summary.value,
            description: data.target.description.value
        }),

    }
    const res =
        operationMode === 'Add'
            ? await fetch(`${process.env.backurl}/api/eventCalendarSport/addEvent/${userId}`, options)
            : await fetch(`${process.env.backurl}/api/eventCalendarSport/${data.target.id.value}`, options)
    const result = await res.json()
    return result
}

// Your TIMEOFFSET Offset
const TIMEOFFSET = '+01:00';

const convertTime = (time) => {

    const date = new Date(time);
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

    let res = new Date(Date.parse(newDateTime));

    return res
};

export const submitEventUser = async (data, operationMode, userId) => {

    const startDate = convertTime(data.target.start.value)
    const endDate = convertTime(data.target.end.value)

    console.log(startDate);
    console.log(endDate);

    const method = operationMode === 'Add' ? 'POST' : 'PUT'
    const options = {
        method: method,
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            summary: data.target.summary.value,
            description: data.target.description.value,
            start: startDate,
            end: endDate
        }),

    }
    const res =
        operationMode === 'Add'
            ? await fetch(`${process.env.backurl}/api/eventCalendarSport/addEvent/${userId}`, options)
            : await fetch(`${process.env.backurl}/api/eventCalendarSport/${data.target.id.value}`, options)
    const result = await res.json()
    return result
}