import React, { useState, useEffect, useContext } from 'react';
import './library.css';
import { SongContext } from '../songcontext/songcontext';

const Library = () => {
    const [activeTab, setActiveTab] = useState('uploaded');
    const [musicList, setMusicList] = useState([]);
    const { setCurrentSong } = useContext(SongContext);

    useEffect(() => {
        const fetchMusicList = async () => {
            try {
                const userId = localStorage.getItem('userId');
                let url = 'http://localhost/WebMusic/chucnang/get_upload.php';
                if (activeTab === 'liked') {
                    url = 'http://localhost/WebMusic/chucnang/get_liked_song.php';
                }
                const response = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ userId })
                });
                const data = await response.json();
                setMusicList(data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bài hát:', error);
            }
        };

        fetchMusicList();
    }, [activeTab]);

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    };

    const handleSongClick = (song) => {
        setCurrentSong(song);
    };

    const handleDeleteClick = async (songId) => {
        try {
            const userId = localStorage.getItem('userId');
            let url = 'http://localhost/WebMusic/chucnang/delete_uploaded_song.php';
            if (activeTab === 'liked') {
                url = 'http://localhost/WebMusic/chucnang/delete_liked_song.php';
            }
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId, songId })
            });
            if (response.ok) {
                setMusicList(musicList.filter(song => song.BaiHatID !== songId));
            } else {
                console.error('Failed to delete the song');
            }
        } catch (error) {
            console.error('Error deleting song:', error);
        }
    };

    return (
        <div id="lib_page">
            <h1 id="lib_text">Thư viện của bạn</h1>
            <div className="tabs">
                <div 
                    className={`tab ${activeTab === 'uploaded' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('uploaded')}
                >
                    Nhạc đã tải lên
                </div>
                <div 
                    className={`tab ${activeTab === 'liked' ? 'active' : ''}`} 
                    onClick={() => handleTabClick('liked')}
                >
                    Nhạc đã like
                </div>
            </div>
            <div className="tab-content">
                {activeTab === 'uploaded' && (
                    <div>
                        <h2>Nhạc đã tải lên</h2>
                        {musicList.map(song => (
                            <div key={song.BaiHatID} id="upload_item" onClick={() => handleSongClick(song)}>
                                <img src={song.ImagePath} alt="Thumbnail" className="upload_item_image" />
                                <div className="upload_item_content">
                                    <p>{song.TenBaiHat}</p>
                                    <p>{song.DatePosted}</p>
                                    <p>{song.CaSi || 'Unknown Artist'}</p>
                                </div>
                                <div id="delete_btn" onClick={() => handleDeleteClick(song.BaiHatID)}>
                                    <i className="fa-solid fa-trash"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === 'liked' && (
                    <div>
                        <h2>Nhạc đã like</h2>
                        {musicList.map(song => (
                            <div key={song.BaiHatID} id="liked_item" onClick={() => handleSongClick(song)}>
                                <img src={song.ImagePath} alt="Thumbnail" className="liked_item_image" />
                                <div className="liked_item_content">
                                    <p>{song.TenBaiHat}</p>
                                    <p>{song.DateAdded}</p>
                                    <p>{song.CaSi || 'Unknown Artist'}</p>
                                </div>
                                <div id="delete_btn" onClick={() => handleDeleteClick(song.BaiHatID)}>
                                    <i className="fa-solid fa-trash"></i>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Library;
