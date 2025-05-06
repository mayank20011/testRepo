import React from "react";

const Modal = ({ closeModal, onDelete, blogId }) => {
  return (
    <div className="text-white bg-black flex flex-col gap-6 p-6 rounded-2xl relative">
      <h1>Do U Really Want To Delete Blog with id : {blogId} </h1>
      <div className="flex gap-4">
        <button
          className="hover:scale-90 transition cursor-pointer text-red-600 border px-2 py-1 rounded-sm"
          onClick={() => {
            onDelete();
            closeModal();
          }}
        >
          Yes
        </button>
        <button
          className="hover:scale-90 transition cursor-pointer text-green-600 border px-2 py-1 rounded-sm"
          onClick={() => {
            closeModal();
          }}
        >
          No
        </button>
      </div>
    </div>
  );
};

export default Modal;
