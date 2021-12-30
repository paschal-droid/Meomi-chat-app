import React from 'react';
import * as FaIcons from "react-icons/fa";

export const AddChannel = ({ setCreateType, setIsCreating, setIsEditing, setToggleContainer, type }) => (
  <FaIcons.FaPlusCircle 
    onClick={() => {
      setCreateType(type);
      setIsCreating((prevState) => !prevState);
      setIsEditing(false);
      if(setToggleContainer) setToggleContainer((prevState) => !prevState) 
    }}
    style={{fontSize: "25px", color: "white", fontWeight: "500"}}
    />
  
);
