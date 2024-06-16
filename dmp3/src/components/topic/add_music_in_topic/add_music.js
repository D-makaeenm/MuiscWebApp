import React, { useState, useEffect } from 'react';
import './add_music.css';
import { useParams } from 'react-router-dom';

const AddMusicToChude = () => {
    const [songs, setSongs] = useState([]);
    const { chudeId } = useParams(); // Lấy chudeId từ URL

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch('http://localhost/WebMusic/chucnang/get_all_songs.php');
                const data = await response.json();
                setSongs(data.songs || []);
            } catch (error) {
                console.error('Lỗi khi lấy danh sách bài hát:', error);
            }
        };

        fetchSongs();
    }, []);

    const handleAddSongToChude = async (songId) => {
        try {
            const response = await fetch('http://localhost/WebMusic/chucnang/add_song_to_chude.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chudeId, songId }),
            });
            const data = await response.json();
            if (data.message === "Song added to topic successfully.") {
                alert('Đã thêm bài hát vào chủ đề thành công');
            } else {
                alert('Thêm bài hát vào chủ đề thất bại: ' + data.message);
            }
        } catch (error) {
            console.error('Lỗi khi thêm bài hát vào chủ đề:', error);
        }
    };

    return (
        <div id="add_music_to_chude">
            <h1>Danh sách tất cả các bài hát</h1>
            <table>
                <thead>
                    <tr id="header_add_music_to_chude">
                        <th>STT</th>
                        <th>Bài hát</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody id="table_body">
                    {songs.map((song, index) => (
                        <tr key={song.BaiHatID} className="table_row">
                            <td>{index + 1}</td>
                            <td>
                                <img src={song.ImagePath} alt="Thumbnail" className="song-thumbnail" />
                                <span>{song.TenBaiHat}</span>
                            </td>
                            <td>
                                <i className="fa-solid fa-plus" onClick={() => handleAddSongToChude(song.BaiHatID)}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AddMusicToChude;
