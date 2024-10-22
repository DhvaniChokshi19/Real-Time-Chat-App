import React, { children } from 'react'
import { Button } from '@/components/ui/button'
import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import { useAppStore } from './store';
import apiClient from './lib/api-client';
import { useEffect, useState } from 'react';
import { GET_USER_INFO } from './utils/constants';


const PrivateRoute=({children})=>{
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? children:<Navigate to ="/Auth" />;
}

const AuthRoute=({children})=>{
  const {userInfo} = useAppStore();
  const isAuthenticated = !!userInfo;
  return isAuthenticated ? <Navigate to ="/Chat"/>:children;
}
const App = () => {
  const {userInfo,setUserInfo}=useAppStore();
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getUserData = async ()=>{
      try{
        const response  = await apiClient.get(GET_USER_INFO,{
          withCredentials:true,
        });
        if(response.status===200 && response.data.id){
          setUserInfo(response.data);
          }else{
          setUserInfo(undefined);
          }
          console.log({response})
        }catch(error){
          setUserInfo(undefined);
          }finally{
            setLoading(false);
          }
  };
  if (!userInfo){
    getUserData()
  }else{
    setLoading(false);
  }
  }, [userInfo,setUserInfo]);

  if(loading){
    return <div>Loading....</div>
  }
  
  return (
   <BrowserRouter>
   <Routes>
    <Route path="/Auth" element={<AuthRoute>
      <Auth />
    </AuthRoute>} />
    <Route path="/Chat" element={<PrivateRoute>
      <Chat />
    </PrivateRoute>} />
    <Route path="/Profile" element={<PrivateRoute>
      <Profile />
    </PrivateRoute>} />

    <Route path="*" element={<Navigate to="/Auth"/>} />
    </Routes>
    </BrowserRouter>
  )
}

export default App