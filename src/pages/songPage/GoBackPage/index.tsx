// import React from "react";
import { IoChevronBackSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export function GoBackPageBtn() {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); 
  };

  return (
    <button onClick={goBack}>
      <IoChevronBackSharp className="text-2xl text-tops ml-3 mt-3 hover:text-names" />
    </button>
  );
}
