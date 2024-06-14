import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './chudeDetail.css';
import { SongContext } from '../../songcontext/songcontext';

const ChudeDetail = () => {
    const { chudeId } = useParams();
    const [songs, setSongs] = useState([]);
    const { setCurrentSong } = useContext(SongContext);

    useEffect(() => {
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

    return (
        <div id="chude_detail_page">
            <h1>Danh sách bài hát thuộc chủ đề</h1>
            <div id="all_songs">
                {songs.map(song => (
                    <div key={song.BaiHatID} id="chude_item_music" onClick={() => handleSongClick(song)}>
                        <img src={song.ImagePath} alt="Thumbnail" className="chude_item_image_detail" />
                        <div className="chude_item_content">
                            <p>{song.TenBaiHat}</p>
                            <p>{song.DatePosted}</p>
                            <p>{song.CaSi || 'Unknown Artist'}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ChudeDetail;
