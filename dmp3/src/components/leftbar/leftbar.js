import './leftbar.css';
import Logo from '../logo/logo';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const LeftBar = () => {
    const navigate = useNavigate();
    const [userId, setUserId] = useState(null);

    useEffect(() => {
        const storedUserId = localStorage.getItem('userId');
        setUserId(storedUserId);
    }, []);

    useEffect(() => {
        const handleStorageChange = () => {
            const storedUserId = localStorage.getItem('userId');
            setUserId(storedUserId);
        };

        window.addEventListener('storage', handleStorageChange);
        return () => {
            window.removeEventListener('storage', handleStorageChange);
        };
    }, []);

    const uploadclick = () => {
        navigate('/home/upload');
    };
    const homeclick = () => {
        navigate('/home/homepage');
    };
    const libclick = () => {
        navigate('/home/library');
    };
    const playlistclick = () => {
        navigate('/home/playlist');
    };
    const newestclick = () => {
        navigate('/home/song_newest');
    };
    const topicclick = () => {
        navigate('/home/topic');
    };
    const feedbackclick = () => {
        navigate('/home/feedback');
    };
    const hideClick = () => {
        alert("Có vẻ bạn vừa khám phá ra thứ gì hay ho nhỉ ?");
    };
    

    return (
        <div id="left-bar">
            <div id="btn_logo" onClick={homeclick}>
                <Logo />
            </div>
            {userId ? (
                <>
                    <div id="btn_leftbar" className="post_music" onClick={uploadclick}>
                        <i id="font_aws" className="fa-solid fa-music"></i>
                        <button id="title_btn">Tải nhạc lên</button>
                    </div>
                    <div id="btn_leftbar" className="lib_music" onClick={libclick}>
                        <i id="font_aws" className="fa-solid fa-folder"></i>
                        <button id="title_btn">Thư viện</button>
                    </div>
                    <div id="btn_leftbar" className="playlist_music" onClick={playlistclick}>
                        <i id="font_aws" className="fa-solid fa-sliders"></i>
                        <button id="title_btn">Playlist của bạn</button>
                    </div>
                    <div id="btn_leftbar" className="newest_music" onClick={newestclick}>
                        <i id="font_aws" className="fa-regular fa-file-audio"></i>
                        <button id="title_btn">Nhạc mới đăng</button>
                    </div>
                    <div id="btn_leftbar" className="topic_music" onClick={topicclick}>
                        <i id="font_aws" className="fa-solid fa-music"></i>
                        <button id="title_btn">Chủ đề và thể loại</button>
                    </div>
                    <div id="btn_leftbar" className="feedback" onClick={feedbackclick}>
                        <i className="fa-solid fa-exclamation"></i>
                        <button id="title_btn">Báo cáo lỗi</button>
                    </div>
                </>
            ) : (
                <div id="btn_leftbar" onClick={hideClick}></div>
            )}
        </div>
    );
};

export default LeftBar;
