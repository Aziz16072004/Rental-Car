import Footer from "../components/Footer";
import HeroPages from "../components/HeroPages";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { useToast } from "../components/ui/use-toast";
import axios from "axios";

function Models({cars ,user}) {
   const [modal, setModal] = useState(false); //  class - active-modal
    
    const [carType, setCarType] = useState("");
  const [pickUp, setPickUp] = useState("");
  const [dropOff, setDropOff] = useState("");
  const [pickTime, setPickTime] = useState("");
  const [dropTime, setDropTime] = useState("");
    const { toast } = useToast();
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [phone, setPhone] = useState("");
    const [age, setAge] = useState("");
    const [email, setEmail] = useState("");
    const [city, setCity] = useState("");
    const [zipcode, setZipCode] = useState("");
    const [selectedCar , setSelectedCar] = useState({});
  useEffect(()=>{
    if (user) {
    setAddress(user.adresse);
    setCity(user.city);
    setZipCode(user.zipCode);
    }
  },[user])
 
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
    const [address, setAddress] = useState();
  // open modal when all inputs are fulfilled
  const CloseModal = (e) => {
    setModal(false)
  };

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
  const hideMessage = () => {
    const doneMsg = document.querySelector(".booking-done");
    doneMsg.style.display = "none";
  };
 
  
  return (
    <>
      <section className="models-section">
        <HeroPages name="Vehicle Models" />
        <div className={`booking-modal ${modal ? "active-modal" : ""}`}>
  
        <div className="booking-modal__title">
          <h2>Complete Reservation</h2>
          <i onClick={CloseModal} className="fa-solid fa-xmark"></i>
        </div>
       
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
                    <input type="date" onChange={handlePick}/>
                    <input type="time" onChange={handlePickTime} className="input-time" ></input>
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
                    <input type="date" onChange={handleDrop}/>
                    <input type="time" onChange={handleDropTime} className="input-time"></input>
                  </p>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Pick-Up Location</h6>
                  <select value={pickUp} onChange={handlePick}>
                    <option>Select pick up location</option>
                    <option value='Manouba'>Manouba</option>
                    <option value='ariena'>ariena</option>
                    
                  </select>
                </div>
              </span>
            </div>

            <div className="booking-modal__car-info__dates">
              <span>
                <i className="fa-solid fa-calendar-days"></i>
                <div>
                  <h6>Drop-Off Location</h6>
                  <select value={pickUp} onChange={handlePick}>
                    <option>Select pick up location</option>
                    <option value='Manouba'>Manouba</option>
                    <option value='ariena'>ariena</option>
                  </select> 
                </div>
              </span>
            </div>
          </div>
          <div className="booking-modal__car-info__model">
            <h5>
              <span>Car -</span> {carType}
            </h5>
            {console.log(selectedCar)}
           <img src={selectedCar.ImageURL} alt="car_img" />
            
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
         ):<div className="navbar__buttons d-flex justify-center mt-5"><Link className="navbar__buttons__sign-in" to="/login" >
                       Sign In
                     </Link>
                     <Link className="navbar__buttons__register" to="/signup">
                       Register
                     </Link></div>}
      </div>
        <div className="container">
          <div className="models-div">
            {cars.map((ele,i)=>(
            <div className="models-div__box" key={ele.VehicleID}>
              <div className="models-div__box__img">
                <img src={ele.ImageURL} alt="car_img" />
                <div className="models-div__box__descr">
                  <div className="models-div__box__descr__name-price">
                    <div className="models-div__box__descr__name-price__name">
                      <p>{ele.Mark} {ele.Model}</p>
                      <span>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                        <i className="fa-solid fa-star"></i>
                      </span>
                    </div>
                    <div className="models-div__box__descr__name-price__price">
                      <h4>{ele.DailyRate} $</h4>
                      <p>per day</p>
                    </div>
                  </div>
                  <div className="models-div__box__descr__name-price__details">
                    
                    <span>
                      <i className="fa-solid fa-car-side"></i> &nbsp; Manual
                    </span>
                    <span style={{ textAlign: "right" }}>
                      {ele.fuel} &nbsp; <i className="fa-solid fa-car-side"></i>
                    </span>
                  </div>
                    <button onClick={() =>{setSelectedCar(ele); setModal(true)}} >
                  <div className="models-div__box__descr__name-price__btn">
                      Book Ride
                  </div>
                    </button>
                </div>
              </div>
            </div>

            ))}

            
          </div>
        </div>
        <div className="book-banner">
          <div className="book-banner__overlay"></div>
          <div className="container">
            <div className="text-content">
              <h2>Book a car by getting in touch with us</h2>
              <span>
                <i className="fa-solid fa-phone"></i>
                <h3>+216 50551663</h3>
              </span>
            </div>
          </div>
        </div>
        <Footer />
      </section>
    </>
  );
}

export default Models;
