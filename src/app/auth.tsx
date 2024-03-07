'use client'

import { createContext, useState } from "react";

export type AuthContent = {
  login: (event: any) => void,
  logout: () => void,
  isLoggedIn: boolean,
  token: string | undefined,
  user: string | undefined,
  branch: string | undefined
}

export const AuthContext = createContext<AuthContent | null>(null);

export function AuthProvider({children}:{children: any}){
  const [token, setToken] = useState<string | undefined>();
  const [user, setUser] = useState<string | undefined>();
  const [branch, setBranch] = useState<string | undefined>();

  const login = (event: any) => {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget)
    const username = formData.get('userName')
    const password = formData.get('password')
  
    fetch(`https://employnettoolsdev.azurewebsites.net/api/Utilities/GeneralLogin?UserName=${username}&Password=${password}&AppName=infinity`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' }
    }).then(res =>{
      if (res.ok) {
        return res.json();
      } else {
        console.log("error logging in");
        logout();
        return [];
      }
    }).then(myData=>{
      console.log(myData);
      setToken(myData.Token);
      setUser(myData.FullName);
      setBranch(myData.BranchName);
    });
  }

  const logout = () => {
    setToken(undefined);
    setUser(undefined);
    setBranch(undefined);
  }

  return <AuthContext.Provider value={{
    login,
    logout,
    isLoggedIn: !!token,
    token,
    user,
    branch
  }}>{children}</AuthContext.Provider>
}