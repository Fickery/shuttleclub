import React, { useState, useEffect } from "react";

const initialState = {
  currentDay: "",
  currentDayOfWeek: "",
  currentMonthYear: "",
};

export default function CurrentDate() {
  const [state, setState] = useState(initialState);

  useEffect(() => {
    const date = new Date();
    const day = date.getDate().toString();
    const dayOfWeek = date.toLocaleString("en-US", { weekday: "long" });
    const monthYear = date.toLocaleString("en-US", {
      month: "long",
      year: "numeric",
    });

    setState({
      currentDay: day,
      currentDayOfWeek: dayOfWeek,
      currentMonthYear: monthYear,
    });
  }, []);

  return (
    <div className="flex">
      <div className="flex justify-center items-center text-5xl font-bold mr-2">
        <p>{state.currentDay}</p>
      </div>
      <div className="flex flex-col justify-center">
        <p className="font-bold text-ms">{state.currentDayOfWeek}</p>
        <p className="text-ms uppercase">{state.currentMonthYear}</p>
      </div>
    </div>
  );
}
