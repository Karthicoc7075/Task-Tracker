import React, { useState,Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import Dashboard from '../pages/dashboard/dashboard';
import Projects from '../pages/Projects/projects';
import Tasks from '../pages/Tasks/Tasks';
import Profile from '../pages/profile/profile';
import AuthPage from '../pages/auth/auth';
import Sidebar from '../components/Sliderbar/Slidebar';


import { useSelector } from 'react-redux';
import {  getUserSelectors } from '../selectors/selectors'
import Layout from '../layout/layout';


export default function Router() {
  
    const getUser = useSelector(getUserSelectors);

    const isAuthenticated = () => {
    if(getUser){
        return true
      }
      return false
    }
  
    const ProtectedRoute = ({ children,roles }) => {
      if(!isAuthenticated()){
        return <Navigate to="/login" />
      }
  
     
       return children 
    };
  
    const routes = useRoutes([
      {
        element: (
          <Layout>
            <Suspense fallback={<div><p>Loading...</p></div>}  >
              <Outlet />
            </Suspense>
           </Layout>
        ),
        children: [
          { element:<ProtectedRoute ><Dashboard /></ProtectedRoute>, index: true },
          { element:<ProtectedRoute ><Projects /></ProtectedRoute>, path: 'projects' },
          { element:<ProtectedRoute ><Tasks /></ProtectedRoute>, path: 'tasks/:id' },
          { element:<ProtectedRoute ><Profile /></ProtectedRoute>, path: 'profile' },
        
        ],
      },
      {
        path: 'login',
        element: isAuthenticated() ? <Navigate to="/" /> : <AuthPage />,
      },
  
      {
        path: '*',
        element: <Navigate to="/" replace />,
      },
    //    {
    //     path: '404',
    //     element: <Page404 />,
    //   },
    ]);
  
    return routes;
  
  }