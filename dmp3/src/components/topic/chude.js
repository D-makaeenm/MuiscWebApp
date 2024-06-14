import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './chude.css';
import { SongContext } from '../songcontext/songcontext';

const Chude = () => {
    const [chudeItem, setChudeItem] = useState([]);
    const [songsByChude, setSongsByChude] = useState({});
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();
    const { setCurrentSong } = useContext(SongContext);

    useEffect(() => {
        const userId = localStorage.getItem('userId');
        if (userId === '1') {
            setIsAdmin(true);
        }

        fetch('http://localhost/WebMusic/chucnang/get_chude.php', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then(response => response.json())
        .then(data => {
            if (data.success === '1') {
                const topics = data.topics || [];
                setChudeItem(topics);
                fetchTopSongsByChude(topics);
            } else {
                console.error('Failed to fetch chude:', data.message);
            }
        })
        .catch(error => console.error('Error fetching chude:', error));
    }, []);

    const fetchTopSongsByChude = (topics) => {
        topics.forEach(topic => {
            fetch('http://localhost/WebMusic/chucnang/get_top3_songs_bt_chude.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ chudeId: topic.ChuDeID }),
            })
            .then(response => response.json())
            .then(data => {
                if (data.success === '1') {
                    setSongsByChude(prevState => ({
                        ...prevState,
                        [topic.ChuDeID]: data.songs || []
                    }));
                } else {
                    console.error('Failed to fetch songs:', data.message);
                }
            })
            .catch(error => console.error('Error fetching songs:', error));
        });
    };

    const handleViewChude = (chudeId) => {
        navigate(`/home/chude/${chudeId}`);
    };

    const handleAddChude = () => {
        navigate(`/home/topic/add_chude`);
    };

    const handleSongClick = (song) => {
        setCurrentSong(song);
    };

    return (
        <div id="chude_page">
            <div id="title_chude">
                <h1>Các chủ đề âm nhạc</h1>
                {isAdmin && (
                    <div onClick={handleAddChude} className="tooltip_tp">
                        <i className="fa-solid fa-circle-plus"></i>
                        <span className="tooltip_tptext">Tạo Chủ Đề</span>
                    </div>
                )}
            </div>
            <div id="chude_div">
                <p>Tất cả các chủ đề</p>
                <div id="all_chude">
                    {chudeItem.map(chude => (
                        <div className="item_chude" key={chude.ChuDeID} onClick={() => handleViewChude(chude.ChuDeID)}>
                            <p>{chude.TenChuDe}</p>
                            <img 
                                src={chude.Imagepath} 
                                alt={chude.TenChuDe} 
                            />
                        </div>
                    ))}
                </div>
                <div id="all_chu_de_preview">
                    {chudeItem.map(chude => (
                        <div className="div_chu_de" key={chude.ChuDeID}>
                            <h2>{chude.TenChuDe}</h2>
                            <div className="div_item_music_chude">
                                {songsByChude[chude.ChuDeID] && songsByChude[chude.ChuDeID].slice(0, 3).map(song => (
                                    <div className="item_music_chude" key={song.BaiHatID} onClick={() => handleSongClick(song)}>
                                        <img 
                                            src={song.ImagePath} 
                                            alt={song.TenBaiHat} 
                                        />
                                        <p>{song.TenBaiHat}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Chude;
