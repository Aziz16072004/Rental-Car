import { useEffect, useState } from "react";
import CarAudi from "../images/cars-big/audia1.jpg";
import CarGolf from "../images/cars-big/golf6.jpg";
import CarToyota from "../images/cars-big/toyotacamry.jpg";
import CarBmw from "../images/cars-big/bmw320.jpg";
import CarMercedes from "../images/cars-big/benz.jpg";
import CarPassat from "../images/cars-big/passatcc.jpg";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useToast } from './ui/use-toast.js';

function BookCar({cars}) {
  const [modal, setModal] = useState(false); //  class - active-modal
  const location = useLocation();
  const {
  pickUp2,
  dropOff2,
  pickTime2,
  dropTime2,
  carType2,
  carImg2,
  showPopup2,
} = location.state || {};
  // booking car
  const [carType, setCarType] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
  const [carImg, setCarImg] = useState("");
  // modal infos
  const { toast } = useToast();
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [city, setCity] = useState("");
  const [zipcode, setZipCode] = useState("");
  
  const [user, setUser] = useState(null);
  const [address, setAddress] = useState();
  
 
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("CarRentalCurrentUser"));
    setUser(savedUser);
    
  }, []);
  useEffect(()=>{
    if (user) {
    setAddress(user.adresse);
    setCity(user.city);
    setZipCode(user.zipCode);
    }
  },[user])
  useEffect(() => {
    if (showPopup2 && carType2) {
      
      setPickUp(pickUp2);
      setDropOff(dropOff2);
      setPickTime(pickTime2);
      setDropTime(dropTime2);
      setCarType(carType2);
      setCarImg(carImg2)
      setModal(true);
    }
  }, [showPopup2, carType2]);
  // taking value of modal inputs
  const handleName = (e) => {
    setName(e.target.value);
  };
  
  const handleLastName = (e) => {
    setLastName(e.target.value);
  };
  
  const handlePhone = (e) => {
    setPhone(e.target.value);
  };
  
  const handleAge = (e) => {
    setAge(e.target.value);
  };
  
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  
  const handleAddress = (e) => {
    setAddress(e.target.value);
  };
  
  const handleCity = (e) => {
    setCity(e.target.value);
  };
  
  const handleZip = (e) => {
    setZipCode(e.target.value);
  };
  
  // open modal when all inputs are fulfilled
  const openModal = (e) => {
    e.preventDefault();
    const errorMsg = document.querySelector(".error-message");
    const errorMsg2 = document.querySelector(".error2-message");
    if (
      pickUp === "" ||
      dropOff === "" ||
      pickTime === "" ||
      dropTime === "" ||
      carType === ""
    ) {
      errorMsg.style.display = "flex";
    } else {
        const start = new Date(pickTime);
        const end = new Date(dropTime);
        const diffTime = end.getTime() - start.getTime();
        // const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        if (diffTime<0) {
                errorMsg2.style.display = "flex";

        }else{
                setModal(!modal);
                const modalDiv = document.querySelector(".booking-modal");
                modalDiv.scroll(0, 0);
                errorMsg.style.display = "none";
                errorMsg2.style.display = "none";

        }
    }
  };
  
  // disable page scroll when modal is displayed
  useEffect(() => {
    if (modal === true) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [modal]);
  
  // confirm modal booking
  const confirmBooking = async(e) => {
    e.preventDefault();
  try {
    const res = await axios.post("http://localhost:5000/reservations/addReservation", {
      customerID: user.CustomerID,
      vehicleID: carType,
      startDate: pickTime,
      endDate: dropTime,
      pickupLocation: pickUp,
      dropoffLocation: dropOff
    });
    setModal(!modal);
    toast({
        title: "reservation added Successful!",
        description: "Your reservation added successfully.!",
        status: "success",
        });
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "flex";
  } catch (error) {
    console.log(error);
  }
  };
  
  // taking value of booking inputs
  const handleCar = (e) => {
    console.log(e.target.value);
    setCarType(e.target.value);
    const findCar = cars.find(car => car.VehicleID == e.target.value);    
    setCarImg(findCar.ImageURL);
  };
  
  const handlePick = (e) => {
    setPickUp(e.target.value);
  };
  
  const handleDrop = (e) => {
    setDropOff(e.target.value);
  };
  
  const handlePickTime = (e) => {
    setPickTime(e.target.value);
  };
  
  const handleDropTime = (e) => {
    setDropTime(e.target.value);
  };
  
  // hide message
  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };
 
  
  return (
    <>
      <section id="booking-section" className="book-section">
        {/* overlay */}
        <div
          onClick={openModal}
          className={`modal-overlay ${modal ? "active-modal" : ""}`}
          ></div>

        <div className="container">
          <div className="book-content">
            <div className="book-content__box">
              <h2>Book a car</h2>

              <p className="error-message">
                All fields required! <i className="fa-solid fa-xmark"></i>
              </p>
              <p className="error2-message">
                data Invalid! <i className="fa-solid fa-xmark"></i>
              </p>

              <p className="booking-done">
                Check your email to confirm an order.{" "}
                <i onClick={hideMessage} className="fa-solid fa-xmark"></i>
              </p>

              <form className="box-form">
                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-car"></i> &nbsp; Select Your Car
                    Type <b>*</b>
                  </label>
                  <select onChange={handleCar}>
                    <option>Select your car type</option>
                    {cars.map((ele)=>(
                    <option value={ele.VehicleID}>{ele.Model}</option>
                    ))}
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Pick-up{" "}
                    <b>*</b>
                  </label>
                  <select value={pickUp} onChange={handlePick}>
                    <option>Select pick up location</option>
                    <option value='Manouba'>Manouba</option>
                    <option value='ariena'>ariena</option>
                    
                  </select>
                </div>

                <div className="box-form__car-type">
                  <label>
                    <i className="fa-solid fa-location-dot"></i> &nbsp; Drop-off{" "}
                    <b>*</b>
                  </label>
                  <select value={dropOff} onChange={handleDrop}>
                    <option>Select drop off location</option>
                    <option value='Manouba'>Manouba</option>
                    <option value='ariena'>ariena</option>
                  </select>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="picktime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Pick-up <b>*</b>
                  </label>
                  <input
                    id="picktime"
                    value={pickTime}
                    onChange={handlePickTime}
                    type="date"
                  ></input>
                </div>

                <div className="box-form__car-time">
                  <label htmlFor="droptime">
                    <i className="fa-regular fa-calendar-days "></i> &nbsp;
                    Drop-off <b>*</b>
                  </label>
                  <input
                    id="droptime"
                    value={dropTime}
                    onChange={handleDropTime}
                    type="date"
                  ></input>
                </div>

                <button onClick={openModal} type="submit">
                  Search
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* modal ------------------------------------ */}

      <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
        {/* title */}
        <div className="booking-modal__title">
          <h2>Complete Reservation</h2>
          <i onClick={openModal} className="fa-solid fa-xmark"></i>
        </div>
        {/* message */}
        <div className="booking-modal__message">
          <h4>
            <i className="fa-solid fa-circle-info"></i> Upon completing this
            reservation enquiry, you will receive:
          </h4>
          <p>
            Your rental voucher to produce on arrival at the rental desk and a
            toll-free customer support number.
          </p>
        </div>
        {/* car info */}
        <div className="booking-modal__car-info">
          <div className="dates-div">
            <div className="booking-modal__car-info__dates">
              <h5>Location & Date</h5>
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Pick-Up Date & Time</h6>
                  <p>
                    {pickTime} /{" "}
                    <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-location-dot"></i>
                <div>
                  <h6>Drop-Off Date & Time</h6>
                  <p>
                    {dropTime} /{" "}
                    <input type="time" className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Pick-Up Location</h6>
                  <p>{pickUp}</p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Drop-Off Location</h6>
                  <p>{dropOff}</p>
                </div>
              </span>
            </div>
          </div>
          <div className="booking-modal__car-info__model">
            <h5>
              <span>Car -</span> {carType}
            </h5>
            {carImg && <img src={carImg} alt="car_img" />}
          </div>
        </div>
        {user?(

          <div className="booking-modal__person-info">
       
          <h4>Personal Information</h4>
          <form className="info-form">
            <div className="info-form__2col">
              <span>
                <label>
                  First Name 
                </label>
                <input
                  value={user ? user.firstName:name }
                  onChange={handleName}
                  readOnly
                  type="text"
                  placeholder="Enter your first name"
                ></input>
          
              </span>

              <span>
                <label>
                  Last Name 
                </label>
                <input
                  value={user ? user.lastName: lastName}
                  onChange={handleLastName}
                  type="text"
                  readOnly
                  placeholder="Enter your last name"
                ></input>
     
              </span>

              <span>
                <label>
                  Phone Number
                </label>
                <input
                  value={user ? user.phoneNumber:phone}
                  onChange={handlePhone}
                  type="tel"
                  readOnly
                  placeholder="Enter your phone number"
                ></input>
        
              </span>

              <span>
                <label>
                  Age
                </label>
                <input
                  value={user? user.age:age}
                  onChange={handleAge}
                  type="number"
                  readOnly
                  placeholder="18"
                ></input>
           
              </span>
            </div>

            <div className="info-form__1col">
              <span>
                <label>
                  Email
                </label>
                <input
                  value={user ? user.email:email}
                  onChange={handleEmail}
                  type="email"
                  readOnly
                  placeholder="Enter your email address"
                ></input>
           
              </span>

              <span>
                <label>
                  Address <b>*</b>
                </label>
                <input
                  value={address}
                  onChange={handleAddress}
                  type="text"
                  placeholder="Enter your street address"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <div className="info-form__2col">
              <span>
                <label>
                  City <b>*</b>
                </label>
                <input
                  value={city}
                  onChange={handleCity}
                  type="text"
                  placeholder="Enter your city"
                ></input>
                <p className="error-modal">This field is required.</p>
              </span>

              <span>
                <label>
                  Zip Code <b>*</b>
                </label>
                <input
                  value={zipcode}
                  onChange={handleZip}
                  type="text"
                  placeholder="Enter your zip code"
                ></input>
                <p className="error-modal ">This field is required.</p>
              </span>
            </div>

            <span className="info-form__checkbox">
              <input type="checkbox"></input>
              <p>Please send me latest news and updates</p>
            </span>

            <div className="reserve-button">
              <button onClick={confirmBooking}>Reserve Now</button>
            </div>
          </form>
        </div>
         ):<div className="navbar__buttons d-flex justify-center mt-5"><Link className="navbar__buttons__sign-in" to="/login" state={{
    pickUp2: pickUp,
    dropOff2: dropOff,
    pickTime2: pickTime,
    dropTime2: dropTime,
    carType2: carType,
    carImg2:carImg,
    showPopup2: true,
  }}>
                       Sign In
                     </Link>
                     <Link className="navbar__buttons__register" to="/signup">
                       Register
                     </Link></div>}
      </div>
    </>
  );
}

export default BookCar;
