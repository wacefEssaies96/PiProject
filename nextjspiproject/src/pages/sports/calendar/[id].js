import { fetchSubTypeData } from "@/services/SportSubTypeServices";
import { submitEventUser } from "@/services/eventCalendarService";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Button, Form } from "react-bootstrap";
import { Cookies } from "react-cookie";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from 'react-toastify';

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};

const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});

function CalendarPage({ events }) {

    const [newEvent, setNewEvent] = useState({
        summary: "",
        description: "",
        start: {
            dateTime: null
        },
        end: {
            dateTime: null
        }
    });
    const [operationMode, setOperationMode] = useState('Add')
    const [validated, setValidated] = useState(false)
    const [allEvents, setAllEvents] = useState(events);
    const cookies = new Cookies();

    const handleDateTimeChange = (event) => {
        const { value } = event.target;
        setNewEvent({
            ...newEvent,
            start: {
                ...newEvent.start,
                dateTime: new Date(value).toISOString()
            }
        });
    }

    useEffect(() => {
        let table = []
        for (let index = 0; index < allEvents.length; index++) {
            const newObj = Object.keys(allEvents[index]).reduce((acc, key) => {
                const newKey = key === 'summary' ? 'title' : key;
                acc[newKey] = allEvents[index][key];
                acc['description'] = newEvent['description'];
                acc['start'] = allEvents[index].start;
                acc['end'] = allEvents[index].end;
                return acc;
            }, {});
            table.push(newObj)
        }
        setAllEvents(table)
        console.log(allEvents);
    }, [])

    const handleAddEvent = async (e) => {
        e.preventDefault()
        const form = e.currentTarget
        setValidated(true)

        if (operationMode === 'Add') {
            if (form.checkValidity() === true) {
                await submitEventUser(e, operationMode, cookies.get('user')._id)
                toast.success('Your Event is Added Successfully!', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                })
            }
        } else {
            await submitEventUser(e, operationMode, cookies.get('user')._id)
            toast.success('Your Event is Updated Successfully!', {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }

        const newObj = Object.keys(newEvent).reduce((acc, key) => {
            const newKey = key === 'summary' ? 'title' : key;
            acc[newKey] = newEvent[key];
            acc['description'] = newEvent['description'];
            acc['start'] = newEvent.start.dateTime;
            acc['end'] = newEvent.end.dateTime;
            return acc;
        }, {});
        setAllEvents([...allEvents, newObj]);
    }
    console.log(events);

    const eventDates = events.map(event => {
        const startDate = new Date(event.start.dateTime);
        const endDate = new Date(event.end.dateTime);

        return {
            start: startDate,
            end: endDate
        };
    });

    return (
        <div>
            <div id="form-calendar" className="inner-page-banner">
                <div className="container">
                    <div className="inner_intro text-center">
                        <h2 style={{ color: "white", marginBottom: "5%" }}>Add New Event in your Calendar</h2>
                    </div>
                </div>
                <div className="container d-flex justify-content-center">
                    <div style={{color:"white", padding:"2%", marginLeft:"-5%", marginRight:"5%", marginTop:"5%"}}>
                        <h3 style={{color:"white"}}>Sports duration</h3>
                        <p>Ovals may benefit from a combination of cardiovascular exercise and resistance training</p>
                        <p>to reduce body fat and improve overall health. Working out 3-4 times per week for 45-60 </p>
                        <p>minutes per session can be a good starting point.</p>
                        <h3 style={{color:"white"}}>Diet</h3>
                        <p>A balanced diet that is low in calories and high in protein, healthy fats, and fiber can be</p>
                        <p>beneficial for ovals. They should focus on eating whole, nutrient-dense foods and avoid highly</p>
                        <p>processed and sugary foods.</p>
                        <h4 style={{color:"#dd9933"}}>You have add events to your google calendar<br/> to help you organize your training sessions</h4>
                    </div>
                    <Form noValidate validated={validated} onSubmit={handleAddEvent}>
                        <Form.Group>
                            <Form.Label style={{ color: "white" }}>Event Summary</Form.Label>
                            <Form.Control style={{ width: "400px" }} type="text" name="summary" placeholder="Add Event Summary" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ color: "white" }}>Event Description</Form.Label>
                            <Form.Control type="text" name="description" placeholder="Add Event Description" value={newEvent.description} onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ color: "white" }}>Start Date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                id="datetime-local-input"
                                name="start"
                                onChange={handleDateTimeChange}
                            />
                        </Form.Group>
                        <Form.Group>
                            <Form.Label style={{ color: "white" }}>End Date</Form.Label>
                            <Form.Control
                                type="datetime-local"
                                id="datetime-local-input"
                                name="end"
                                onChange={handleDateTimeChange}
                            />
                        </Form.Group>
                        <Button type="submit" style={{ marginTop: "5%" }} variant="success">
                            Add Event
                        </Button>
                    </Form>
                </div>
            </div>
            <div style={{ margin: "2%" }}>
                <h2>This is your Calendar</h2>
                <iframe
                    src="https://calendar.google.com/calendar/embed?height=700&wkst=2&bgcolor=%230B8043&ctz=Africa%2FTunis&src=NjE3MDZlZTk5MjE5MjA1NzMwNmZlYjU0YWIzZGM5ZTRiYmU0NGQwYjRmNjhiMDJlNTI2MzJhNjIxN2FhY2UwZUBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%23A79B8E"
                    style={{ borderWidth: 0 }}
                    width={1450}
                    height={700}
                    frameBorder={0}
                    scrolling="no"
                />
            </div>
        </div >
    );
}

export async function getServerSideProps(context) {

    const { id } = context.query;
    const data = await fetchSubTypeData(`${process.env.backurl}/api/eventCalendarSport/events`)

    return {
        props: { events: data }
    }
}

export default CalendarPage;