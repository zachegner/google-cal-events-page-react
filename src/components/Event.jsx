const Event = ({ key, event }) => {
    console.log(event)

    return <div className="event-container">
        <div className="event-image">
            <img src='#' alt="Event Image" />
        </div>
        <div className="event-info">
            <h1>{event.name}</h1>
            <p>{event.start.day}, {event.start.month} {event.start.date}</p>
            <p>{event.start.time}</p>
            <p>{event.description}</p>
        </div>
    </div>;
};

export default Event;
