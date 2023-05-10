/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/api";
import { List } from "../components/ManageUser/List";
import { Loading } from "../components/templates/Loading";

export const ManageAdmin = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    getAllAdmin();
    console.log(data, );
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
      console.log(dataJson);
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
        <div className="w-full flex">
          <div className="mx-5">
            <h1 className="text-center font-bold text-4xl mt-4">
              List Admin
            </h1>
            <h2 className="font-semibold">Total User: {data?.length}</h2>
            <List data={data} getAllAdmin={getAllAdmin} />
          </div>
        </div>
      )}
    </>
  );
};
