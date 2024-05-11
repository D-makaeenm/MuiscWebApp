<div id="bottom_bar">
    <div class="flex-container ctn_bottom_bar">
        <div id="img_thmp_bottom_bar">
            <img id="img_thmp_in_bottom_bar" src="image\img_thumpnail.jpg" alt="">
        </div>
        <div id="value_thmp_bottom_bar">
            <p id="tenbaihat">Tên bài hát</p>
            <p id="tacgia">tác giả</p>
        </div>
        <div id="add_playlist_bottom_bar">
            <i id="btn_add_playlist" class="fa-solid fa-heart"></i>
        </div>
    </div>
    <div id="audio">
        <div id="audio_btn">
            <div id="prev_btn"><i class="fa-solid fa-backward"></i></div>
            <div id="play_btn"><i class="fa-regular fa-circle-play"></i></div>
            <div id="pause_btn"><i class="fa-solid fa-pause"></i></div>
            <div id="next_btn"><i class="fa-solid fa-forward"></i></div>
            <script src="script\run_audio.js"></script>
        </div>
        <div id="seekBar_audio">
            <p id="currentTime">0:00</p>
            <input type="range" id="seekBar" min="0" value="0">
            <p id="duration"></p>
        </div>
        <script src="script\seekbar.js"></script>
        <audio id="audio1" controls>
            <source src="">
            </source>
        </audio>
    </div>
    <div id="volume">
        <i class="fa-solid fa-volume-high"></i>
        <input type="range" id="slider1" min="0" max="100" value="100"></input>
        <script src="script\volume.js"></script>
    </div>
</div>