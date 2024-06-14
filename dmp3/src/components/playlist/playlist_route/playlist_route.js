import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import './playlist_route.css';
import { SongContext } from '../../songcontext/songcontext';

const PlaylistDetail = () => {
  const { playlistId } = useParams();
  const [songs, setSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState('');
  const { setCurrentSong } = useContext(SongContext); // Use SongContext

  useEffect(() => {
    fetch('http://localhost/WebMusic/chucnang/get_songs_playlist.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ playlistId }),
    })
      .then(response => response.json())
      .then(data => {
        setSongs(data);
        if (data.length > 0) {
          setPlaylistName(data[0].TenPlaylist);
        }
      })
      .catch(error => console.error('Error fetching songs:', error));
  }, [playlistId]);

  const handleSongClick = (song) => {
    setCurrentSong(song); // Set current song to SongContext
    console.log(`Playing song: ${song.TenBaiHat}`);
  };

  const handleDeleteClick = (songId) => {
    console.log(`Deleting song with ID: ${songId}`);
  };

  return (
    <div id="playlist_detail_page">
        <h1>Bài hát trong playlist: {playlistName}</h1>
        <div id="song_list">
            {songs.map(song => (
                <div key={song.BaiHatID} id="playlist_item" onClick={() => handleSongClick(song)}>
                    <img src={song.ImagePath} alt="Thumbnail" className="playlist_item_image" />
                    <div className="playlist_item_content">
                        <p>{song.TenBaiHat}</p>
                        <p>{song.DatePosted}</p>
                        <p>{song.CaSi || 'Unknown Artist'}</p>
                    </div>
                    <div id="delete_btn" onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteClick(song.BaiHatID);
                    }}>
                        <i className="fa-solid fa-trash"></i>
                    </div>
                </div>
            ))}
        </div>
    </div>
  );
};

export default PlaylistDetail;
