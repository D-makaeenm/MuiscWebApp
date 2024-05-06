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
    <link rel="stylesheet" href="css\index.css">
    <script src="script\css.js"></script>
    <script src="script\scriptlogin.js"></script>
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <div id="left-bar">
                <button id="logo">
                    <img id="logo" src="image\logo.png" alt="logo.png">
                </button>
            </div>
            <div class="col">
                <div id="nav-bar">
                    <input id="search" type="text" class="form-control" placeholder="Tìm kiếm">
                    <button id="login" class="btn">Đăng nhập</button>
                    <p id="show_username"></p>
                    <button id="logout" type="button" class="btn btn-outline-info">Đăng xuất</button>
                </div>
                <div id="mainpage">
                    <div id="scroll" data-bs-spy="scroll" data-bs-target="#navbar-example2" data-bs-root-margin="0px 0px -40%"
                        data-bs-smooth-scroll="true" class="scrollspy-example bg-body-tertiary p-3 rounded-2"
                        tabindex="0">
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
                        <p>...</p>
                        <h4 id="scrollspyHeading3">Third heading</h4>
                        <p>...</p>
                        <h4 id="scrollspyHeading4">Fourth heading</h4>
                        <p>...</p>
                        <h4 id="scrollspyHeading5">Fifth heading</h4>
                        <p>assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        assssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</body>

</html>