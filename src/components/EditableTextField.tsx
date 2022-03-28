import React, { useRef, useState } from "react";
import { FiEdit } from "react-icons/fi";
import { MdSave } from "react-icons/md";

function EditableTextField() {
  const [readOnly, setReadOnly] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleReadOnly = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
    setReadOnly(!readOnly);
  };

  return (
    <div className="border-5 mt-5 flex w-fit">
      <input
        ref={inputRef}
        type="text"
        placeholder="First Name"
        className={`input rounded-r-none  ring-0  focus:ring-0`}
        readOnly={readOnly}
        style={{ outline: "none" }}
      />
      <button
        className={`outline-none focus:outline-none ${readOnly ? "bg-base-300" : "bg-primary"} 
        rounded-r-lg p-2 px-4`}
        onClick={() => toggleReadOnly()}
      >
        {readOnly && <FiEdit className="h-full w-full text-xl" />}
        {!readOnly && <MdSave className="h-full w-full text-xl" />}
      </button>
    </div>
  );
}

export default EditableTextField;
