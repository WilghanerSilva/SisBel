import React, { ReactNode, createContext, useEffect, useState} from "react";
import api from "../services/api";
import { UserContextType } from "../types/UserContextType";

interface AuthContextData {
  signed: boolean
  setSigned: React.Dispatch<React.SetStateAction<boolean>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  profile: string
  setProfile: React.Dispatch<React.SetStateAction<string>>
  user: UserContextType | undefined,
  setUser: React.Dispatch<React.SetStateAction<UserContextType | undefined>>
}



const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{children : ReactNode}> = ({children}: {children : ReactNode}) => {
  const [token, setToken] = useState("");
  const [signed, setSigned] = useState(false);
  const [profile, setProfile] = useState("");
  const [user, setUser] = useState<UserContextType | undefined>()

  useEffect(() => {
    const storagedToken = localStorage.getItem('@Sisbel:token');

    if(storagedToken){
      setToken(storagedToken);
      setSigned(true);
    }
  }, []);
  
  return (
    <AuthContext.Provider value={
      {
        signed,
        token,
        profile,
        user,
        setToken,
        setSigned,
        setProfile,
        setUser    
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;