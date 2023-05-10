export const PopUpQrCode = ({ setShowPopUpQrCode, qrcode, username }) => {
    return (
      <div
        className="fixed top-0 left-0 w-full h-screen z-[60] bg-black/50"
        onClick={() => setShowPopUpQrCode(false)}
      >
        <div
          className="bg-white rounded-md w-[300px] absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col"
          onClick={(event) => {
            event.stopPropagation();
          }}
        >
          <div className="flex border-b border-black/90 justify-between items-center py-2 px-5">
            <h1>QR Code - {username}</h1>
            <button
              onClick={() => {
                setShowPopUpQrCode(false);
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
  
          <div className="w-full">
            <img src={qrcode} alt="qrcode" className="w-80 h-80 mx-auto" />
          </div>
        </div>
      </div>
    );
  };
  