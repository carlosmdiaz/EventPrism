import React from "react";
import "../styles/Event.css";
import star from "../images/star.png";
function Event({ title, image, date, months, score, lowest_price, event_id }) {
  const redirectInfo = () => {
    window.location = `https://eventprism.netlify.app/eventinfo/${event_id}`
  }

  const checkPrice = (lowest_price) => {
    let variable = "";
    if(lowest_price == null) {
      variable = `No Price Avalible`
      return variable;
    } else {
      variable = `Lowest $${lowest_price}`
      return variable;
    }
  }

  score = score * 10;
  score = score.toFixed(1);
  return (
    <div className="events" onClick={redirectInfo}>
      <div className="img-container">
        <img className="image_event" src={image} />
      </div>
      <div className="content_event">
        <p id="title">{title}</p>
        <div className="information">
          <p id="date">{`${months[date[1] - 1]} ${date[2]}`}</p>
          <div className="score">
            <img id='star'src={star}/>
            <p>{score}</p>
          </div>
        </div>
        <p id="price">{checkPrice(lowest_price)}</p>
      </div>
    </div>
  );
}

export default Event;
