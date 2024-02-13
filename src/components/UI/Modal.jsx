import { createPortal } from "react-dom";
import { useEffect, useRef } from "react";

const Modal = ({ children, open, className = "" }) => {
    const dialog = useRef();
    useEffect(() => {
        if (open) {
            dialog.current.showModal();
        }
    }, [open]);
    return createPortal(
        <dialog className={`modal ${className}`} ref={dialog} open={open}>
            {children}
        </dialog>,
        document.getElementById("modal"),
    );
};

export default Modal;
