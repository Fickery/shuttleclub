import React from "react";

export default function TodoContent({ selectedTask }) {
  return (
    <div className="flex flex-col justify-between">
      <p className="w-full border-none text-xs font-black text-[blue] placeholder:text-xs">
        Today, JULY 2023
      </p>
      {selectedTask && (
        <>
          <p className="pb-5 pt-5 text-2xl font-black tracking-tighter">
            {selectedTask.title}
          </p>
          <p className="pb-5">{selectedTask.description}</p>
        </>
      )}
      <button className="mx-auto w-full bg-teal-500 px-4 py-3 text-center text-base font-semibold text-white hover:bg-teal-300">
        Complete
      </button>
    </div>
  );
}
