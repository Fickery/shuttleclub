"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../lib/firebase/config";
import { FaToggleOff, FaToggleOn, FaTrash } from "react-icons/fa";
import { deleteTodo, toggleTodoStatus } from "../app/api/todo";
import { TodoProps } from "../app/api/todo";

//types
interface TodoListProps {
  onTaskClick: (task: SetStateAction<null>) => void;
}

type TodoPropId = TodoProps["id"];
type TodoPropStatus = TodoProps["status"];

const TodoList = ({ onTaskClick }: TodoListProps) => {
  const [todos, setTodos] = useState<TodoProps[]>([] as TodoProps[]);
  const { user } = useAuth();

  const refreshData = () => {
    if (!user) {
      setTodos([]);
      return;
    }
    const q = query(collection(db, "todo"), where("user", "==", user.uid));
    onSnapshot(q, (querySnapchot) => {
      let ar: any[] = [];
      querySnapchot.docs.forEach((doc) => {
        ar.push({ id: doc.id, ...doc.data() });
      });
      setTodos(ar);
    });
  };

  useEffect(() => {
    refreshData();
  }, [user]);

  const handleTodoDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this todo?")) {
      deleteTodo(id);
    }
  };

  const handleToggle = async (id: string, status: TodoPropStatus) => {
    const newStatus = status === "completed" ? "pending" : "completed";
    await toggleTodoStatus({ docId: id, status: newStatus });
  };

  return (
    <div className="w-full">
      <div className="grid cursor-pointer grid-cols-1 gap-8 md:grid-cols-4">
        {todos &&
          todos.map((todo) => (
            <div
              key={todo.id}
              onClick={() => {
                onTaskClick({
                  ...todo,
                  isChecked: todo.status === "completed",
                });
                console.log(todo);
              }}
              className={`bg-[#FBF9F9] p-5 shadow-sm transition duration-200 hover:shadow-lg ${
                todo.status === "completed"
                  ? "opacity-50 hover:shadow-none"
                  : "" // Add opacity for completed todos
              }`}
            >
              <div className="flex justify-between">
                <h3 className="text-xl font-black">{todo.title}</h3>
                <button
                  className="float-right rounded p-1 text-black transition duration-100 hover:text-gray-400"
                  onClick={() => handleTodoDelete(todo.id)}
                >
                  <FaTrash />
                </button>
              </div>
              <div>
                <p className="text-sm">{todo.description}</p>
              </div>

              <div className="flex w-full items-center pt-8  align-middle">
                <span
                  className={`float-right p-1 text-sm font-black opacity-80 ${
                    todo.status === "pending" ? "bg-yellow-500" : "bg-green-500"
                  }`}
                >
                  {todo.status}
                </span>
                <button
                  className="float-right ml-2 rounded bg-black p-1 text-white transition duration-100 hover:bg-gray-400"
                  onClick={() => handleToggle(todo.id, todo.status)}
                >
                  {todo.status === "pending" ? <FaToggleOff /> : <FaToggleOn />}
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default TodoList;
