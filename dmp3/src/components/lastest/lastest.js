import React, { useState, useEffect, useContext } from 'react';
import './lastest.css';
import { SongContext } from '../songcontext/songcontext';

const Lastest = () => {
    const [songs, setSongs] = useState([]);
    const { setCurrentSong } = useContext(SongContext);

    useEffect(() => {
        const fetchLastestSongs = async () => {
            try {
                const response = await fetch('http://localhost/WebMusic/chucnang/get_lastest_songs.php');
                const data = await response.json();
                setSongs(data);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bài hát mới:', error);
            }
        };

        fetchLastestSongs();
    }, []);

    const getTimeAgo = (date) => {
        const seconds = Math.floor((new Date() - new Date(date)) / 1000);
        let interval = seconds / 31536000;

        if (interval > 1) {
            return Math.floor(interval) + ' năm trước';
        }
        interval = seconds / 2592000;
        if (interval > 1) {
            return Math.floor(interval) + ' tháng trước';
        }
        interval = seconds / 86400;
        if (interval > 1) {
            return Math.floor(interval) + ' ngày trước';
        }
        interval = seconds / 3600;
        if (interval > 1) {
            return Math.floor(interval) + ' giờ trước';
        }
        interval = seconds / 60;
        if (interval > 1) {
            return Math.floor(interval) + ' phút trước';
        }
        return Math.floor(seconds) + ' giây trước';
    };

    const handleSongClick = (song) => {
        setCurrentSong(song);
    };

    return (
        <div id="lastest_songs">
            <h1>20 bài hát mới đăng tải gần đây nhất</h1>
            <table>
                <thead>
                    <tr id="header">
                        <th>STT</th>
                        <th>Bài hát</th>
                        <th>Thời gian đăng</th>
                        <th>Ca sĩ</th>
                        <th>Người đăng</th>
                    </tr>
                </thead>
                <tbody>
                    {songs.map((song, index) => (
                        <tr key={song.BaiHatID} className="table_row" onClick={() => handleSongClick(song)}>
                            <td>{index + 1}</td>
                            <td>
                                <img src={song.ImagePath} alt="Thumbnail" className="song-thumbnail" />
                                <span>{song.TenBaiHat}</span>
                            </td>
                            <td>{getTimeAgo(song.DatePosted)}</td>
                            <td>{song.CaSi || 'Unknown Artist'}</td>
                            <td>{song.UserName}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Lastest;
