import React from "react";

export default function DateToday() {
  const month = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const d = new Date();
  let name = month[d.getMonth()];
  const year = new Date().getFullYear();

  const today = "Today";
  const date = `${name} ${year}`;

  return (
    <div>
      <h1 className="w-full border-none text-xs font-black tracking-tight text-[blue] placeholder:text-xs">
        {today}, <span className="font-bold uppercase">{date}</span>
      </h1>
    </div>
  );
}
