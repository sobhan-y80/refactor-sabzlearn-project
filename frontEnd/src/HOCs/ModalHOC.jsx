import React, { useEffect } from "react";

function ModalHOC(OrginalComponent) {
  const NewComponent = (props) => {
    useEffect(() => {
      const onClick = (e) => {
        const elm = e.target;
        if (elm.id === "modal-content") {
          props.cancelAction();
        }
        return;
      };

      window.addEventListener("click", () => onClick(event));
      return () => window.removeEventListener("click", onClick);
    });

    return <OrginalComponent {...props}></OrginalComponent>;
  };

  return NewComponent;
}

export default ModalHOC;
