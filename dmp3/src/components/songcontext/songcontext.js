import React, { createContext, useState, useEffect } from 'react';

export const SongContext = createContext();

export const SongProvider = ({ children }) => {
    const [currentSong, setCurrentSong] = useState(null);
    const [currentPlaylist, setCurrentPlaylist] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(0);

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

    const playPlaylist = (playlist) => {
        setCurrentPlaylist(playlist);
        setCurrentSongIndex(0);
    };

    const playChude = (chudeSongs) => {
        setCurrentPlaylist(chudeSongs);
        setCurrentSongIndex(0);
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
            playChude
        }}>
            {children}
        </SongContext.Provider>
    );
};
