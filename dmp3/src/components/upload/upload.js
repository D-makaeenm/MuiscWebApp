import React, { useEffect, useState } from 'react';
import './upload.css';

const Upload = () => {
    const [songName, setSongName] = useState('');
    const [songImage, setSongImage] = useState(null);
    const [songFile, setSongFile] = useState(null);
    const [message, setMessage] = useState('');
    const [imagePreview, setImagePreview] = useState('');
    const [chuDeList, setChuDeList] = useState([]); // State to hold list of topics
    const [selectedChuDe, setSelectedChuDe] = useState(''); // State to hold selected topic
    const storedUserId = localStorage.getItem('userId');

    useEffect(() => {
        // Fetch list of topics from the server
        fetch('http://localhost/WebMusic/chucnang/get_chude.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === '1') {
                setChuDeList(data.topics || []); // Assume topics are returned in the data.topics array
            } else {
                console.error('Failed to fetch topics:', data.message);
            }
        })
        .catch(error => console.error('Error fetching topics:', error));
    }, []);

    const handleSongImageChange = (event) => {
        const file = event.target.files[0];
        setSongImage(file);
        const imageURL = URL.createObjectURL(file);
        setImagePreview(imageURL);
    };

    const handleSongFileChange = (event) => {
        const file = event.target.files[0];
        setSongFile(file);
        const fileName = file.name.split('.').slice(0, -1).join('.');
        setSongName(fileName);
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (songName.trim() === '') {
            setMessage('Vui lòng nhập tên bài hát');
            return;
        }

        if (!songImage || !songFile) {
            setMessage('Vui lòng chọn ảnh và bài hát');
            return;
        }

        if (!selectedChuDe) {
            setMessage('Vui lòng chọn chủ đề');
            return;
        }

        const formData = new FormData();
        formData.append('songName', songName);
        formData.append('songImage', songImage);
        formData.append('songFile', songFile);
        formData.append('userId', storedUserId);
        formData.append('chuDeId', selectedChuDe); // Append selected topic ID

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

        setSongName('');
        setSongImage(null);
        setSongFile(null);
        setImagePreview('');
        setSelectedChuDe(''); // Reset selected topic
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
                            id="pick_image"
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
                            id="pick_audio"
                            type="file" 
                            accept="audio/*" 
                            onChange={handleSongFileChange} 
                        />
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-column1">
                        <label>Chọn chủ đề</label>
                    </div>
                    <div className="form-column">
                        <select
                            id="select_chude"
                            value={selectedChuDe}
                            onChange={(event) => setSelectedChuDe(event.target.value)}
                        >
                            <option value="">Chọn chủ đề</option>
                            {chuDeList.map(chude => (
                                <option key={chude.ChuDeID} value={chude.ChuDeID}>
                                    {chude.TenChuDe}
                                </option>
                            ))}
                        </select>
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
