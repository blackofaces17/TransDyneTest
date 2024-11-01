import { useEffect, useRef, useState } from "react";
import Loading from "../common/loading";
import Error from "../common/error";
import "./home.css";

const Home = () => {
  const [dishes, setDishes] = useState([]);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  const getDishes = async () => {
    setLoading("Loading");
    try {
      const response = await fetch(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=chicken"
      );
      const json = await response.json();
      if (json?.meals?.length > 0) {
        setDishes(json.meals);
        setLoading(false);
      }
    } catch (e) {
      setLoading("Error");
    }
  };
  const search = (text) => {
    const filteredDish = dishes.filter((dish) => {
      return dish.strMeal.toLowerCase().includes(text.toLowerCase());
    });
    setDishes(filteredDish);
  };
  useEffect(() => {
    getDishes();
  }, []);
  return (
    <>
      <div>
        <div className="home-header">
          Search text:
          <div className="search-root">
            <input
              type="text"
              ref={inputRef}
              className="search-text"
              onChange={(e) => search(e.target.value)}
            />
            <button
              onClick={() => {
                getDishes();
                inputRef.current.value = "";
              }}
              className="reset-search"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
      {loading === "loading" ? (
        <Loading />
      ) : (
        <div className="home-align">
          <div className="home-root">
            {loading === "Error" ? (
              <Error />
            ) : (
              dishes?.map((dish) => {
                return (
                  <div className="card-root">
                    <div className="card-name">Meal:{dish?.strMeal}</div>
                    <div>
                      <img
                        src={dish?.strMealThumb}
                        alt="not found"
                        className="card-image"
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
