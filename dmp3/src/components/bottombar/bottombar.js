import React, { useContext, useEffect, useRef, useState } from 'react';
import { SongContext } from '../songcontext/songcontext';
import './bottombar.css';
import { useNavigate } from 'react-router-dom';

const BottomBar = () => {
    const { currentSong, playNextSong, playPrevSong } = useContext(SongContext);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!currentSong) {
            if (audioRef.current) {
                audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
            }
            return;
        }

        if (audioRef.current) {
            audioRef.current.src = currentSong.FilePath;
            audioRef.current.play();
            setIsPlaying(true);
        }
    }, [currentSong]);

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
        }
    };

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
            audioRef.current.addEventListener('loadedmetadata', () => {
                setDuration(audioRef.current.duration);
            });
            audioRef.current.addEventListener('ended', playNextSong);
            audioRef.current.loop = isLooping;
        }
        const currentAudioRef = audioRef.current;
        return () => {
            if (currentAudioRef) {
                currentAudioRef.removeEventListener('timeupdate', handleTimeUpdate);
                currentAudioRef.removeEventListener('ended', playNextSong);
            }
        };
    }, [isLooping, playNextSong]);

    const formatTime = (time) => {
        if (!time) return '0:00';
        const mins = Math.floor(time / 60);
        const secs = Math.floor(time % 60);
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const handlePlay = () => {
        if (audioRef.current) {
            audioRef.current.play();
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
        }
    };

    const handleVolumeChange = (e) => {
        const newVolume = e.target.value / 100;
        setVolume(e.target.value);
        setIsMuted(false);
        if (audioRef.current) {
            audioRef.current.volume = newVolume;
        }
    };

    const handleMuteToggle = () => {
        setIsMuted(!isMuted);
        if (audioRef.current) {
            audioRef.current.muted = !audioRef.current.muted;
        }
    };

    const toggleLoop = () => {
        setIsLooping(!isLooping);
    };

    const handleLikeClick = async () => {
        if (!currentSong) return;
        try {
            const userId = localStorage.getItem('userId');
            const response = await fetch('http://localhost/WebMusic/chucnang/like_song.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    userId: userId,
                    BaiHatID: currentSong.BaiHatID
                })
            });
            if (response.ok) {
                const data = await response.json();
                if (data.message === 'The song is already liked by this user.') {
                    alert('Bài hát đã được thích');
                } else {
                    console.log('Song liked successfully:', data);
                    alert('Like thành công!');
                }
            } else {
                console.error('Failed to like the song');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const handleMenuClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleAddToPlaylistClick = () => {
        navigate('playlist/add_music');
    };

    return (
        <div id="bottom_bar">
            <div id="song_infor">
            {currentSong ? (
                    <>
                        <img src={currentSong.ImagePath} alt="Thumbnail" className="item-image" />
                        <div className="item_content">
                            <p>{currentSong.TenBaiHat}</p>
                            <p>{currentSong.DatePosted}</p>
                            <p>{currentSong.CaSi || 'Unknown Artist'}</p>
                        </div>
                        <button id="like" className="tooltip" onClick={handleLikeClick}>
                            <i className="fa-solid fa-heart"></i>
                            <span className="tooltiptext">Thích</span>
                        </button>
                    </>
                ) : (
                    <>
                        <img src="https://www.irvineparkrailroad.com/wp-content/uploads/2016/06/150x150-image-placeholder.jpg" alt="Placeholder" className="item-image" />
                        <div className="item_content">
                            <p></p>
                            <p></p>
                            <p>Unknown Artist</p>
                        </div>
                    </>
                )}
            </div>
            <div id="progess_song">
            <div id="audio_btn">
                    <div id="shuffle_btn"><i className="fa-solid fa-shuffle"></i></div>
                    <div id="prev_btn" onClick={playPrevSong}><i className="fa-solid fa-backward"></i></div>
                    <div id="play_btn" onClick={isPlaying ? handlePause : handlePlay}>
                        <i className={isPlaying ? "fa-solid fa-pause" : "fa-regular fa-circle-play"}></i>
                    </div>
                    <div id="next_btn" onClick={playNextSong}><i className="fa-solid fa-forward"></i></div>
                    <div 
                        id="repeat_btn" 
                        onClick={toggleLoop} 
                        style={{ backgroundColor: isLooping ? '#909aaf56' : 'transparent' }}
                    >
                        <i className="fa-solid fa-repeat"></i>
                    </div>
                </div>
                <div id="seekBar_audio">
                    <p id="currentTime">{formatTime(currentTime)}</p>
                    <input 
                        type="range" 
                        id="seekBar" 
                        min="0" 
                        max={duration || 0}
                        value={currentTime || 0}
                        className="slider_audio"
                        onChange={(e) => {
                            if (audioRef.current) {
                                audioRef.current.currentTime = e.target.value;
                                setCurrentTime(e.target.value);
                            }
                        }}
                    />
                    <p id="duration">{formatTime(duration)}</p>
                </div>
                <audio id="audio1" controls ref={audioRef}>
                    <source src={currentSong ? currentSong.FilePath : ''} />
                </audio>
            </div>
            <div id="tools">
                <div id="volume" className={isMuted ? 'muted' : ''}>
                    <i className={isMuted ? "fa-solid fa-volume-xmark" : "fa-solid fa-volume-high"} onClick={handleMuteToggle}></i>
                    <input 
                        type="range" 
                        min="0" 
                        max="100" 
                        value={isMuted ? 0 : volume} 
                        onChange={handleVolumeChange} 
                        className="slider" 
                        id="volumeSlider" 
                    />
                    <span className="volumeValue">{isMuted ? 0 : volume}</span>
                </div>
                {currentSong && (
                    <div id="menu">
                        <i className="fa-solid fa-bars" onClick={handleMenuClick}></i>
                        {isMenuOpen && (
                            <div className="menu-dropdown">
                                <button onClick={handleAddToPlaylistClick}>Thêm vào playlist</button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default BottomBar;
