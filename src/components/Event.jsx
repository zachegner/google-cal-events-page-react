import { Button } from "@mui/material";
import Divider from "@mui/material/Divider";

const Event = ({ key, event }) => {

    const { name, description, start, end, location, image, dateRange, link } = event;

    var regex = /<html-blob>(.*?)<\/html-blob>/g

    if (regex.test(description)) {
        var result = description.match(/<html-blob>(.*?)<\/html-blob>/g).map(function(val){
        return val.replace(/<\/?html-blob>/g,'');
    });
    }

    

    console.log(result)

    /* var webLink = description.match(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/); */

    return (
        <div className="event-container">
            <div className="event-image-container">
                {!image ? <img className="placeholder-image" src="https://via.placeholder.com/150x150" alt="event-image" /> : <img className="event-image" src={`https://drive.google.com/uc?export=view&id=${image[0].fileId}`} alt={`${name} Image`} />}

            </div>
            <div className="event-info">
                <h1>{name.toUpperCase()}</h1>
                <h2>{start.day}, {start.month} {start.date}</h2>
                <h4>{start.time}</h4>
                <p>{description}</p>
                {/* <p>{webLink}</p> */}
                <button className="info-btn">EVENT LINK</button> 
            </div>
            <Divider></Divider>
            <br />
        </div>
    );
};

export default Event;
