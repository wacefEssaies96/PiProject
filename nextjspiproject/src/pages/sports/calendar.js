// import { fetchSubTypeData } from "@/services/SportSubTypeServices";
// import format from "date-fns/format";
// import getDay from "date-fns/getDay";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import React, { useEffect, useState } from "react";
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import "react-big-calendar/lib/css/react-big-calendar.css";
// import DatePicker from "react-datepicker";
// import "react-datepicker/dist/react-datepicker.css";

// const locales = {
//     "en-US": require("date-fns/locale/en-US"),
// };

// const localizer = dateFnsLocalizer({
//     format,
//     parse,
//     startOfWeek,
//     getDay,
//     locales,
// });

// // const events = [
// //     {
// //         title: "Big Meeting",
// //         allDay: true,
// //         start: new Date(2023, 4, 0),
// //         end: new Date(2023, 4, 0),
// //     },
// //     {
// //         title: "Vacation",
// //         start: new Date(2023, 4, 7),
// //         end: new Date(2023, 4, 10),
// //     },
// //     {
// //         title: "Conference",
// //         start: new Date(2023, 4, 20),
// //         end: new Date(2023, 4, 23),
// //     },
// // ];

// function CalendarPage({ events }) {

//     const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });
//     const [allEvents, setAllEvents] = useState(events);

//     useEffect(() => {
//         let table =[]
//         for (let index = 0; index < allEvents.length; index++) {
//             const newObj = Object.keys(events[index]).reduce((acc, key) => {
//                 const newKey = key === 'summary' ? 'title' : key;
//                 acc[newKey] = events[index][key];
//                 acc['start'] = events[index].start.dateTime;
//                 acc['end'] = events[index].end.dateTime;
//                 return acc;
//             }, {});
//             table.push(newObj)
//         }
//         setAllEvents(table)
//     }, [])

//     function handleAddEvent() {
//         for (let i = 0; i < allEvents.length; i++) {
//             const d1 = new Date(allEvents[i].start);
//             const d2 = new Date(newEvent.start);
//             const d3 = new Date(allEvents[i].end);
//             const d4 = new Date(newEvent.end);

//             if (
//                 ((d1 <= d2) && (d2 <= d3)) || ((d1 <= d4) &&
//                     (d4 <= d3))
//             ) {
//                 alert("CLASH");
//                 break;
//             }
//         }
//         setAllEvents([...allEvents, newEvent]);
//     }

//     return (
//         <div>
//             <h1>Calendar</h1>
//             <h2>Add New Event</h2>
//             <div>
//                 <input type="text" placeholder="Add Title" style={{ width: "20%", marginRight: "10px" }} value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
//                 <DatePicker placeholderText="Start Date" style={{ marginRight: "10px" }} selected={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} />
//                 <DatePicker placeholderText="End Date" selected={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} />
//                 <button stlye={{ marginTop: "10px" }} onClick={handleAddEvent}>
//                     Add Event
//                 </button>
//             </div>
//             <Calendar localizer={localizer} events={allEvents} startAccessor="start" endAccessor="end" style={{ height: 500, margin: "50px" }} />
//         </div>
//     );
// }

// export async function getServerSideProps() {
//     const data = await fetchSubTypeData(`${process.env.backurl}/api/eventCalendarSport/events`)

//     return {
//         props: { events: data }
//     }
// }

// export default CalendarPage;

import React, { useEffect } from 'react';
import io from 'socket.io-client';

const socketTestPage = () => {
  useEffect(() => {
    const socket = io('http://localhost:3030');
    socket.on('connect', () => {
      console.log('Connected to socket server');
    });
  }, []);

  return <div>My Component</div>;
};

export default socketTestPage;