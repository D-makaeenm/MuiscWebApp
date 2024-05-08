<!DOCTYPE html>
<html>

<head>
    <title>Trang Mới</title>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.7.1/jquery.min.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-QWTKZyjpPEjISv5WaRU9OFeRpok6YctnYmDr5pNlyT2bRjXh0JMhjY6hW+ALEwIH" crossorigin="anonymous">
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"
        integrity="sha384-YvpcrYf0tY3lHB60NNkmXc5s9fDVZLESaAA55NDzOxhy9GkcIdslK1eN7N6jIeHz" crossorigin="anonymous">
    </script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.4/jquery-confirm.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-confirm/3.3.4/jquery-confirm.min.js"></script>
    <script src="https://kit.fontawesome.com/e2cb9211c0.js" crossorigin="anonymous"></script>
    <link rel="stylesheet" href="css\index.css">
    <script src="script\css.js"></script>
    <script src="script\scriptlogin.js"></script>
    
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div id="left-bar">
                <div id="btn_logo">
                    <button id="logo">
                        <img id="logo" src="image\logo1.png" alt="logo.png">
                    </button>
                </div>
                <div id="btn_leftbar">
                    <i id="font_aws" class="fa-solid fa-music"></i>
                    <a id="title_btn">Tải nhạc lên</a>
                </div>
                <div id="btn_leftbar">
                    <i id="font_aws" class="fa-solid fa-folder"></i>
                    <a id="title_btn"> Thư viện</a>
                </div>
                <div id="btn_leftbar">
                    <i id="font_aws" class="fa-solid fa-sliders"></i>
                    <a id="title_btn">Playlist của bạn</a>
                </div>
                <div id="btn_leftbar">
                    <i id="font_aws" class="fa-regular fa-file-audio"></i>
                    <a id="title_btn">Nhạc mới đăng</a>
                </div>
                <div id="btn_leftbar">
                    <i id="font_aws" class="fa-solid fa-music"></i>
                    <a id="title_btn">Chủ đề và thể loại</a>
                </div>
                <div id="left_bar_login">
                    <table>
                        <tr>
                            <th>Đăng nhập để có thể sử dụng nhiều tính năng hơn!</th>
                        </tr>
                        <tr>
                            <td>
                                <button id="left_bar_login_btn">Đăng nhập</button>
                            </td>
                        </tr>
                    </table>
                </div>
            </div>
            <div class="col">
                <div id="nav-bar">
                    <!-- <input id="search" type="text" class="form-control" placeholder="Tìm kiếm"> -->
                    <button id="login" class="btn">Đăng nhập</button>
                    <p id="show_username"></p>
                    <button id="logout" type="button" class="btn btn-outline-info">Đăng xuất</button>
                </div>
                <div id="mainpage-container">
                    <div id="mainpage">
                        <div id="scroll" data-bs-spy="scroll" data-bs-target="#navbar-example2"
                            data-bs-root-margin="0px 0px -40%" data-bs-smooth-scroll="true"
                            class="scrollspy-example bg-body-tertiary p-3 rounded-2" tabindex="0">
                            <div id="gallery" class="slideshow-container" onmouseenter="pauseSlideshow()"
                                onmouseleave="startSlideshow()">
                                <div class="mySlides">
                                    <img id="img_gal" src="image\1ed445615d7119557c913c2c2cb31b2e.jpg">
                                </div>
                                <div class="mySlides">
                                    <img id="img_gal" src="image\8b6110aa6cddbece7565ba0168f3ea72.jpg">
                                </div>

                                <div class="mySlides">
                                    <img id="img_gal" src="image\e4111d3568b3a9d9685c2136d22404da.jpg">
                                </div>

                                <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
                                <a class="next" onclick="plusSlides(1)">&#10095;</a>
                            </div>
                            <h4 id="scrollspyHeading2">Mới đăng tải</h4>
                            <div class="container text-center">
                                <div id="row_newest" class="row g-4">
                                    <div class="col col_newest">
                                        <div class="flex-container">
                                            <div id="img_thmp">
                                                <img id="img_thmp_in" src="image\img_thumpnail.jpg" alt="">
                                            </div>
                                            <div id="value_thmp">
                                                <p>asd</p>
                                                <p>cxc</p>
                                                <p>fdfa</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="col col_newest">Cell 2</div>
                                    <div class="col col_newest">Cell 3</div>
                                </div>
                                <div id="row_newest" class="row g-4">
                                    <div class="col col_newest">Cell 4</div>
                                    <div class="col col_newest">Cell 5</div>
                                    <div class="col col_newest">Cell 6</div>
                                </div>
                                <div id="row_newest" class="row g-4">
                                    <div class="col col_newest">Cell 7</div>
                                    <div class="col col_newest">Cell 8</div>
                                    <div class="col col_newest">Cell 9</div>
                                </div>
                                <div id="row_newest" class="row g-4">
                                    <div class="col col_newest">Cell 10</div>
                                    <div class="col col_newest">Cell 11</div>
                                    <div class="col col_newest">Cell 12</div>
                                </div>
                                <script src="script\song_newest_click.js"></script>
                            </div>
                            <h4 id="scrollspyHeading3">Third heading</h4>
                            <p>...</p>
                            <h4 id="scrollspyHeading4">Fourth heading</h4>
                            <p>...</p>
                            <div id="last_item">
                                <h4 id="scrollspyHeading5">Fifth heading</h4>
                                <p>ass</p>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div id="bottom_bar">
                <div class="flex-container ctn_bottom_bar">
                    <div id="img_thmp_bottom_bar">
                        <img id="img_thmp_in_bottom_bar" src="image\img_thumpnail.jpg" alt="">
                    </div>
                    <div id="value_thmp_bottom_bar">
                        <p id="p1">asd</p>
                        <p id="p2">cxc</p>
                    </div>
                    <div id="add_playlist_bottom_bar">
                        <i id="btn_add_playlist" class="fa-solid fa-heart"></i>
                    </div>
                </div>
                <div id="audio">
                    <audio id="audio1" controls>
                        <source src="mp3\Hold On  Fadi Slowed Reverb.mp3">
                        </source>
                    </audio>
                </div>
                <div id="volume">
                    <i class="fa-solid fa-volume-high"></i>
                    <input type="range" id="slider1" min="0" max="100" value="100"></input>
                    <script src="script\volume.js"></script>
                </div>
            </div>
        </div>
    </div>
</body>

</html>