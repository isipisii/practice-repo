import React from "react";
import { useContext } from "react";
import { GlobalContext } from "../Context";

const Component1 = () => {
  const { userName, onChange } = useContext(GlobalContext);

  return (
    <div>
      <h1>{userName}</h1>
      <input type="text" value={userName} onChange={onChange} />
    </div>
  );
};

export default Component1;
