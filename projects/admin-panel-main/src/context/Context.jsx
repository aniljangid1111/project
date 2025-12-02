import React, { createContext, useState } from 'react'

export const Nav_Context = createContext();   

function Context({children}) {
    const [Nav_State, setNav_State] = useState(false);
  return (
    <>
    <Nav_Context.Provider value={{Nav_State,setNav_State}}>
        {children}
    </Nav_Context.Provider>
    </>
  )
}

export default Context