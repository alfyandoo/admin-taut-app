import { deleteAdmin } from "../../utils/api";

export const PopUpDeleteAdmin = ({
  setPopUpDeleteAdmin,
  getAllAdmin,
  dataOne,
}) => {
  const { id } = dataOne;

  const handleDeleteAdmin = async (id) => {
    const { error } = await deleteAdmin(id);

    if (!error) {
      await getAllAdmin(); // untuk update data terbaru tanpa refresh
      setPopUpDeleteAdmin(false);
    }
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-screen z-[60] bg-black/50"
      onClick={() => setPopUpDeleteAdmin(false)}
    >
      <div
        className="bg-white rounded-md w-[600px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col"
        onClick={(event) => {
          event.stopPropagation();
        }}
      >
        <div className="flex border-b border-black/90 justify-between items-center py-2 px-5">
          <h1>Delete User - {dataOne?.username}</h1>
          <button
            onClick={() => {
              setPopUpDeleteAdmin(false);
            }}
          >
            <span>
              <svg
                width="25"
                height="25"
                viewBox="0 0 35 35"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-black hover:text-gray-300"
              >
                <path
                  d="M9.33332 27.7084L7.29166 25.6667L15.4583 17.5001L7.29166 9.33341L9.33332 7.29175L17.5 15.4584L25.6667 7.29175L27.7083 9.33341L19.5417 17.5001L27.7083 25.6667L25.6667 27.7084L17.5 19.5417L9.33332 27.7084Z"
                  fill="black"
                />
              </svg>
            </span>
          </button>
        </div>

        <div className="m-5">
          <h1>Are you sure to delete? </h1>
          <div className="flex space-x-5 justify-end">
            <button
              className="p-3 rounded-lg text-white bg-rose-500"
              onClick={() => setPopUpDeleteAdmin(false)}
            >
              No
            </button>
            <button
              className="p-3 rounded-lg text-white bg-green-500"
              onClick={() => handleDeleteAdmin(id)}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
