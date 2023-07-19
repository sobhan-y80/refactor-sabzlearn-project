import React from "react";
import ReactDOM from "react-dom";
import ModalHOC from "../../../HOCs/ModalHOC";

function EditModal({ updateAction, cancelAction, userMainInfo, children }) {
  return ReactDOM.createPortal(
    <>
      <div id="modal-content">
        <div className="grid grid-cols-2 justify-items-center items-center gap-y-14">
          <div className="col-span-2 w-11/12 flex flex-col gap-14 pt-14">
            {children}
          </div>
          <button
            onClick={(e) => updateAction()}
            className="modal-btn col-span-1 truncate"
          >
            آپدیت شو
          </button>
          <button
            onClick={(e) => cancelAction()}
            className="modal-btn col-span-1 delete_btn-modal border "
          >
            منصرف شدم
          </button>
        </div>
      </div>
    </>,
    document.getElementById("modal-wrapper")
  );
}

export default ModalHOC(EditModal);
