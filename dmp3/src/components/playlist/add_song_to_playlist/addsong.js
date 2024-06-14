import React, { useContext, useEffect, useState } from 'react';
import './addsong.css';
import { SongContext } from '../../songcontext/songcontext';
import { useNavigate } from 'react-router-dom';

const AddSongtoPlaylist = () => {
    const { currentSong } = useContext(SongContext);
    const [playlists, setPlaylists] = useState([]);
    const [selectedPlaylists, setSelectedPlaylists] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        fetch('http://localhost/WebMusic/chucnang/get_playlists.php', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId }),
        })
        .then(response => response.json())
        .then(data => setPlaylists(data))
        .catch(error => console.error('Lỗi khi lấy playlist:', error));
    }, []);

    const handleCheckboxChange = (playlistId) => {
        setSelectedPlaylists((prevSelected) =>
            prevSelected.includes(playlistId)
                ? prevSelected.filter((id) => id !== playlistId)
                : [...prevSelected, playlistId]
        );
    };

    const handleAddClick = async () => {
        if (!currentSong) return;
        
        try {
            const response = await fetch('http://localhost/WebMusic/chucnang/add_to_playlist.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    BaiHatID: currentSong.BaiHatID,
                    PlaylistIDs: selectedPlaylists.join(',')
                })
            });

            if (response.ok) {
                alert('Thêm thành công!');
                navigate('/home/playlist');
            } else {
                console.error('Thêm thất bại!');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div id="add_song_to_playlist">
            <h1>Thêm vào playlist</h1>
            <div>
                {playlists.map((playlist) => (
                    <div key={playlist.PlaylistID}>
                        <input
                            type="checkbox"
                            id={`playlist-${playlist.PlaylistID}`}
                            onChange={() => handleCheckboxChange(playlist.PlaylistID)}
                        />
                        <label htmlFor={`playlist-${playlist.PlaylistID}`}>{playlist.TenPlaylist}</label>
                    </div>
                ))}
            </div>
            <button onClick={handleAddClick}>Thêm</button>
        </div>
    );
};

export default AddSongtoPlaylist;
