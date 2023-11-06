import TaskContent from "./task-content";
import TopMidContent from "./top-mid-content";
import Taskbox from "./ui/taskbox";

export default function AllTask() {
  return (
    <div className="flex">
      <div className="flex flex-col">
        <TopMidContent />
        <p className="Header">All Task</p>
        <Taskbox />
      </div>
      <TaskContent />
    </div>
  );
}
