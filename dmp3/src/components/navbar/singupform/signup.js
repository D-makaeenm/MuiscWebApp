import React, { useState } from 'react';
import bg from '../loginform/loginbackground/avicii.jpg';
import './signup.css';
import { useNavigate } from 'react-router-dom';

const Signupform = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    const [userExists, setUserExists] = useState(false);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const userData = {
            username: username,
            password: password,
            email: email
        };
        // console.log('UserData:', userData); // Log dữ liệu gửi đi để kiểm tra

        fetch('http://localhost/WebMusic/chucnang/register.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json())
        .then(data => {
            if(data.message === 'User already exists.'){
                setUserExists(true);
                setTimeout(() => {
                    setUserExists(false);
                }, 5000); // Ẩn thông báo sau 5 giây
                return;
            }
            else if(data.message === 'User inserted successfully.'){
                alert("Đăng ký thành công!");
                navigate('/signin');
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
                    <h2 id='lb_register'>Đăng ký</h2>
                    <label id="notice_users" style={{ display: userExists ? 'block' : 'none' }}>Tài khoản đã tồn tại vui lòng chọn cái khác!</label>
                    <label htmlFor="username">Tài khoản:</label>
                    <input 
                        type="text" 
                        id="username" 
                        name="username" 
                        placeholder="Viết liền không dấu, không ký tự đặc biệt" 
                        value={username}
                        onChange={handleUsernameChange} // Thêm sự kiện onChange
                    />
                    <label htmlFor="password">Mật khẩu:</label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder="Nhập mật khẩu của bạn" 
                        value={password}
                        onChange={handlePasswordChange} // Thêm sự kiện onChange
                    />
                    <label htmlFor="email">Email:</label>
                    <input 
                        type="text" 
                        id="email" 
                        name="email" 
                        placeholder="Nhập email của bạn" 
                        value={email}
                        onChange={handleEmailChange} // Thêm sự kiện onChange
                    />
                    <div>
                        <button type="submit">Đăng ký</button>
                    </div>
                    <h5>Dmp3</h5>
                    <h4>Thoả mãn đam mê âm nhạc của bạn!</h4>
                </form>
            </div>
        </div>
    );
}

export default Signupform;
