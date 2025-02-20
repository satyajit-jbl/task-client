// Sidebar.jsx
import { div } from 'framer-motion/client';
import React from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
// import Navbar from '../Pages/Shared/Navbar/Navbar';
import { FaDochub, FaDonate, FaUser } from 'react-icons/fa';
import { MdOutlinePets } from 'react-icons/md';
import { RiHeartAdd2Line, RiMoneyCnyBoxFill, RiPentagonFill } from 'react-icons/ri';
import { SiPetsathome } from 'react-icons/si';
import { BiPhone, BiSolidDonateBlood, BiSolidDonateHeart } from 'react-icons/bi';
import { TbCamper } from 'react-icons/tb';

// import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
 
 

  //TODO: get isAdmin value form gthe datase
//   const [isAdmin] = useAdmin();
  return (

    <div className='flex'>
      {/* dashboard sidebar */}
      <div className='w-64 min-h-screen bg-orange-400'>

        <ul className='menu p-4'>
        <li>
                <NavLink to='/dashboard/users'>
                  <FaUser />
                  Users</NavLink>
              </li>
              <li>
                <NavLink to='/dashboard/userProfile'>
                  <FaUser />
                  User Profile</NavLink>
              </li>
          
          {/* shared Navlinks */}
          <div className='divider'></div>
          <li>
            <NavLink to='/dashboard/contacts'>
              <BiPhone />
              Contacts</NavLink>
          </li>
        </ul>
      </div>
      <div className='flex-1'>
        <Outlet></Outlet>
      </div>

    </div>

  );
};

export default Dashboard;
