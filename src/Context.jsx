import React from 'react'
import { useState, createContext } from "react";

const UserContext = createContext();

const Context = ({ children }) => { 
    const [userName, setUserName] = useState("")

    function onChange(e){
        setUserName(e.target.value)
    }


  return (
    <UserContext.Provider
        value={{userName, setUserName, onChange}}
    >
        {children}
    </UserContext.Provider>
  )
}

export { Context, UserContext }