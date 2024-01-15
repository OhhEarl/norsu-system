import React, {Children, createContext} from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
    return(
        <AuthContext.Prov></AuthContext.Prov>
    )
}

export default AuthContext