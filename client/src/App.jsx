import React, { children } from 'react'
import { Button } from '@/components/ui/button'
import { BrowserRouter,Routes, Route, Navigate } from 'react-router-dom'
import Auth from './pages/Auth';
import Profile from './pages/Profile';
import Chat from './pages/Chat';
import { useAppStore } from './store';

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