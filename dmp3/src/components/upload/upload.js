import React, { useState } from 'react';
import './upload.css';

const Upload = () => {
    const [songName, setSongName] = useState('');
    const [songImage, setSongImage] = useState(null);
    const [songFile, setSongFile] = useState(null);
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const storedUserId = localStorage.getItem('userId');

    const handleSongImageChange = (event) => {
        const file = event.target.files[0];
        setSongImage(file);
        // Tạo URL cho xem trước ảnh
        const imageURL = URL.createObjectURL(file);
        setImagePreview(imageURL);
    };

    const handleSongFileChange = (event) => {
        const file = event.target.files[0];
        setSongFile(file);
        // Tách phần mở rộng của tệp nhạc
        const fileName = file.name.split('.').slice(0, -1).join('.');
        setSongName(fileName);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        // Kiểm tra xem tên bài hát đã được nhập hay chưa
        if (songName.trim() === '') {
            setMessage('Vui lòng nhập tên bài hát');
            return;
        }

        // Kiểm tra xem tệp hình ảnh và tệp bài hát đã được chọn hay chưa
        if (!songImage || !songFile) {
            setMessage('Vui lòng chọn ảnh và bài hát');
            return;
        }

        const formData = new FormData();
        formData.append('songName', songName);
        formData.append('songImage', songImage);
        formData.append('songFile', songFile);
        formData.append('userId', storedUserId);

        fetch('http://localhost/WebMusic/chucnang/upload.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === '1') {
                setMessage('Bài hát đã được đăng thành công!');
            } else {
                setMessage(`Có lỗi xảy ra: ${data.message}`);
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            setMessage('Có lỗi xảy ra khi kết nối với máy chủ.');
        });

        // Sau khi xử lý, reset trạng thái
        setSongName('');
        setSongImage(null);
        setSongFile(null);
        setImagePreview('');
    };

    return (
        <div id="upload_page">
            <h1>Upload nhạc của bạn lên website</h1>
            <form id="upload_form" onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-column1">
                        <label>Tên bài hát:</label>
                    </div>
                    <div className="form-column">
                        <input
                            id="input_name"
                            type="text" 
                            value={songName} 
                            onChange={(event) => setSongName(event.target.value)} 
                            placeholder="Nhập tên bài hát"
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column1">
                        <label>Chọn ảnh bài hát
                        (ảnh 160x160 pixel)
                        </label>
                    </div>
                    <div className="form-column">
                        <input 
                            id = "pick_image"
                            type="file" 
                            accept="image/*" 
                            onChange={handleSongImageChange} 
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column1">
                        <label>Chọn bài hát</label>
                    </div>
                    <div className="form-column">
                        <input 
                            id = "pick_audio"
                            type="file" 
                            accept="audio/*" 
                            onChange={handleSongFileChange} 
                        />
                    </div>
                </div>
                <div className="form-row" id="div_button">
                    <button id="button" type="submit">Upload</button>
                </div>
            </form>
            <label id="trans_notice">
                {message}
            </label>
            {imagePreview && <div id="preview_image"><img src={imagePreview} alt="Preview" /></div>}
        </div>
    );
};

export default Upload;
