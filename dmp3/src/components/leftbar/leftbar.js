import './leftbar.css'
import Logo from '../logo/logo'
import { useNavigate } from 'react-router-dom';

const LeftBar = ()=>{
    const navigate = useNavigate(); // Sử dụng hook navigate để chuyển hướng
    const handleClick = () => {
        navigate('/upload'); // Chuyển hướng đến đường dẫn /upload khi click vào nút "Tải nhạc lên"
    };
    return(
        <>
            <div id="left-bar">
                <div id="btn_logo">
                    <Logo></Logo>
                </div>
                <div id="btn_leftbar" className="post_music" onClick={handleClick}>
                    <i id="font_aws" className="fa-solid fa-music"></i>
                    <button id="title_btn">Tải nhạc lên</button>
                </div>
                <div id="btn_leftbar" className="lib_music">
                    <i id="font_aws" className="fa-solid fa-folder"></i>
                    {/* <a href='#' id="title_btn"> Thư viện</a> */}
                </div>
                <div id="btn_leftbar" className="playlist_music">
                    <i id="font_aws" className="fa-solid fa-sliders"></i>
                    {/* <a href='#' id="title_btn">Playlist của bạn</a> */}
                </div>
                <div id="btn_leftbar" className="newest_music">
                    <i id="font_aws" className="fa-regular fa-file-audio"></i>
                    {/* <a href='#' id="title_btn">Nhạc mới đăng</a> */}
                </div>
                <div id="btn_leftbar" className="topic_music">
                    <i id="font_aws" className="fa-solid fa-music"></i>
                    {/* <a href='#' id="title_btn">Chủ đề và thể loại</a> */}
                </div>
                <div id="left_bar_login">
                    <table>
                        <thead>
                        <tr>
                            <th>Đăng nhập để có thể sử dụng nhiều tính năng hơn!</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr>
                            <td>
                            <button id="left_bar_login_btn">Đăng nhập</button>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
export default LeftBar