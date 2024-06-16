import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './chudeDetail.css';
import { SongContext } from '../../songcontext/songcontext';
import { useNavigate } from 'react-router-dom';

const ChudeDetail = () => {
    const { chudeId } = useParams();
    const [songs, setSongs] = useState([]);
    const { setCurrentSong } = useContext(SongContext);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId === '1') {
            setIsAdmin(true);
        }
        fetch('http://localhost/WebMusic/chucnang/get_songs_by_chude.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ ChuDeID: chudeId }),
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === '1') {
                setSongs(data.songs || []);
            } else {
                console.error('Failed to fetch songs:', data.message);
            }
        })
        .catch(error => console.error('Error fetching songs:', error));
    }, [chudeId]);

    const handleSongClick = (song) => {
        setCurrentSong(song);
    };
    
    const handlethemClick = () => {
        navigate(`/home/addmusic/${chudeId}`); // Thêm chudeId vào URL
    }

    const handleDelete = async (songId) => {
        try {
            const response = await fetch('http://localhost/WebMusic/chucnang/delete_song_in_chude.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chudeId, songId }),
            });
            const data = await response.json();
            if (data.message === "Song removed from topic successfully.") {
                // Cập nhật lại danh sách bài hát sau khi xóa
                setSongs(songs.filter(song => song.BaiHatID !== songId));
            } else {
                alert('Xóa bài hát khỏi chủ đề thất bại: ' + data.message);
            }
        } catch (error) {
            console.error('Lỗi khi xóa bài hát khỏi chủ đề:', error);
        }
    };

    return (
        <div id="chude_detail_page">
            <div id="title_in_chude">
                <h1>Danh sách bài hát thuộc chủ đề</h1>
                {isAdmin && (
                    <div className="tooltip_tp" onClick={handlethemClick}>
                        <i className="fa-solid fa-circle-plus"></i>
                        <span className="tooltip_tptext">Thêm nhạc</span>
                    </div>
                )}
            </div>
            <div id="all_songs">
                {songs.map(song => (
                    <div key={song.BaiHatID} id="chude_item_music" onClick={() => handleSongClick(song)}>
                        <img src={song.ImagePath} alt="Thumbnail" className="chude_item_image_detail" />
                        <div className="chude_item_content">
                            <p>{song.TenBaiHat}</p>
                            <p>{song.DatePosted}</p>
                            <p>{song.CaSi || 'Unknown Artist'}</p>
                        </div>
                        {isAdmin && (
                            <div id="delete_btn_item_in_topic" onClick={() => handleDelete(song.BaiHatID)}>
                                <i className="fa-solid fa-trash"></i>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChudeDetail;
