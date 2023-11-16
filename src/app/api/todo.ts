import { db } from "../../lib/firebase/config";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

export type TodoProps = {
  userId: string;
  title: string;
  description: string;
  status: string;
  task: any[];
  id: string;
  docId: string;
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
      task: [],
      createdAt: new Date().getTime(),
    });
  } catch (err) {}
};
const toggleTodoStatus = async ({ docId, status }: TodoProps) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};
const deleteTodo = async (docId: string) => {
  try {
    const todoRef = doc(db, "todo", docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};
export { addTodo, toggleTodoStatus, deleteTodo };
