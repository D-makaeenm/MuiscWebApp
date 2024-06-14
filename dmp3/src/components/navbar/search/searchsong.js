import React, { useState, useEffect, useContext } from 'react';
import { SongContext } from '../../songcontext/songcontext';
import './searchsong.css';

const SearchBar = () => {
    const [query, setQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { setCurrentSong } = useContext(SongContext);

    useEffect(() => {
        if (query) {
            const fetchSearchResults = async () => {
                try {
                    const response = await fetch(`http://localhost/WebMusic/chucnang/search_songs.php?query=${query}`);
                    const data = await response.json();
                    setSearchResults(data);
                } catch (error) {
                    console.error('Lỗi khi tìm kiếm bài hát:', error);
                }
            };

            fetchSearchResults();
        } else {
            setSearchResults([]);
        }
    }, [query]);

    const handleSongClick = (song) => {
        setCurrentSong(song);
        setSearchResults([]);
        setQuery('');
    };

    return (
        <div className="search-bar">
            <input 
                type="text" 
                placeholder="Tìm kiếm bài hát..." 
                value={query} 
                onChange={(e) => setQuery(e.target.value)}
            />
            {searchResults.length > 0 && (
                <div className="search-results">
                    {searchResults.map((song) => (
                        <div key={song.BaiHatID} className="search-result-item" onClick={() => handleSongClick(song)}>
                            <img src={song.ImagePath} alt={song.TenBaiHat} />
                            <span>{song.TenBaiHat}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
