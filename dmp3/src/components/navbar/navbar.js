import React, { useState, useEffect, useContext } from 'react';
import './navbar.css'
import { useNavigate } from 'react-router-dom';
import { SongContext } from '../songcontext/songcontext';

const Navbar = () => {
    const [username, setUsername] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const { setCurrentSong } = useContext(SongContext);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const loginclick = () =>{
        navigate("/signin");
    }
    const signupclick = () =>{
        navigate("/signup");
    }
    const logoutclick = () => {
        localStorage.removeItem('username');
        setUsername('');
        navigate("/signin");
    };

    const handleSearch = async (e) => {
        const query = e.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            try {
                const response = await fetch(`http://localhost/WebMusic/chucnang/search_songs.php`);
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error('Lỗi khi tìm kiếm bài hát:', error);
            }
        } else {
            setSearchResults([]);
        }
    };

    const handleSongClick = (song) => {
        setCurrentSong(song);
        setSearchResults([]);
        setSearchQuery('');
    };

    return(
        <div id="nav-bar">
            <div id="search-container">
                <input 
                    id="search" 
                    type="text" 
                    className="form-control" 
                    placeholder="Tìm kiếm"
                    value={searchQuery}
                    onChange={handleSearch}
                />
                {searchResults.length > 0 && (
                    <div id="search-results">
                        {searchResults.map(song => (
                            <div 
                                key={song.BaiHatID} 
                                className="search-result-item"
                                onClick={() => handleSongClick(song)}
                            >
                                <img src={song.ImagePath} alt="Thumbnail" className="search-thumbnail" />
                                <span>{song.TenBaiHat}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            {username ? (
                <>
                    <p id="show_username">Xin chào, {username}!</p>
                    <button id="logout" type="button" onClick={logoutclick} className="btn btn-outline-info">Đăng xuất</button>
                </>
            ) : (
                <>
                    <button id="login" type="button" onClick={loginclick} className="btn btn-outline-info">Đăng nhập</button>
                    <button id="register" type="button" onClick={signupclick} className="btn btn-outline-info">Đăng ký</button>
                </>
            )}
        </div>
    )
}
export default Navbar;