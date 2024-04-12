'use client'
import { redirect } from 'next/navigation'
import { createContext, useState } from "react";
import { PostLogin } from "./api";

export type AuthContent = {
  login: (event: any) => void,
  logout: () => void,
  isLoggedIn: boolean,
  token: string | undefined,
  userName: string | undefined,
  firstName: string | undefined,
  lastName: string | undefined,
  expirationDate: Date | undefined,
  userType: string | undefined,
  authLevel: Number | undefined,
  branch: string | undefined,
  branchId: Number | undefined,
  userId: Number | undefined
}

export const AuthContext = createContext<AuthContent | null>(null);

export function AuthProvider({children}:{children: any}){
  const [token, setToken] = useState<string | undefined>();
  const [userName, setUserName] = useState<string | undefined>();
  const [userId, setUserId] = useState<Number | undefined> ();
  const [firstName, setFirstName] = useState<string | undefined>();
  const [lastName, setLastName] = useState<string | undefined>();
  const [expirationDate, setExpirationDate] = useState<Date | undefined>();
  const [userType, setUserType] = useState<string | undefined>();
  const [authLevel, setAuthLevel] = useState<Number | undefined>();
  const [branch, setBranch] = useState<string | undefined>();
  const [branchId, setBranchId] = useState<Number | undefined>();

  const login = (event: any) => {
    event.preventDefault();
  
    const formData = new FormData(event.currentTarget)
    const username = formData.get('userName')?.toString();
    const password = formData.get('password')?.toString()
  
    PostLogin(username!, password!).then(myData=>{
      if(myData){
        console.log(myData);
        setUserId(myData.userId)  
        setToken(myData.token);
        setUserName(myData.userName);
        setFirstName(myData.firstName);
        setLastName(myData.lastName);
        setExpirationDate(myData.expirationDate);
        setUserType(myData.userType);
        setAuthLevel(myData.authLevel);
        setBranch(myData.branchName);
        setBranchId(myData.branchId);
      } else { logout(); }
    });
  }

  const logout = () => {
    setUserId(undefined);
    setToken(undefined);
    setUserName(undefined);
    setFirstName(undefined);
    setLastName(undefined);
    setExpirationDate(undefined);
    setUserType(undefined);
    setAuthLevel(undefined);
    setBranch(undefined);
    setBranchId(undefined);

    redirect('/');
  }

  return <AuthContext.Provider value={{
    login,
    logout,
    isLoggedIn: !!token,
    token,
    userId,
    userName,
    firstName,
    lastName,
    expirationDate,
    userType,
    authLevel,
    branch,
    branchId
  }}>{children}</AuthContext.Provider>
}