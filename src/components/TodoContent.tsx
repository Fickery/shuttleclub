import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";

export default function TodoContent({ selectedTask }) {
  const [checkboxItems, setCheckboxItems] = useState([]);
  const [allChecked, setAllChecked] = useState(false);

  const handleCheckboxChange = (index) => {
    const updatedItems = [...checkboxItems];
    updatedItems[index].isChecked = !updatedItems[index].isChecked;
    setCheckboxItems(updatedItems);
  };

  const handleAddCheckbox = () => {
    setCheckboxItems([...checkboxItems, { label: "", isChecked: false }]);
  };

  const handleRemoveCheckbox = (index) => {
    const updatedItems = [...checkboxItems];
    updatedItems.splice(index, 1);
    setCheckboxItems(updatedItems);
  };

  useEffect(() => {
    const allChecked = checkboxItems.every((item) => item.isChecked);
    setAllChecked(allChecked);
  }, [checkboxItems]);

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

          {/* Checkbox section */}
          <div className="flex flex-col gap-2">
            {checkboxItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => handleCheckboxChange(index)}
                />
                <input
                  type="text"
                  placeholder="Name checkbox"
                  value={item.label}
                  onChange={(e) => {
                    const updatedItems = [...checkboxItems];
                    updatedItems[index].label = e.target.value;
                    setCheckboxItems(updatedItems);
                  }}
                />
                <button
                  className=" text-xs text-teal-400 hover:text-teal-500"
                  onClick={() => handleRemoveCheckbox(index)}
                >
                  <FaTrash />
                </button>
              </div>
            ))}
            <button onClick={handleAddCheckbox}>Add Checkbox</button>
          </div>
        </>
      )}
      <button
        className={`mx-auto w-full bg-teal-500 px-4 py-3 text-center text-base font-semibold text-white ${
          !allChecked ? "cursor-not-allowed opacity-50" : "hover:bg-teal-300"
        }`}
        disabled={!allChecked}
      >
        Complete
      </button>
    </div>
  );
}
