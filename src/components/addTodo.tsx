"use client";
import { useState } from "react";
import useAuth from "../hooks/useAuth";
import { addTodo } from "@/app/api/todo";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [checkboxItems, setCheckboxItems] = useState([]);
  const [status, setStatus] = useState("pending");
  const [isLoading, setIsLoading] = useState(false);
  const { isLoggedIn, user } = useAuth();

  const showToast = (message: string, status: string) => {
    alert(message); // toast
  };

  const handleTodoCreate = async () => {
    if (!isLoggedIn) {
      showToast("You must be logged in to create a todo", "error");
      return;
    }
    setIsLoading(true);
    const todo = {
      title,
      description,
      status,
      userId: user.uid,
    };
    await addTodo(todo);
    setIsLoading(false);
    setTitle("");
    setDescription("");
    setStatus("pending");
    showToast(title + " created successfully", "success");
  };

  const handleCheckboxChange = (index: number) => {
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

  return (
    <div className="mx-auto w-full text-sm">
      <div className="flex items-center justify-between gap-4">
        <input
          className="w-1/4 border bg-[#FBF9F9] p-2"
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="w-3/4 resize-none border bg-[#FBF9F9] p-2"
          placeholder="Description"
          rows={1}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select
          className="w-1/4 border bg-[#FBF9F9] p-2"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending" className="font-bold text-yellow-600">
            Pending ⌛
          </option>
          <option value="completed" className="font-bold text-green-600">
            Completed ✅
          </option>
        </select>
        <button
          className={` bg-teal-500 px-4 py-2 text-white ${
            title.length < 1 || description.length < 1 || isLoading
              ? "cursor-not-allowed opacity-50"
              : ""
          }`}
          onClick={handleTodoCreate}
          disabled={title.length < 1 || description.length < 1 || isLoading}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddTodo;
