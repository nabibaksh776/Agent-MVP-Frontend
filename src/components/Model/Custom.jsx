import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";


// this is model
const CustomModal = ({ open, setOpen, children, title }) => {
    const style = {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderRadius: "10px",
        maxWidth: "600px",
        minWidth: "auto",
        width: "100%",
        zIndex: "9999999999",  // Increased zIndex to ensure it overlays above the sidebar
    };

    return (
        <div>
            <Modal
                open={open}
                onClose={() => {
                    setOpen(false)
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div style={style} className="p-4 shadow-md bg-white text-black dark:bg-boxdark-2 dark:text-bodydark">
                    <h4 className="mb-4 text-center text-xl font-semibold text-black dark:text-white">
                        {title}
                    </h4>
                    {children}
                </div>
            </Modal>
        </div>
    );
};

export default CustomModal;


