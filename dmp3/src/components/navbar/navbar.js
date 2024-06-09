import React, { useState, useEffect } from 'react';
import './navbar.css'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const loginclick = () =>{
        navigate("/signin");
    }
    const signupclick = () =>{
        navigate("/signup");
    }
    const logoutclick = () => {
        localStorage.removeItem('username'); // Xóa tên người dùng khỏi localStorage khi đăng xuất
        setUsername(''); // Xóa tên người dùng khỏi state
        navigate("/signin"); // Chuyển hướng về trang đăng nhập
    };

    return(
        <div id="nav-bar">
            <input id="search" type="text" className="form-control" placeholder="Tìm kiếm"></input>
            {username ? (
                <>
                    <p id="show_username">Xin chào, {username}!</p>
                    <button id="logout" type="button" onClick={logoutclick} className="btn btn-outline-info">Đăng xuất</button>
                </>
            ) : (
                <>
                    <button id="login" type="button" onClick={loginclick} className="btn btn-outline-info">Đăng nhập</button>
                    <button id="register" type="button" onClick={signupclick} className="btn btn-outline-info">Đăng ký</button>
                </>
            )}
        </div>
    )
}
export default Navbar;