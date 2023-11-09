"use client";
import React, { useEffect } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../lib/firebase/config";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../app/api/todo";

const TodoList = () => {
  const [todos, setTodos] = React.useState([]);
  const { user } = useAuth();

  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "todo"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
      let ar = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const handleTodoDelete = async (id) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodo(id);
    }
  };

  const handleToggle = async (id, status) => {
    const newStatus = status === "completed" ? "pending" : "completed";
    await toggleTodoStatus({ docId: id, status: newStatus });
  };

  return (
    <div className="w-full pt-5">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        {todos &&
          todos.map((todo) => (
            <div
              key={todo.id}
              className="border border-gray-300 p-3 shadow-sm transition duration-200 hover:shadow-lg"
            >
              <h3 className="text-xl">{todo.title}</h3>
              <button
                className="bg-red-500 hover:bg-red-600 float-right rounded p-1 text-black transition duration-200"
                onClick={() => handleTodoDelete(todo.id)}
              >
                <FaTrash />
              </button>
              <button
                className="float-right ml-2 rounded bg-green-500 p-1 text-white transition duration-200 hover:bg-green-600"
                onClick={() => handleToggle(todo.id, todo.status)}
              >
                {todo.status === "pending" ? <FaToggleOff /> : <FaToggleOn />}
              </button>
              <span
                className={`float-right p-1 opacity-80 ${
                  todo.status === "pending" ? "bg-yellow-500" : "bg-green-500"
                }`}
              >
                {todo.status}
              </span>
              <p>{todo.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodoList;
