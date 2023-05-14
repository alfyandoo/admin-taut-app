/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/api";
import { List } from "../components/ManageAdmin/List";
import { Loading } from "../components/templates/Loading";
import { PopUpCreateAdmin } from "../components/ManageAdmin/PopUpCreateAdmin";

export const ManageAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [popUpCreateAdmin, setPopUpCreateAdmin] = useState(false);

  useEffect(() => {
    getAllAdmin();
  }, []);

  const getAllAdmin = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/admins`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token-admin")}`,
        },
      });

      const dataJson = await response.json();

      setData(dataJson.data);
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
    setLoading(false);
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {popUpCreateAdmin && (
            <PopUpCreateAdmin setPopUpCreateAdmin={setPopUpCreateAdmin} getAllAdmin={getAllAdmin} />
          )}
          <div className="w-full flex">
            <div className="mx-5">
              <h1 className="text-center font-bold text-4xl mt-4">
                List Admin
              </h1>
              <div className="mt-20">
                <div className="flex justify-between items-center">
                  <h2 className="font-semibold">Total Admin: {data?.length}</h2>
                  <button onClick={() => setPopUpCreateAdmin(true)} className="p-3 bg-green-500 hover:bg-green-800 rounded-lg text-white">
                    Create Admin
                  </button>
                </div>
                <List data={data} getAllAdmin={getAllAdmin} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
