/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { showFormattedDate } from "../utils";

export const Dashboard = () => {
  return (
    <div className="w-full pl-5 max-h-screen bg-white">
      <h1 className="text-center font-bold text-4xl mt-4">Dashboard Admin</h1>
      <div className="flex items-center justify-between m-20">
        <p className="text-lg">{showFormattedDate(new Date())}</p>
        <p className="text-lg text-end font-normal">
          Have a nice day admin &#129392;
        </p>
      </div>
    </div>
  );
};
