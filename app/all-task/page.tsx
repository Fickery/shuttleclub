import AllTask from "@/components/all-task";
import Layout from "@/components/layout";
import Taskbar from "@/components/task-content";
import TopMidContent from "@/components/top-mid-content";

export default function page() {
  return (
    <div className="flex">
      <div>
        <AllTask />
      </div>
    </div>
  );
}
