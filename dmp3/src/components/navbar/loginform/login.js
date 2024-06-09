import React, { useState } from 'react';
import "./login.css";
import bg from './loginbackground/avicii.jpg';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [loginMessage, setLoginMessage] = useState('');
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            username: username,
            password: password
        };

        fetch('http://localhost/WebMusic/chucnang/login.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if(data.message === '1'){
                localStorage.setItem('username', data.username); // Lưu tên người dùng vào localStorage
                alert("Đăng nhập thành công!");
                navigate('/');
            }
            else if(data.message === '2'){
                setLoginMessage("Sai tài khoản hoặc mật khẩu");
            }
            else if(data.message === '0'){
                setLoginMessage("Tài khoản không tồn tại");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            alert("Lỗi");
        });
    };

    return (
        <div id="main">
            <div id="bgimage" style={{ backgroundImage: `url(${bg})` }}>
                <form id="login-form" onSubmit={handleSubmit}>
                    <h2 id='lb1'>Đăng nhập</h2>
                    <label htmlFor="username">Tài khoản:</label>
                    <input type="text" id="username" name="username" placeholder="Nhập tài khoản của bạn" value={username} onChange={handleUsernameChange}/>
                    <label htmlFor="password">Mật khẩu:</label>
                    <input type="password" id="password" name="password" placeholder="Nhập mật khẩu của bạn" value={password} onChange={handlePasswordChange}/>
                    <div>
                        <button type="submit">Đăng nhập</button>
                    </div>
                    <label id="trans_notice">
                        {loginMessage}
                    </label>
                    <h5>Dmp3</h5>
                    <h4>Thoả mãn đam mê âm nhạc của bạn!</h4>
                </form>
            </div>
        </div>
    );
}

export default LoginForm;
