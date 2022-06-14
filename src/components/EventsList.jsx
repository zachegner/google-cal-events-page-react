import Event from './Event.jsx'
import { useEffect, useState } from 'react';

const EventsList = () => {
const [events, setEvents] = useState([])

const getMonth = (month) => ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'][month]

const getDayofWeek = (day) => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][day]

const isAM = (hour) => hour < 12
const getHour = (hour) => (hour <= 12 ? hour : hour - 12)
const getMinute = (minute) => (minute === 0 ? '00' : minute)



function processDate(date) {
    const hour = getHour(date.getHours()) === 0
        ? false
        : getHour(date.getHours())
    const minute = getMinute(date.getMinutes())
    const timeSuffix = `${isAM(date.getHours())
        ? 'AM'
        : 'PM'
        }`
    const time = hour && `${hour}:${minute} ${timeSuffix}` || 'All Day'

    return {
        month: getMonth(date.getMonth()),
        day: getDayofWeek(date.getDay()),
        time: time,
        date: date.getDate(),
    }
}

function mapEventObject(event) {
    const startDate = event.start.dateTime
        ? processDate(new Date(event.start.dateTime))
        : processDate(new Date(`${event.start.date}T00:00:00`))

    const endDate = event.end.dateTime
        ? processDate(new Date(event.end.dateTime))
        : processDate(new Date(`${event.end.date}T00:00:00`))

    let dateRange;
    if (startDate.date !== endDate.date) {
        dateRange = `${startDate.month} ${startDate.date} - ${endDate.month} ${endDate.date}`
    } else if (!startDate.time) {
        dateRange = `${startDate.month} ${startDate.date}`
    } else {
        dateRange = `${startDate.day}, ${startDate.time} - ${endDate.time}`
    }
    return {
        name: event.summary,
        description: event.description,
        start: startDate,
        end: endDate,
        location: event.location,
        image: event.attachments,
        dateRange,
        link: event.htmlLink,
    }
}

async function loadEvents(max = 10) {
  try {
      const endpoint = await fetch(`./.netlify/functions/calFetch?maxResults=${max}`)
      const data = await endpoint.json()
      const processedEvents = data.map(e => mapEventObject(e))
      setEvents(processedEvents)
      
      
      /* processedEvents.map((event, i) => createEvent(event, i)).join('')
      console.log(processedEvents) */
  } catch (error) {
      {/* <p class="text-center text-3xl">Something went wrong...</p> */}
      console.log(error)
  }
}



useEffect(() => {
    loadEvents()
}, [])

/* loadEvents() */

const createEvent = (event, i) => {
    return <Event key={i} event={event} />
}

    return (
        <div className='events-container'>
            {events.map((event, i) => createEvent(event, i))}
        </div>
    )
};

export default EventsList;
