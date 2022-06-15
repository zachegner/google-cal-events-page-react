import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";


const Event = ({ event }) => {

    const { name, description, start, end, location, image, dateRange, link } = event;

    const [eventUrl, setEventUrl] = useState('');

    useEffect(() => {
        const re = /(https?:\/\/[^ ]*)/
        if (re.test(description)) {
            const url = re.exec(description)
            setEventUrl(url[0])
        }
    }, [])

    const newDesc = description ? description.substring(eventUrl.length) : '';

    return (
        <div className="event-container">
            <div className="event-image-container">
                {!image ? <img className='placeholder-image' src="src/images/lostShoeOutline.png" alt="event-image" /> : <img className="event-image" src={`https://drive.google.com/uc?export=view&id=${image[0].fileId}`} alt={`${name} Image`} />}

            </div>
            <div className="event-info">
                <h1>{name ? name.toUpperCase() : "EVENT"}</h1>
                <h2>{start.day}, {start.month} {start.date}</h2>
                <h4>{start.time}</h4>
                <p>{newDesc}</p>
                {eventUrl && <form action={eventUrl}>
                    <input className="info-btn" type="submit" value="EVENT LINK" />
                </form>}
            </div>
            <Divider></Divider>
            <br />
        </div>
    );
};

export default Event;
