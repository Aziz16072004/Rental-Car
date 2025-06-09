import { useState, useEffect } from "react";
import CarBox from "./CarBox";
import axios from "axios";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { API_URL } from '../api';

function PickCar({user}) {
  const [cars, setCars] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [activeCar, setActiveCar] = useState(0);
  const [colorBtn, setColorBtn] = useState("btn0");
  const itemsPerPage = 10;

  useEffect(() => {
    console.log(API_URL);
    
    axios.get(`${API_URL}/cars/getCars`)
      .then((res) => {
        setCars(res.data);
        setColorBtn("btn0");
        setActiveCar(res.data[0])
      })
      .catch((err) => {
        console.error("Failed to fetch vehicles:", err);
      });
  }, []);

  const coloringButton = (id) => (colorBtn === id ? "colored-button" : "");

  const startIndex = currentPage * itemsPerPage;
  const currentCars = cars.slice(startIndex, startIndex + itemsPerPage);
  const hasPrev = currentPage > 0;
  const hasNext = startIndex + itemsPerPage < cars.length;

  return (
    <section className="pick-section">
      <div className="container">
        <div className="pick-container">
          <div className="pick-container__title">
            <h3>Vehicle Models</h3>
            <h2>Our rental fleet</h2>
            <p>
              Choose from a variety of our amazing vehicles to rent for your
              next adventure or business trip
            </p>
          </div>

          <div className="pick-container__car-content">
            <div className="pick-box">
              {hasPrev && (
                <button onClick={() => setCurrentPage((p) => p - 1)}>
                  <ChevronLeft />
                </button>
              )}

              {currentCars.map((car, i) => {
                const globalIndex = startIndex + i;
                const btnId = `btn${globalIndex}`;
                return (
                  <button
                    key={btnId}
                    className={coloringButton(btnId)}
                    onClick={() => {
                      setActiveCar(car);
                      setColorBtn(btnId);
                    }}
                  >
                    {car.Model}
                  </button>
                );
              })}

              {hasNext && (
                <button onClick={() => setCurrentPage((p) => p + 1)}>
                  <ChevronRight />
                </button>
              )}
            </div>

             
              <CarBox data={activeCar} user={user} />
           
          </div>
        </div>
      </div>
    </section>
  );
}

export default PickCar;
