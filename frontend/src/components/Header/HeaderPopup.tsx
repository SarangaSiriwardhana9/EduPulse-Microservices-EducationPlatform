import React, { useState } from "react";
import { RiCloseLine } from "react-icons/ri";

function HeaderPopup() {
  const [hidePopup, setHidePopup] = useState(false);

  return (
    <div className={`headerPopup bg-[#c5ddff] text-blue-900 ${hidePopup ? "hidden" : "block"} flex justify-center items-center h-14 px-4 sm:px-6 lg:px-8`}>
      <div className="dialogueBox">
        <span className="title font-bold text-lg">Start Solving your challenge now </span>
        <span className="offer">| Enroll today and learn risk-free with our 30-day money-back guarantee.</span>
      </div>
      <div
        className="cross absolute right-4 h-10 w-10 flex justify-center items-center"
        onClick={() => {
          setHidePopup(true);
        }}
      >
        <RiCloseLine className="popupClearIcon" />
      </div>
    </div>
  );
}

export default HeaderPopup;
