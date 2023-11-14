import { db } from "../../lib/firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export type TodoProps = {
  docId: string | number;
  id: string | number;
  isChecked: boolean;
  label: string;
  userId: string | number;
  title: string;
  description: string;
  status: string;
  task: [];
};

const addTodo = async ({
  userId,
  title,
  description,
  status,
  task,
}: TodoProps) => {
  try {
    await addDoc(collection(db, "todo"), {
      user: userId,
      title: title,
      description: description,
      status: status,
      task: task,
      createdAt: new Date().getTime(),
    });
  } catch (err) {
    console.error(err);
  }
};

const toggleTodoStatus = async ({ docId, status }: TodoProps) => {
  try {
    const todoRef = doc(db, "todo", docId.toString());
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    console.error(err);
  }
};

const deleteTodo = async (docId: TodoProps) => {
  try {
    const todoRef = doc(db, "todo", docId.toString());
    await deleteDoc(todoRef);
  } catch (err) {
    console.error(err);
  }
};

export { addTodo, toggleTodoStatus, deleteTodo };
