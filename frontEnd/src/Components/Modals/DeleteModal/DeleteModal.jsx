import React, { useEffect } from "react";
import ReactDOM from "react-dom";
import ModalHOC from "../../../HOCs/ModalHOC";

function DeleteModal({ role, deleteAction, cancelAction, MainInfo }) {
  let mainMessage = {};
  switch (role) {
    case "Delete": {
      mainMessage = {
        body: `از پاک کردن کاربر ${MainInfo.name} مطمعن هستید !!?`,
        messageBtn: `آره پاکش کن`,
      };
      break;
    }
    case "DELETE_MENU": {
      mainMessage = {
        body: `از پاک کردن منو ${MainInfo.title} مطمعن هستید !!?`,
        messageBtn: `آره پاکش کن`,
      };
      break;
    }
    case "DELETE_MESSAGE": {
      mainMessage = {
        body: `از پاک کردن پیام ${MainInfo.name} مطمعن هستید !!?`,
        messageBtn: `آره پاکش کن`,
      };
      break;
    }
    case "DELETE_ARTICLE": {
      mainMessage = {
        body: `از پاک کردن مقاله ${MainInfo.title} مطمعن هستید !!?`,
        messageBtn: `آره پاکش کن`,
      };
      break;
    }
    case "DELETE_SESSION": {
      mainMessage = {
        body: `از پاک کردن سرفصل ${MainInfo.title} مطمعن هستید !!?`,
        messageBtn: `آره پاکش کن`,
      };
      break;
    }
    case "DELETE_COMMENT": {
      mainMessage = {
        body: `از پاک کردن پیام ${MainInfo.creator.name} مطمعن هستید !!?`,
        messageBtn: `آره پاکش کن`,
      };
      break;
    }
    case "Ban": {
      mainMessage = {
        body: `از مسدود کردن ${MainInfo.name} مطمعن هستید !!؟`,
        messageBtn: `آره مسدودش کن`,
      };
      break;
    }
    case "Ban_COMMENT": {
      mainMessage = {
        body: `از مسدود کردن ${MainInfo.creator.name} مطمعن هستید !!؟`,
        messageBtn: `آره مسدودش کن`,
      };
      break;
    }
    case "ACCEPT_COMMENT": {
      mainMessage = {
        body: `از تایید پیام کردن ${MainInfo.creator.name} مطمعن هستید !!؟`,
        messageBtn: `آره تاییدش کن`,
      };
      break;
    }
    case "REJECT_COMMENT": {
      mainMessage = {
        body: `از قبول نکردن پیام ${MainInfo.creator.name} مطمعن هستید !!؟`,
        messageBtn: `آره مطمعنم`,
      };
      break;
    }
    case "DELETE_DISCOUNT": {
      mainMessage = {
        body: `از پاک کردن کد تخفیف ${MainInfo.code} مطمعن هستید !!؟`,
        messageBtn: `آره مطمعنم`,
      };
      break;
    }

    default:
      {
        mainMessage = {
          body: `از پاک کردن کاربر ${MainInfo.name} مطمعن هستید !!?`,
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
            className="modal-btn col-span-1 border"
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
