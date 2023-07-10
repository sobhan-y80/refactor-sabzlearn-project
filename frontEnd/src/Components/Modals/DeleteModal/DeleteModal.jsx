import React from "react";
import ReactDOM from "react-dom";
import ModalHOC from "../../../HOCs/ModalHOC";

function DeleteModal({ deleteAction, cancelAction, userMainInfo }) {
  return ReactDOM.createPortal(
    <>
      <div id="modal-content">
        <div className="grid grid-cols-2 justify-items-center items-center">
          <p className="col-span-2">
            از پاک کردن کاربر {userMainInfo.name} مطمعن هستید !!?
          </p>
          <button
            onClick={(e) => deleteAction()}
            className="modal-btn col-span-1 delete_btn-modal"
          >
            اره پاکش کن
          </button>
          <button
            onClick={(e) => cancelAction()}
            className="modal-btn col-span-1 border "
          >
            نه
          </button>
        </div>
      </div>
    </>,
    document.getElementById("modal-wrapper")
  );
}

export default ModalHOC(DeleteModal);
