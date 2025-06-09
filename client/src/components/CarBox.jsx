import { useEffect, useState } from "react";
import { Heart } from 'lucide-react';
import axios from "axios";
import { API_URL } from '../api';

function CarBox({ data, user }) {
  const [carLoad, setCarLoad] = useState(true);
  const [like, setLike] = useState(false);
  useEffect(() => {
  if (!user?.CustomerID || !data?.VehicleID) return;

  const checkLiked = async () => {
    try {
      const res = await axios.get(`${API_URL}/cars/isCarLiked`, {
        params: {
          CustomerID: user.CustomerID,
          VehicleID: data.VehicleID,
        },
      });
      setLike(res.data.liked);
    } catch (error) {
      console.error("Error checking liked status:", error.message);
    }
  };

  checkLiked();
}, [user?.CustomerID, data?.VehicleID]);

  const handleSave = async () => {
    try {
      const response = await axios.post(`${API_URL}/cars/addLikedCar`, {
        CustomerID: user.CustomerID,
        VehicleID: data.VehicleID,
      });

      if (response.data.message === 'Liked') {
        setLike(true);
      } else if (response.data.message === 'Unliked') {
        setLike(false);
      }
    } catch (error) {
      console.error('Error liking car:', error.response?.data || error.message);
    }
  };

  return (
    <div className="box-cars">
      <div className="pick-car">
        <div className="CarBoxImgLike">

        {carLoad && <span className="loader"></span>}
        <img
          style={{ display: carLoad ? "none" : "block" }}
          src={data.ImageURL}
          alt="car_img"
          onLoad={() => setCarLoad(false)}
        />
        {user?(

          <button onClick={handleSave} className="likedCar absolute top-2 right-2 p-1.5 bg-white rounded-full shadow hover:bg-red-50 transition-colors duration-200">
          <Heart className={like ? "w-7 h-7 text-red-600 fill-red-600" :" w-7 h-7 text-red-600 fill-white-600"}  color={like ? "red" : "black"} size={30}  />
        </button>
        ):null}
      </div>
      </div>







      <div className="pick-description">
        <div className="pick-description__price">
          <span>${data.DailyRate}</span> / rent per day
        </div>

        <div className="pick-description__table">
          <div className="pick-description__table__col">
            <span>Model</span>
            <span>{data.Model}</span>
          </div>

          <div className="pick-description__table__col">
            <span>Mark</span>
            <span>{data.Mark}</span>
          </div>

          <div className="pick-description__table__col">
            <span>Doors</span>
            <span>{data.doors}</span>
          </div>

          <div className="pick-description__table__col">
            <span>Fuel</span>
            <span>{data.fuel}</span>
          </div>
        </div>

        <a className="cta-btn" href="#booking-section">
          Reserve Now
        </a>
      </div>
    </div>
  );
}

export default CarBox;
