import React, { useContext, useEffect, useRef, useState } from 'react';
import { SongContext } from '../songcontext/songcontext';
import './bottombar.css';

const BottomBar = () => {
    const { currentSong } = useContext(SongContext);
    const audioRef = useRef(null);
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);
    const [volume, setVolume] = useState(100);
    const [isMuted, setIsMuted] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isLooping, setIsLooping] = useState(false);

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
            audioRef.current.addEventListener('timeupdate', () => {
                setCurrentTime(audioRef.current.currentTime);
            });
            audioRef.current.addEventListener('loadedmetadata', () => {
                setDuration(audioRef.current.duration);
            });
            audioRef.current.loop = isLooping;
        }
    }, [isLooping]);

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
                        <button id="like" className="tooltip">
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
                    <div id="prev_btn"><i className="fa-solid fa-backward"></i></div>
                    <div id="play_btn" onClick={handlePlay}><i className={isPlaying ? "fa-solid fa-pause" : "fa-regular fa-circle-play"}></i></div>
                    <div id="pause_btn" onClick={handlePause}><i className="fa-solid fa-square"></i></div>
                    <div id="next_btn"><i className="fa-solid fa-forward"></i></div>
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
                <div id="menu">
                    <i className="fa-solid fa-bars"></i>
                </div>
            </div>
        </div>
    );
};

export default BottomBar;
