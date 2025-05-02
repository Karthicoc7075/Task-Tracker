import React,{useState,useEffect} from 'react'
import './dashboard.css'
import { useSelector } from 'react-redux';
import {  getDashboardData, getDashboardLoading, getDashboardError } from '../../selectors/selectors';
import { getDashboardDatas } from '../../actions/dashboard';
import { useDispatch } from 'react-redux';
import Loader from '../../components/loader/loader';


function Dashboard() {
  const dashboardDataCount  = useSelector(getDashboardData);
  const loading = useSelector(getDashboardLoading);
  const dispatch = useDispatch();
  const dashboardData = [
    { title: 'Total Projects', count: dashboardDataCount?.projectsCount || 0 },
    { title: 'Total Tasks', count: dashboardDataCount?.tasksCount || 0 },
    { title: 'Total Pending', count: dashboardDataCount?.pendingTasksCount || 0 },
    { title: 'Total Completed', count: dashboardDataCount?.completedTasksCount || 0 },
    { title: 'Total Progress', count: dashboardDataCount?.ProgressTasksCount || 0 },
  ];
  

  useEffect(() => {
    if(dashboardDataCount == null){
     dispatch(getDashboardDatas())
    }
   }, [dashboardDataCount]);


  

  return (
    <div className='dashboard'> 
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard!</p>
        <div className='dashboard-content'>
          {!loading ?

            <div className='dashboard-cards-wrapper'>  
                {dashboardData.map((data, index) => (
                    <div className='dashboard-card' key={index}>
                        <h2>{data.title}</h2>
                        <p>{data.count}</p>
                    </div>
                ))}
           
            </div>:
            <div className='dashboard-loader'>
              <Loader />
            </div>
            }
            </div>

    </div>
  )
}

export default Dashboard