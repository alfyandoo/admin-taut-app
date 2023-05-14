import { FaTrash } from "react-icons/fa";
import { BASE_URL } from "../../api/api";
import { showFormattedDate } from "../../utils";

export const List = ({ data, getAllAdmin }) => {
  const deleteUser = async (id) => {
    try {
      await fetch(`${BASE_URL}/admins/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token-admin")}`,
        },
      });
      getAllAdmin();
    } catch (error) {
      throw new Error(`Error: ${error}`);
    }
  };

  return (
    <div className="my-5 p-0 border border-blue-800 box-border overflow-hidden rounded-xl">
      <table className="box-border table-fixed overflow-auto w-full">
        <thead className="border-b border-psl-grey-30/30 bg-psl-blue-500 text-blue-800">
          <tr>
            <th className="py-3 px-5 h-11 w-[100px] text-center text-xs 2xl:text-sm font-bold">
              Username
            </th>
            <th className="py-3 px-5 h-11 w-[100px] text-center text-xs 2xl:text-sm font-bold">
              Created At
            </th>
            <th className="py-3 px-5 h-11 w-[100px] text-xs 2xl:text-sm font-bold">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index} className="border-t border-blue-800">
              <td className="p-5 align-top">
                <p className="text-xs 2xl:text-sm font-normal text-psl-black-100 text-center">
                  {item.username}
                </p>
              </td>
              <td className="p-5 align-top">
                <p className="text-xs 2xl:text-sm font-normal text-psl-black-100 text-center">
                  {showFormattedDate(item.created_at)}
                </p>
              </td>
              <td>
                <div className="flex justify-center">
                  <button
                    className="w-10 h-10 flex items-center justify-center rounded-md text-white bg-red-500 hover:bg-gray-500 hover:text-yellow-400"
                    onClick={() => deleteUser(Number(item.id))}
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
  );
};
