import React, { useState, useEffect } from 'react';
import './navbar.css';
import { useNavigate } from 'react-router-dom';
import SearchBar from './search/searchsong';

const Navbar = () => {
    const [username, setUsername] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const loginclick = () => {
        navigate("/signin");
    };
    const signupclick = () => {
        navigate("/signup");
    };
    const logoutclick = () => {
        localStorage.removeItem('username');
        localStorage.removeItem('userId'); // Xóa userId khỏi localStorage
        setUsername('');
        navigate("/signin");
        window.dispatchEvent(new Event('storage')); // Dispatch storage event manually to update leftbar
    };
    const nameClick = () => {
        navigate("/home/changePassword");
    }
    return (
        <div id="nav-bar">
            <SearchBar />
            {username ? (
                <>
                    <p id="show_username" onClick={nameClick}>Xin chào, {username}!</p>
                    <button id="logout" type="button" onClick={logoutclick} className="btn btn-outline-info">Đăng xuất</button>
                </>
            ) : (
                <>
                    <button id="login" type="button" onClick={loginclick} className="btn btn-outline-info">Đăng nhập</button>
                    <button id="register" type="button" onClick={signupclick} className="btn btn-outline-info">Đăng ký</button>
                </>
            )}
        </div>
    );
};

export default Navbar;
