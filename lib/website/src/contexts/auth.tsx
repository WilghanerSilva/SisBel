import React, { ReactNode, createContext, useState} from "react";

interface AuthContextData {
  signed: boolean
  setSigned: React.Dispatch<React.SetStateAction<boolean>>
  token: string
  setToken: React.Dispatch<React.SetStateAction<string>>
  profile: string
  setProfile: React.Dispatch<React.SetStateAction<string>>
}



const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{children : ReactNode}> = ({children}: {children : ReactNode}) => {
  const [token, setToken] = useState("");
  const [signed, setSigned] = useState(false);
  const [profile, setProfile] = useState("");
  
  return (
    <AuthContext.Provider value={
      {
        signed,
        token,
        profile,
        setToken,
        setSigned,
        setProfile    
      }
    }>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;