import styles from "./sidebar-profile.module.scss";
import Dropdown from "./dropdown";

export default function SideProfile() {
  return (
    <div className="flex relative justify-between items-center mb-20">
      <div className="flex justify-center items-center">
        <div className="w-[30px] h-[30px] rounded-full bg-slate-400"></div>
        <div className="ml-2">
          <p className="text-lg font-black">Peter</p>
          <p className="text-base font-medium text-[#adadad]">Main</p>
        </div>
      </div>
      Logout
    </div>
  );
}
