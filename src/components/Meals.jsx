import { useState, useEffect } from "react";
import MealItem from "./MealItem.jsx";
import { useHttp } from "../hooks/useHttp.js";
import Error from "./Error.jsx";

const requestConfig = {};

const Meals = () => {
  const {
    data: loadedMeals,
    isLoading,
    error,
  } = useHttp("http://localhost:3000/meals", requestConfig, []);
  if (isLoading) {
    return <p className="center">Fetching details...</p>;
  }

  if (error) {
    return <Error title={"Failed to fetch"} message={error} />;
  }

  // console.log("meal", loadedMeals);

  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.id} meal={meal} />
      ))}
    </ul>
  );
};

export default Meals;
