import { FaDownload } from "react-icons/fa";
import { downloadTemplate, insertExcel } from "../utils/api";
import { useState } from "react";

export const InsertExcel = () => {
  const [fileExcel, setFileExcel] = useState(null);

  const handleDownloadTemplate = async () => {
    await downloadTemplate();
  };

  const onChangeFile = (event) => {
    setFileExcel(event.target.files[0]);
  };

  const handleInsertExcel = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      await insertExcel(formData);
      alert("Success");
    } catch (error) {
      alert("Failed");
    }
  };

  return (
    <div>
      <h1 className="text-center font-bold text-4xl mt-4">Insert Data</h1>
      <div className="flex flex-col m-5">
        <div className="mt-10">
          <div className="flex justify-end">
            <button
              className="p-3 rounded-lg hover:bg-blue-600 bg-blue-500"
              onClick={() => handleDownloadTemplate()}
            >
              <span className="text-white flex items-center justify-center">
                <FaDownload className="mr-3 text-white" />
                Download Template
              </span>
            </button>
          </div>
          <form
            action=""
            className="flex flex-col border border-blue-800 p-5 rounded-lg mt-5"
            onSubmit={(event) => {
              event.preventDefault();
              handleInsertExcel(fileExcel);
            }}
          >
            <input
              type="file"
              className="border border-blue-800 mb-5 rounded-lg p-3"
              onChange={(event) => onChangeFile(event)}
            />

            <button
              className="p-5 bg-green-500 hover:bg-green-600 text-white rounded-lg"
              type="submit"
            >
              Insert
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
