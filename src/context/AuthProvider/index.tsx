import { createContext, useEffect, useState} from "react";
import {IAuthProvider, IContext, IUser } from "./types";
import { LoginRequest, getUserLocalSorage, setUserLocalStorage } from "./util";


export const AuthContext = createContext<IContext>({} as IContext)

export const AuthProvider = ({ chidren}: IAuthProvider)=>{
    const [user, setUser] = useState<IUser | null>()

    useEffect(() =>{
        const user = getUserLocalSorage();

        if(user){
            setUser(user);
        }
    },[])


    async function authenticate(email:string, password:string) {
        const response = await LoginRequest(email, password)

        const payload = {token: response.token, email}

        setUser(payload);
        setUserLocalStorage(payload)

    }

    function logout () {
        setUser(null)
        setUserLocalStorage(null)
    }

    return(
        <AuthContext.Provider value={{...user,authenticate, logout}}>
            {chidren}
        </AuthContext.Provider>
    )
}