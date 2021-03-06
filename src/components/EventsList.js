import React from "react";
import Events from "./Event";
import { useState, useEffect, Fragment, useRef } from "react";
import logor from '../images/image.png'
import UserInput from "./UserInput";
import axios from "axios";
import "../styles/EventsList.css";
import HomeBar from "./Homebar";

function EventsList({ setIsLogged }) {
  const [items, setItems] = useState([]);
  const [type, setType] = useState("");
  const [searchType, setSearchType] = useState("");
  const typeRef = useRef();
  const client_id = "MjUzNzU2NTF8MTY0MjI5NTUyNi40ODgzNzgz";
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const separator = "-";

  useEffect(() => {
    const getEvent = async () => {
      try {
        if (searchType === "type") {
          const response = await axios.get(`https://api.seatgeek.com/2/events?type=${type}&geoip=true&client_id=${client_id}&per_page=10&format=json`);
          const { events } = response.data;
          setItems(events);
          console.log(response.data)
        } else if (searchType === "performers") {
          const formatedType = type.split(" ").join(separator);
          const response = await axios.get(`https://api.seatgeek.com/2/events?performers.slug=${formatedType}&geoip=true&client_id=${client_id}&per_page=10&format=json`);
          const { events } = response.data;
          setItems(events);
          console.log(response.data)
        } else {
          console.log("Something went wrong");
          const response = await axios.get(`https://api.seatgeek.com/2/events?geoip=true&client_id=${client_id}&per_page=100&format=json`);
          const { events } = response.data;
          setItems(events);
          console.log(response.data)
        }
      } catch (error) {
        console.log(error);
      }
    };
    console.log("Useeffec")
    return getEvent();
  }, [searchType, type]);
  return (
    <div className="events-list-container">
      <div className="events-list-searchbar">
        <div className="homebar-eventlist">
          <HomeBar  
          setIsLogged={setIsLogged}
          />
        </div>
        <div className="top-container">
          <div className="logo-eventlist-container">
            <img src={logor} id='logo-eventlist'/>
          </div>
          <div className="inputbar-eventlist">
            <UserInput
            setType={setType}
            typeRef={typeRef}
            setSearchType={setSearchType}
            />
          </div>
        </div>
      </div>
      
      <div className="events-list-card">
        <div className="title-eventlist">
          <p id="events-title">Your Events</p>
        </div>
        {
        items && items.map((event,index) => {
          // console.log(event);
          const { stats } = event;
          return (
          
              <Events
              key={index}
                title={event.short_title}
                image={event.performers[0].image}
                date={event.datetime_local.split("T").shift().split("-")}
                months={months}
                score={event.score}
                lowest_price={stats.lowest_price}
                event_id={event.id}
              />
          
          )
        })}
      </div>
    </div>
  );
}

export default EventsList;
