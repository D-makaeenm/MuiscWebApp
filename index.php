<!DOCTYPE html>
<html>

<head>
    <title>DMp3 - Trang nghe nhạc siêu lậu, siêu leak</title>
    <link rel="icon" type="image/x-icon" href="image\favicon-32x32.png">
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
    <script src="script\GUI.js"></script>
    <script src="script\song_newest_show.js"></script>
    <!-- <script src="script\test.js"></script> -->
    <script src="script\song_newest_add_playlist.js"></script>
    <!-- <script src="script\bottom_bar.js"></script> -->
</head>

<body>
    <div class="container-fluid">
        <div class="row">
            <?php include 'form\leftbar.php'; ?>
            <div class="col">
                <div id="nav-bar">
                    <!-- <input id="search" type="text" class="form-control" placeholder="Tìm kiếm"> -->
                    <button id="login" class="btn">Đăng nhập</button>
                    <p id="show_username"></p>
                    <button id="logout" type="button" class="btn btn-outline-info">Đăng xuất</button>
                </div>
                <div id="mainpage-container">
                    <!-- main page -->
                    <?php include 'form\mainpage.php'; ?>
                    <!-- khi mainpage bi an -->
                    <?php include 'form\library.php'; ?>
                    <!-- khi libpage bi an -->
                    <div id="playlist_page">
                        <h1 id="playlist_page_text">Play list của bạn</h1>
                        <div id="playlist_page_container">
                            <div class="row_playlist_page">
                                <div id="playlist_page_item"><img src="image_path\8.jpg" alt="">img 1</div>
                                <div id="playlist_page_item"><img src="image_path\8.jpg" alt="">img 1</div>
                                <div id="playlist_page_item"><img src="image_path\8.jpg" alt="">img 1</div>
                                <div id="playlist_page_item"><img src="image_path\8.jpg" alt="">img 1</div>
                            </div>
                            <div class="row_playlist_page">
                                <div id="playlist_page_item"><img src="image_path\8.jpg" alt="">img 1</div>
                                <div id="playlist_page_item"><img src="image_path\8.jpg" alt="">img 1</div>
                                <div id="playlist_page_item"><img src="image_path\8.jpg" alt="">img 1</div>
                                <div id="playlist_page_item"><img src="image_path\8.jpg" alt="">img 1</div>
                            </div>
                        </div>
                    </div>
                    <!-- khi playlist_page bi an -->
                    <?php include 'form\newestpage.php'; ?>
                </div>
            </div>
            <?php include 'form\bottombar.php'; ?>
        </div>
    </div>
</body>

</html>