const Event = ({ key, event }) => {

    const { name, description, start, end, location, image, dateRange, link } = event;

    return <div className="event-container">
        <div className="event-image-container">
            {!image ? <img className="placeholder-image" src="https://via.placeholder.com/150x150" alt="event-image" /> : <img className="event-image" src={`https://drive.google.com/uc?export=view&id=${image[0].fileId}`} alt={`${name} Image`} />}

        </div>
        <div className="event-info">
            <h1>{name}</h1>
            <p>{dateRange}</p>
            <p>{start.month} {start.date}</p>
            <p>{start.time}</p>
            <p>{description}</p>
            <a href={link}>Link</a>
            
        </div>
    </div>;
};

export default Event;
