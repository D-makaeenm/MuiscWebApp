import React, { useState } from 'react';
import './changepass.css';

const ChangePass = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');

    const handleOldPasswordChange = (e) => {
        setOldPassword(e.target.value);
    };

    const handleNewPasswordChange = (e) => {
        setNewPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            setMessage("Mật khẩu mới và nhập lại mật khẩu mới không khớp.");
            return;
        }

        const userId = localStorage.getItem('userId');
        if (!userId) {
            setMessage("Bạn cần đăng nhập để thay đổi mật khẩu.");
            return;
        }

        const passwordData = {
            userId: userId,
            oldPassword: oldPassword,
            newPassword: newPassword
        };

        fetch('http://localhost/WebMusic/chucnang/changepass.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passwordData)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                setMessage("Thay đổi mật khẩu thành công!");
            } else {
                setMessage(data.message || "Có lỗi xảy ra. Vui lòng thử lại.");
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setMessage("Có lỗi xảy ra. Vui lòng thử lại.");
        });
    };

    return (
        <div id="changepass">
            <form id="form_change_pass" onSubmit={handleSubmit}>
                <h1>Thay đổi mật khẩu</h1>
                <div className="form_group_changepass">
                    <label htmlFor="oldPassword">Mật khẩu cũ:</label>
                    <input 
                        type="password" 
                        id="oldPassword" 
                        value={oldPassword} 
                        onChange={handleOldPasswordChange} 
                        required 
                    />
                </div>
                <div className="form_group_changepass">
                    <label htmlFor="newPassword">Mật khẩu mới:</label>
                    <input 
                        type="password" 
                        id="newPassword" 
                        value={newPassword} 
                        onChange={handleNewPasswordChange} 
                        required 
                    />
                </div>
                <div className="form_group_changepass">
                    <label htmlFor="confirmPassword">Nhập lại mật khẩu mới:</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        value={confirmPassword} 
                        onChange={handleConfirmPasswordChange} 
                        required 
                    />
                </div>
                <button type="submit">Xác nhận</button>
                {message && <p>{message}</p>}
            </form>
        </div>
    );
}

export default ChangePass;
