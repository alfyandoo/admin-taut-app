import { FaEdit, FaQrcode, FaTrash } from "react-icons/fa";
import { showFormattedDate } from "../../utils";
import React, { useState } from "react";
import { getQrCode } from "../../utils/api";
import { PopUpQrCode } from "../templates/PopUpQrCode";

export const List = ({
  data,
  handleGetUserById,
  hanldeGetSectionDeleteById,
}) => {
  const [showPopUpQrCode, setShowPopUpQrCode] = useState(false);
  const [username, setUsername] = useState(null);
  const [qrCode, setQrCode] = useState(null);

  const handleGetQrCodeByUsername = async (username) => {
    setUsername(username);
    const { data, error } = await getQrCode(username);

    if (!error) {
      const imageUrl = URL.createObjectURL(data);
      setQrCode(imageUrl);
      setShowPopUpQrCode(true);
    }
  };

  return (
    <>
      {showPopUpQrCode && (
        <PopUpQrCode
          setShowPopUpQrCode={setShowPopUpQrCode}
          qrcode={qrCode}
          username={username}
        />
      )}
      <div className="my-5 p-0 border border-blue-800 box-border overflow-hidden rounded-xl">
        <table className="box-border table-fixed overflow-auto w-full">
          <thead className="border-b border-psl-grey-30/30 bg-psl-blue-500 text-blue-800">
            <tr>
              <th className="py-3 px-5 h-11 w-[100px] text-center text-xs 2xl:text-sm font-bold">
                Name
              </th>
              <th className="py-3 px-5 h-11 w-[150px] text-center text-xs 2xl:text-sm font-bold">
                Email
              </th>
              <th className="py-3 px-5 h-11 w-[100px] text-center text-xs 2xl:text-sm font-bold">
                Username
              </th>
              <th className="py-3 px-5 h-11 w-[100px] text-center text-xs 2xl:text-sm font-bold">
                Phone
              </th>
              <th className="py-3 px-5 h-11 w-[100px] text-center text-xs 2xl:text-sm font-bold">
                Created At
              </th>
              <th className="py-3 px-5 h-11 w-[100px] text-xs 2xl:text-sm font-bold">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index} className="border-t border-blue-800">
                <td className="py-5 px-5 align-top">
                  <p className="text-xs 2xl:text-sm font-normal text-psl-black-100 text-center">
                    {item.name}
                  </p>
                </td>
                <td className="p-5 align-top">
                  <p className="text-xs 2xl:text-sm font-normal text-psl-black-100 text-center">
                    {item.email}
                  </p>
                </td>
                <td className="p-5 align-top">
                  <p className="text-xs 2xl:text-sm font-normal text-psl-black-100 text-center">
                    {item.username}
                  </p>
                </td>
                <td className="p-5 align-top">
                  <p className="text-xs 2xl:text-sm font-normal text-psl-black-100 text-center">
                    {item.phone_number}
                  </p>
                </td>
                <td className="p-5 align-top">
                  <p className="text-xs 2xl:text-sm font-normal text-psl-black-100 text-center">
                    {showFormattedDate(item.created_at)}
                  </p>
                </td>
                <td className="flex justify-center items-center h-16 space-x-3 w-full">
                  <div className="flex justify-center">
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-md text-white bg-green-500 hover:bg-gray-500 hover:text-yellow-400"
                      onClick={() => {
                        handleGetQrCodeByUsername(item.username);
                        setShowPopUpQrCode(true);
                      }}
                    >
                      <FaQrcode />
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-md text-white bg-blue-500 hover:bg-gray-500 hover:text-yellow-400"
                      onClick={() => handleGetUserById(Number(item.id))}
                    >
                      <FaEdit />
                    </button>
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="w-10 h-10 flex items-center justify-center rounded-md text-white bg-red-500 hover:bg-gray-500 hover:text-yellow-400"
                      onClick={() =>
                        hanldeGetSectionDeleteById(Number(item.id))
                      }
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};
