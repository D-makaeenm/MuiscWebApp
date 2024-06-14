import './add_topic.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AddTopic = () => {
    const [topicName, setTopicName] = useState('');
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const navigate = useNavigate();

    const handleSave = async () => {
        const formData = new FormData();
        formData.append('topicName', topicName);
        formData.append('topicImage', imageFile);

        try {
            const response = await fetch('http://localhost/WebMusic/chucnang/add_topic.php', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (result.success === '1') {
                navigate('/home/topic');
                alert('Đã thêm thành công Topic');
            } else {
                alert('Tạo Topic thất bại');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Có lỗi xảy ra, vui lòng thử lại sau');
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
        <div id="add_topic">
            <h1>Thêm Topic Mới</h1>
            <div className="topic_form_group">
                <label>Tên Topic:</label>
                <input
                    type="text"
                    value={topicName}
                    onChange={(e) => setTopicName(e.target.value)}
                />
            </div>
            <div className="topic_form_group">
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
}

export default AddTopic;
