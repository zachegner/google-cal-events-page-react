import { useState, useEffect } from "react";

const Event = ({ event }) => {

    const { name, description, start, location, image, dateRange } = event;

    const [eventUrl, setEventUrl] = useState('');
    const [eventDescription, setEventDescription] = useState('');

    useEffect(() => {
        // clean string of html tags
        const cleanDescription = description ? description.replace(/<(?:.|\n)*?>/gm, '').replace(/&amp;/g, "&") : '';
        setEventDescription(cleanDescription);

        const re = /(https?:\/\/[^ ]*)/
        if (re.test(cleanDescription)) {
            const url = re.exec(cleanDescription)
            setEventUrl(url[0])
        }
    }, [description])

    const newDesc = eventDescription ? eventDescription.substring(eventUrl.length) : '';

    return (
        <>
            <div className="event-container">
                <div className="event-image-container">
                    {!image ? <img className='placeholder-image' src="./images/lostShoeOutline.png" alt="Lost Shoe Logo" /> : <img className="event-image" src={`https://drive.google.com/uc?export=view&id=${image[0].fileId}`} alt={`${name} Image`} />}

                </div>
                <div className="event-info">
                    <h1>{name ? name.toUpperCase() : "EVENT"}</h1>
                    <h2>{start.day}, {start.month} {start.date}</h2>
                    <h4>{dateRange}</h4>
                    <p>{newDesc}</p>
                    {location ? <h5>Held at: {location}</h5> : null}
                    {eventUrl && <form target="_blank" rel="noreferrer noopener" action={eventUrl}>
                        <input className="info-btn" type="submit" value="EVENT LINK" />
                    </form>}
                </div>
                <br />
            </div>
            <hr className="solid"></hr>
        </>
    );
};

export default Event;
