import React, { createContext, useState, useEffect } from 'react';

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [currentPlaylist, setCurrentPlaylist] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);
    const [playlistType, setPlaylistType] = useState('playlist'); // 'playlist' or 'chude'

    useEffect(() => {
        if (currentPlaylist.length > 0) {
            setCurrentSong(currentPlaylist[currentSongIndex]);
        }
    }, [currentPlaylist, currentSongIndex]);

    const playNextSong = () => {
        if (currentPlaylist.length > 0) {
            const nextIndex = (currentSongIndex + 1) % currentPlaylist.length;
            setCurrentSongIndex(nextIndex);
        }
    };

    const playPrevSong = () => {
        if (currentPlaylist.length > 0) {
            const prevIndex = (currentSongIndex - 1 + currentPlaylist.length) % currentPlaylist.length;
            setCurrentSongIndex(prevIndex);
        }
    };

    const playPlaylist = (playlist, type = 'playlist') => {
        setCurrentPlaylist(playlist);
        setCurrentSongIndex(0);
        setPlaylistType(type);
    };

    return (
        <SongContext.Provider value={{ 
            currentSong, 
            setCurrentSong, 
            currentPlaylist, 
            setCurrentPlaylist, 
            currentSongIndex, 
            setCurrentSongIndex, 
            playNextSong,
            playPrevSong,
            playPlaylist,
            playlistType,
            setPlaylistType
        }}>
            {children}
        </SongContext.Provider>
    );
};
