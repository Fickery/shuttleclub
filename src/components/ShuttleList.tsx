import React from "react";
import { IoCallSharp } from "react-icons/io5";
import { RiMessage2Fill } from "react-icons/ri";
import { BiSolidBell } from "react-icons/bi";
import Dropdown from "./ui/dropdown";

export default function ShuttleList() {
  return (
    <div className="w-full">
      <div className="grid cursor-pointer grid-cols-1 gap-8 md:grid-cols-4">
        <div className="bg-[#FBF9F9] shadow-sm transition duration-200 hover:shadow-lg">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <h1 className="text-xl font-black tracking-tighter">Cooper .D</h1>
              <Dropdown />
            </div>
            <p className="pt-5 font-black tracking-tight">249 task completed</p>
            <p>392 days shuttling</p>
          </div>
          <div className="flex justify-between gap-2 pb-2 pt-5">
            <div className="flex w-full justify-center bg-[#F4EFEF] p-5 text-2xl hover:bg-[#e4e4e4]">
              <IoCallSharp />
            </div>
            <div className="flex w-full justify-center bg-[#F4EFEF] p-5 text-2xl hover:bg-[#e4e4e4]">
              <RiMessage2Fill />
            </div>
            <div className="flex w-full justify-center bg-[#F4EFEF] p-5 text-2xl hover:bg-[#e4e4e4]">
              <BiSolidBell />
            </div>
          </div>
          <div className="hover: w-full bg-[#F4EFEF] bg-[] p-5 text-center text-xl font-black text-[#ADADAD] hover:bg-[#e4e4e4] hover:text-black">
            Assign Task
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
}
