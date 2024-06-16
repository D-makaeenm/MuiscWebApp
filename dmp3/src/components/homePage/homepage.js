import React, { useContext, useEffect, useState } from 'react';
import { Slide } from 'react-slideshow-image';
import { SongContext } from '../songcontext/songcontext';
import 'react-slideshow-image/dist/styles.css';
import './homepage.css';

import image1 from './slideshow/image/0cb3d9535d544ef48c47bd5886b36f15.jpg';
import image2 from './slideshow/image/1ed445615d7119557c913c2c2cb31b2e.jpg';
import image3 from './slideshow/image/8b6110aa6cddbece7565ba0168f3ea72.jpg';
import image4 from './slideshow/image/e0e5e9a36cf8d9d3c92957c339ce533b.jpg';
import image5 from './slideshow/image/e4111d3568b3a9d9685c2136d22404da.jpg';

const Homepage = () => {
    const { setCurrentSong, playPlaylist, playChude } = useContext(SongContext);
    const [songs, setSongs] = useState([]);
    const [playlists, setPlaylists] = useState([]);
    const [topics, setTopics] = useState([]);
    const images = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];

    useEffect(() => {
        fetch('http://localhost/WebMusic/chucnang/get_top9_lastest.php')
            .then(response => response.json())
            .then(data => setSongs(data))
            .catch(error => console.error('Error fetching data:', error));

        fetch('http://localhost/WebMusic/chucnang/gettop4playlist.php')
            .then(response => response.json())
            .then(data => setPlaylists(data))
            .catch(error => console.error('Error fetching data:', error));

        fetch('http://localhost/WebMusic/chucnang/gettop4chude.php')
            .then(response => response.json())
            .then(data => setTopics(data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    const handleSongClick = (song) => {
        setCurrentSong(song);
    };

    const handlePlaylistClick = (playlist) => {
        fetch(`http://localhost/WebMusic/chucnang/getsongplaylist_homepage.php?playlistId=${playlist.PlaylistID}`)
            .then(response => response.json())
            .then(songs => playPlaylist(songs))
            .catch(error => console.error('Error fetching songs in playlist:', error));
    };

    const handleTopicClick = (topic) => {
        fetch(`http://localhost/WebMusic/chucnang/getsongchude_homepage.php?chudeId=${topic.ChuDeID}`)
            .then(response => response.json())
            .then(songs => playChude(songs))
            .catch(error => console.error('Error fetching songs in topic:', error));
    };

    return (
        <div id="homepage">
            <div id="slide">
                <Slide slidesToShow={3} slidesToScroll={1}>
                    {images.map((image, index) => (
                        <div className="each-slide-effect" key={index}>
                            <div style={{ backgroundImage: `url(${image})` }}>
                            </div>
                        </div>
                    ))}
                </Slide>
            </div>
            <div id="khac">
                <h1>Mới đăng tải</h1>
                <div id="newest_homepage">
                    {songs.map((song, index) => (
                        <div className="grid-item" key={index} onClick={() => handleSongClick(song)}>
                            <img src={song.ImagePath} alt="Thumbnail" className="item-image" />
                            <div className="item-content">
                                <p>Tên bài hát: {song.TenBaiHat}</p>
                                <p>Ngày đăng: {song.DatePosted}</p>
                                <p>Ca sĩ: {song.CaSi || 'Unknown Artist'}</p>
                            </div>
                        </div>
                    ))}
                </div>
                <div>
                    <h1>Top 4 Playlist nổi bật</h1>
                    <div id="homepage_playlist">
                        {playlists.map((playlist, index) => (
                            <div id="homepage_playlist_item" key={index} onClick={() => handlePlaylistClick(playlist)}>
                                <img 
                                    src={playlist.ImagePath}
                                    alt={playlist.TenPlaylist}
                                />
                                <p>{playlist.TenPlaylist}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h1>Top 4 Chủ đề nổi bật</h1>
                    <div id="homepage_chude">
                        {topics.map((topic, index) => (
                            <div id="homepage_chude_item" key={index} onClick={() => handleTopicClick(topic)}>
                                <img 
                                    src={topic.Imagepath}
                                    alt={topic.TenChuDe}
                                />
                                <p>{topic.TenChuDe}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Homepage;
