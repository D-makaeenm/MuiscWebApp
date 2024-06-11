import React, { useEffect } from 'react';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { Outlet, Navigate } from 'react-router-dom';
import './mainpage.css';
import LeftBar from './leftbar/leftbar';
import Navbar from './navbar/navbar';
import BottomBar from './bottombar/bottombar';
import { SongProvider } from './songcontext/songcontext';

function MainPage() {
  useEffect(() => {
    // Thực hiện chuyển hướng từ / đến /homepage
    return () => <Navigate to="/homepage" replace />;
  }, []);

  return (
    <SongProvider>
      <HelmetProvider>
        <Helmet>
          <title>DMp3 - Trang nghe nhạc siêu lậu, siêu leak</title>
          <meta name="description" content="Mô tả cho trang này" />
        </Helmet>
        <div>
          <div className="container">
              <div className="row">
                <LeftBar></LeftBar>
                  <div className="col">
                      <Navbar></Navbar>
                      <div id="mainpage-container">
                        <Outlet />
                      </div>
                  </div>
              </div>
          </div>
          <BottomBar /> {/* Thêm bottombar vào đây */}
        </div>
      </HelmetProvider>
    </SongProvider>
  );
}

export default MainPage;
