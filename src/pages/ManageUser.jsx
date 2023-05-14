/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { BASE_URL } from "../api/api";
import { List } from "../components/ManageUser/List";
import { Loading } from "../components/templates/Loading";
import { getUserById } from "../utils/api";
import { PopUpUpdateUser } from "../components/ManageUser/PopUpUpdateUser";
import { PopUpDeleteUser } from "../components/ManageUser/PopUpDeleteUser";

export const ManageUser = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [dataOne, setDataOne] = useState(null);
  const [popUpUpdateUser, setPopUpUpdateUser] = useState(false);
  const [popUpDeleteUser, setPopUpDeleteUser] = useState(false);

  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = async () => {
    setLoading(true);
    try {
      const response = await fetch(`${BASE_URL}/admins/users`, {
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

  const handleGetUserById = async (id) => {
    const { data } = await getUserById(id);

    if (data) {
      setDataOne(data);
      setPopUpUpdateUser(true);
    }
  };

  const hanldeGetSectionDeleteById = async (id) => {
    const { data } = await getUserById(id);

    if (!!data) {
      setDataOne(data)
      setPopUpDeleteUser(true)
    }
  }

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          {popUpUpdateUser && <PopUpUpdateUser setPopUpUpdateUser={setPopUpUpdateUser} dataOne={dataOne} />}
          {popUpDeleteUser && <PopUpDeleteUser setPopUpDeleteUser={setPopUpDeleteUser} getAllUser={getAllUser} dataOne={dataOne} />}
          <div className="w-full flex">
            <div className="mx-5">
              <h1 className="text-center font-bold text-4xl mt-4">List User</h1>
              <div className="mt-20">
                <h2 className="font-semibold">Total User: {data?.length}</h2>
                <List data={data} getAllUser={getAllUser} handleGetUserById={handleGetUserById} hanldeGetSectionDeleteById={hanldeGetSectionDeleteById} />
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
