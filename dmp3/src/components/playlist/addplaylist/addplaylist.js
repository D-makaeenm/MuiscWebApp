import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './addplaylist.css';

const AddPlaylist = () => {
    const [playlistName, setPlaylistName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();

    const handleSave = async () => {
        const userId = localStorage.getItem('userId'); // Retrieve userId from localStorage
        const formData = new FormData();
        formData.append('playlistName', playlistName);
        formData.append('userId', userId);
        formData.append('playlistImage', imageFile);

        const response = await fetch('http://localhost/WebMusic/chucnang/add_playlists.php', {
            method: 'POST',
            body: formData,
        });

        const result = await response.json();
        if (result.success === '1') {
            navigate('/home/playlist');
            alert('Đã thêm thành công 1 Playlist');
        } else {
            alert('Tạo Playlist thất bại');
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setImageFile(file);
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview('');
        }
    };

    return (
        <div id="add_playlist_page">
            <h1>Thêm Playlist Mới</h1>
            <div className="playlist_form_group">
                <label>Tên Playlist:</label>
                <input
                    type="text"
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                />
            </div>
            <div className="playlist_form_group">
                <label>Chọn hình ảnh:</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    id="input_image"
                />
            </div>
            <button onClick={handleSave}>Lưu</button>
            {imagePreview && <div id="preview_image_playlist"><img src={imagePreview} alt="Preview" /></div>}
        </div>
    );
};

export default AddPlaylist;
