import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

const Modal = ({ children, open, onClose, className = "" }) => {
    const dialog = useRef();
    // useEffect(() => {
    //   const modal = dialog.current;
    //   if (open) {
    //     modal.showModal();
    //   }
    //   return () => {
    //     modal.close();
    //   };
    // }, [open]);
    return createPortal(
        <dialog
            className={`modal ${className}`}
            ref={dialog}
            open={open}
            onClose={onClose}
        >
            {children}
        </dialog>,
        document.getElementById("modal"),
    );
};

export default Modal;
