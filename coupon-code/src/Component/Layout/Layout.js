// src/Component/Layout/Layout.js
import React from 'react';
import Navbar from '../Navbar/Navbar';
import './Layout.css'; 
const Layout = ({ children, userData }) => {
  return (
    <div className="layout-container">
      <Navbar userData={userData} />
      <main className="content-area">
        {children}
      </main>
    </div>
  );
};

export default Layout;
