import {
  addDoc,
  collection,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { db } from "../lib/firebase/config";

import Today from "./ui/Today";

export default function TodoContent({ selectedTask }) {
  const [checkboxItems, setCheckboxItems] = useState([]);
  const [areAllCheckboxesChecked, setAreAllCheckboxesChecked] = useState(false);
  const [editedDescription, setEditedDescription] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    const fetchCheckboxItems = async () => {
      if (selectedTask) {
        const checkboxItemsRef = collection(
          db,
          "todo",
          selectedTask.id,
          "checkboxItemsCollection",
        );
        const snapshot = await getDocs(checkboxItemsRef);
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setCheckboxItems(items);
      }
    };

    fetchCheckboxItems();
    setEditedDescription(selectedTask ? selectedTask.description : "");
  }, [selectedTask]);

  useEffect(() => {
    const allChecked = checkboxItems.every((item) => item.isChecked);
    setAreAllCheckboxesChecked(allChecked);
  }, [checkboxItems]);

  //isCompleted button
  useEffect(() => {
    // Update the state of the "Complete" button based on the checkbox items' status
    const allChecked = checkboxItems.every((item) => item.isChecked);
    setAreAllCheckboxesChecked(allChecked);
    setIsCompleted(!allChecked);
  }, [checkboxItems]);

  const handleCompleteButtonClick = async () => {
    const taskDocRef = doc(db, "todo", selectedTask.id);
    await updateDoc(taskDocRef, {
      status: "completed",
    });
  };

  //checkbox section
  const handleCheckboxChange = async (index) => {
    const updatedItems = [...checkboxItems];
    updatedItems[index].isChecked = !updatedItems[index].isChecked;
    setCheckboxItems(updatedItems);

    // Update the checkbox status in Firebase
    const checkboxDocRef = doc(
      db,
      "todo",
      selectedTask.id,
      "checkboxItemsCollection",
      updatedItems[index].id,
    );
    await updateDoc(checkboxDocRef, {
      isChecked: updatedItems[index].isChecked,
    });
  };

  const handleAddCheckbox = async () => {
    const newItem = { label: "", isChecked: false };

    // Add a new checkbox item to Firebase
    const checkboxItemsRef = collection(
      db,
      "todo",
      selectedTask.id,
      "checkboxItemsCollection",
    );
    const newItemRef = await addDoc(checkboxItemsRef, newItem);

    setCheckboxItems([...checkboxItems, { id: newItemRef.id, ...newItem }]);
  };

  const handleRemoveCheckbox = async (index) => {
    const updatedItems = [...checkboxItems];
    const removedItemId = updatedItems[index].id;

    // Remove the checkbox item from Firebase
    const checkboxDocRef = doc(
      db,
      "todo",
      selectedTask.id,
      "checkboxItemsCollection",
      removedItemId,
    );
    await updateDoc(checkboxDocRef, {
      isChecked: updatedItems[index].isChecked,
    });

    updatedItems.splice(index, 1);
    setCheckboxItems(updatedItems);
  };

  const handleDescriptionChange = (e) => {
    setEditedDescription(e.target.value);
  };

  const handleSaveDescription = async () => {
    // Update the description in Firebase
    const taskDocRef = doc(db, "todo", selectedTask.id);
    await updateDoc(taskDocRef, {
      description: editedDescription,
    });
  };

  return (
    <div
      className={`flex flex-col justify-between ${
        selectedTask && selectedTask.status === "completed"
          ? "pointer-events-none opacity-50"
          : ""
      }`}
    >
      <Today />
      {selectedTask && (
        <>
          <p className="pb-5 pt-5 text-2xl font-black tracking-tighter">
            {selectedTask.title}
          </p>
          <textarea
            className="mb-5 resize-none border-none bg-gray-100 text-sm"
            rows={2}
            maxLength={50}
            placeholder="Edit Description"
            value={editedDescription}
            onChange={handleDescriptionChange}
            onBlur={handleSaveDescription}
          />

          {/* Checkbox section */}
          <div className="flex flex-col gap-2">
            {checkboxItems.map((item, index) => (
              <div key={index} className="flex items-center gap-2 pl-5">
                <input
                  className="focus:ring-red-500 h-4 w-4 rounded-none border-gray-300 bg-gray-100"
                  name="checkbox"
                  type="checkbox"
                  checked={item.isChecked}
                  onChange={() => handleCheckboxChange(index)}
                />
                <input
                  className="border-0 pl-0 text-xs font-medium placeholder:text-xs placeholder:font-normal placeholder:text-gray-400 focus:ring-0"
                  type="text"
                  placeholder="Rename task"
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

            {selectedTask && selectedTask.status === "completed" ? (
              ""
            ) : (
              <button
                className="my-8 w-fit text-sm tracking-tight text-teal-400  hover:text-teal-300"
                onClick={handleAddCheckbox}
              >
                + Click to add task
              </button>
            )}
          </div>
        </>
      )}

      <button
        onClick={handleCompleteButtonClick}
        className={`mx-auto mb-5 w-full bg-teal-500 px-4 py-3 text-center text-base font-semibold text-white ${
          !areAllCheckboxesChecked
            ? "cursor-not-allowed opacity-50"
            : "mt-5 hover:bg-teal-300"
        }`}
        disabled={!areAllCheckboxesChecked}
      >
        Complete
      </button>
    </div>
  );
}
