import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalHOC from "../../../HOCs/ModalHOC";

function DeleteModal({ role, deleteAction, cancelAction, userMainInfo }) {
  console.log(userMainInfo);
  let mainMessage = {};
  switch (role) {
    case "Delete": {
      mainMessage = {
        body: `از پاک کردن کاربر ${userMainInfo.name} مطمعن هستید !!?`,
        messageBtn: `آره پاکش کن`,
      };
      break;
    }
    case "Ban": {
      mainMessage = {
        body: `از مسدود کردن ${userMainInfo.name} مطمعن هستید !!؟`,
        messageBtn: `آره مسدودش کن`,
      };
      break;
    }

    default:
      {
        mainMessage = {
          body: `از پاک کردن کاربر ${userMainInfo.name} مطمعن هستید !!?`,
          messageBtn: `آره پاکش کن`,
        };
      }
      break;
  }
  return ReactDOM.createPortal(
    <>
      <div id="modal-content">
        <div className="grid grid-cols-2 justify-items-center items-center gap-y-5">
          <p className="col-span-2">{mainMessage.body}</p>
          <button
            onClick={(e) => deleteAction()}
            className="modal-btn col-span-1 delete_btn-modal truncate"
          >
            {mainMessage.messageBtn}
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
