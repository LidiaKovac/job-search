import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.scss";

export const Home = () => {
    const [isValidated, setValid] = useState(false)
    const [position, setPosition] = useState("")
    const [location, setLocation] = useState("")
    const navigation = useNavigate()
    useEffect(()=> {
        isValidated && navigation("/search?pos=" + position + "&loc=" + location)
    }, [isValidated])
  return (
    <div className="home__wrap">
      <div className="search__box">
        <h1>Your next job is here.</h1>
        <div className="inputs__labels">
          <label htmlFor="position">Position</label>
          <label htmlFor="location">Location</label>
        </div>
        <form className="inputs" onKeyDown={(e:React.KeyboardEvent)=> {e && e.key === "Enter" && document.forms[0].reportValidity() ? setValid(true) : setValid(false)}}>
          <input required onChange={(e)=> setPosition(e.currentTarget.value)} type="text" id="position" placeholder="DevOps" />
          <input required onChange={(e)=> setLocation(e.currentTarget.value)} type="text" id="location" placeholder="Rome" />
        </form>
      </div>
    </div>
  );
};
