import React from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import './homepage.css';

import image1 from './slideshow/image/0cb3d9535d544ef48c47bd5886b36f15.jpg';
import image2 from './slideshow/image/1ed445615d7119557c913c2c2cb31b2e.jpg';
import image3 from './slideshow/image/8b6110aa6cddbece7565ba0168f3ea72.jpg';
import image4 from './slideshow/image/e0e5e9a36cf8d9d3c92957c339ce533b.jpg';
import image5 from './slideshow/image/e4111d3568b3a9d9685c2136d22404da.jpg';

const Homepage = () => {
    const images = [
        image1,
        image2,
        image3,
        image4,
        image5
    ];

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
                {Array.from({ length: 9 }).map((_, index) => (
                    <div className="grid-item" key={index}>
                        <img src="https://i.imgur.com/suXZGBZ.jpg" alt="Thumbnail" className="item-image" />
                        <div className="item-content">
                            <p>Tên bài hát {index + 1}</p>
                            <p>Ngày đăng</p>
                            <p>Tên Ca sĩ</p>
                        </div>
                    </div>
                ))}
                </div>
                <div>
                    asdasdadsa
                </div>
            </div>
        </div>
    );
};

export default Homepage;
