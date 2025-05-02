import React, {  useEffect } from 'react'
import './Sidebar.css'
import DashboardIcon from '../../assets/icons/dashboard.svg'
import ProjectIcon from '../../assets/icons/project.svg'
import ProfileIcon from '../../assets/icons/Profile.svg'
import Icon from '../../assets/icons/icon.svg'
import {Link} from 'react-router-dom'
import SvgColor from '../svgColor/svgColor'
import { useSelector,useDispatch } from 'react-redux'
import { getToken } from '../../selectors/selectors'
import { jwtDecode } from "jwt-decode";
import { logout } from '../../actions/auth'


function Sidebar() {
  const token = useSelector(getToken)
  const dispatch = useDispatch()

  useEffect(() => {
    if (token) {
      const decodedToken = jwtDecode(token);
      const expirationTime = decodedToken.exp * 1000; 
      const currentTime = Date.now();

      if (expirationTime < currentTime) {
        dispatch(logout());
       
      }
    }
  }
  , [token]);

  return (
   <div>
     <div className='sidebar'>
      <div className='sidebar-wrapper'>
        <div className='sidebar-logo'>
              <SvgColor   src={Icon} style={{ color: "#637281", width: '34px', height: '34px' }} />
              <span>TT</span>
        </div>
        <div className='sidebar-link-container'>
          <div className='sidebar-link-list'>
            <Link className='sidebar-link' to='/'>
              <SvgColor className="icon" src={DashboardIcon} style={{ color: "#637281" }} />
              <span>Dashboard</span>
            </Link>
            <Link className='sidebar-link' to='/projects'>
              <SvgColor className="icon" src={ProjectIcon} style={{ color: "#637281" }} />
              <span>Projects</span>
            </Link>
            <Link className='sidebar-link' to='/profile'>
              <SvgColor className="icon" src={ProfileIcon} style={{ color: "#637281" }} />
              <span>Profile</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
    </div>

  )
}

export default Sidebar