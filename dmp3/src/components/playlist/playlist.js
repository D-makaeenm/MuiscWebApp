// playlist.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './playlist.css';
import { SongContext } from '../songcontext/songcontext';

const Playlist = () => {
    const { playPlaylist } = useContext(SongContext);
    const [playlists, setPlaylists] = useState([]);
    const navigate = useNavigate();

    const handleAddPlaylist = () => {
        navigate('/home/playlist/addplaylist');
    };

    const handleViewPlaylist = (playlistId) => {
        navigate(`/home/playlist/${playlistId}`);
    };

    const handleDeletePlaylist = async (playlistID) => {
        const userId = localStorage.getItem('userId');
        try {
            const response = await fetch('http://localhost/WebMusic/chucnang/delete_playlist.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, playlistID }),
            });
            const data = await response.json();
            if (data.success) {
                alert('Đã xóa thành công 1 playlist');
                setPlaylists(prevPlaylists => prevPlaylists.filter(playlist => playlist.PlaylistID !== playlistID));
            } else {
                console.error('Failed to delete playlist:', data.message);
            }
        } catch (error) {
            console.error('Error deleting playlist:', error);
        }
    };

    useEffect(() => {
        const fetchPlaylists = async () => {
            try {
                const userId = localStorage.getItem('userId');
                const response = await fetch('http://localhost/WebMusic/chucnang/get_playlists.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ userId }),
                });
                const data = await response.json();
                setPlaylists(data);
            } catch (error) {
                console.error('Error fetching playlists:', error);
            }
        };

        fetchPlaylists();
    }, []);

    const play_playlistclick = async (playlistId, playlistName) => {
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch('http://localhost/WebMusic/chucnang/get_songs_playlist.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, playlistId }),
            });
            const songs = await response.json();
            if (songs.length > 0) {
                playPlaylist(songs);
            } else {
                alert('Playlist này không có bài hát nào.');
            }
        } catch (error) {
            console.error('Error fetching playlist songs:', error);
        }
    };

    return (
        <div id="playlist_page">
            <div id="title">
                <h1>Playlist của bạn</h1>
                <div onClick={handleAddPlaylist} className="tooltip_pl">
                    <i className="fa-solid fa-circle-plus"></i>
                    <span className="tooltip_pltext">Tạo Playlist</span>
                </div>
            </div>
            <div id="playlist">
                {playlists.map(playlist => (
                    <div id="item" key={playlist.PlaylistID}>
                        <img src={playlist.ImagePath} 
                            alt={playlist.TenPlaylist} 
                            onClick={() => handleViewPlaylist(playlist.PlaylistID)}
                        />
                        <p onClick={() => handleViewPlaylist(playlist.PlaylistID)}>
                            {playlist.TenPlaylist}</p>
                        <div id="button_playlist_div">
                            <button className="tooltip" id="play_playlist" onClick={() => play_playlistclick(playlist.PlaylistID, playlist.TenPlaylist)}>
                                <i className="fa-solid fa-play"></i>
                                <span className="tooltiptext">Nghe</span>
                            </button>
                            <button id="delete_playlist" onClick={() => handleDeletePlaylist(playlist.PlaylistID)}>Xóa</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Playlist;
