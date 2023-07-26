let now_playing = document.querySelector('.now-playing');
let track_name = document.querySelector('.track-name');
let track_artist = document.querySelector('.track-artist');
let imgPlayer = document.querySelector('.img_player');
let MusicPlayer = document.querySelector('.music_player');
let BarLists = document.querySelector('.bar_lists');
let BarPlaylists = document.querySelector('.bar_Playlists');
let MenuPanel = document.querySelector('.menu_panel');
let Details = document.querySelector('.details');
let RecTracksBlock = document.querySelector('.rec_tracks_block');
let FilterBarPlay = document.querySelector('.filter_bar_play');
let FilterBarPlayLists = document.querySelector('.filter_bar_lists');
let Title = document.querySelector('title');
let PageMusicLists = document.createElement('div');
let ParentPageMusicLists = document.getElementById('Parent_PageMusicLists');
let ScrollBox = document.querySelector('.scroll_box');

let playpause_btn = document.querySelector('.playpause-track');
let next_btn = document.querySelector('.next-track');
let prev_btn = document.querySelector('.prev-track');

let seek_silder = document.querySelector('.seek_slider');
let volume_slider = document.getElementById('volumeSlider');
let curr_time = document.querySelector('.current-time');
let total_duration = document.querySelector('.total-duration');
let randomIcon = document.querySelector('.fa-random');
let curr_track = document.createElement('audio');

let track_index = 0;
let isPlaying = false;
let isRandom = false;
let updateTimer;

let music_list = [
   {
      playlist_id: 1,
      img : 'https://i.scdn.co/image/ab67616d00001e0264031e8a5cde943b3ffdc543',
      name : 'MusiKar',
      artist : 'Plase Tap',
      music : '../Musics/JANAGA_-_odinoka-luna.mp3'
   },
];
function loadTrack(track_index){
   clearInterval(updateTimer);
   reset();

   curr_track.src = music_list[track_index].music;
   curr_track.load();

   BarPlaylists.style.backgroundImage = "url(" + music_list[track_index].img + ")";
   imgPlayer.src = music_list[track_index].img;
   MobileTrackImg.src = music_list[track_index].img;
   track_name.textContent = music_list[track_index].name;
   MobileTrackName.textContent = music_list[track_index].name;
   MobileTrackArtist.textContent = music_list[track_index].artist;
   track_artist.textContent = music_list[track_index].artist;
   updateTimer = setInterval(setUpdate, 1000);
}
loadTrack(track_index);

function reset(){
   curr_time.textContent = "00:00";
   MobileCurrentTime.textContent = "00:00"
   total_duration.textContent = "00:00";
   MobileTotalDuration.textContent = "00:00";
   seek_silder.value = 0;
   MobileSeekSilder.value = 0;
}
function randomTrack(){
   isRandom ? pauseRandom() : playRandom();
}
function playRandom(){
   isRandom = true;
   randomIcon.classList.add('randomActive');
}
function pauseRandom(){
   isRandom = false;
   randomIcon.classList.remove('randomActive');
}
function repeatTrack(){
   let current_index = track_index;
   loadTrack(current_index);
   playTrack();
}
function playpauseTrack(){
   isPlaying ? pauseTrack() : playTrack();
}
function playTrack(){
   curr_track.play();
   isPlaying = true;
   imgPlayer.style.opacity = ('1');
   MobileTrackImg.style.opacity = ('1');
   Title.textContent = music_list[track_index].artist + " • " + music_list[track_index].name;
   playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
   MobilePlayPauseBtn.innerHTML = '<i class="fa fa-pause-circle fa-2x"></i>';
}
let imageGif = document.getElementById('img_gif');
function pauseTrack(){
   curr_track.pause();
   isPlaying = false;
   imgPlayer.style.opacity = ('.4');
   MobileTrackImg.style.opacity = ('.4');
   playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
   MobilePlayPauseBtn.innerHTML = '<i class="fa fa-play-circle fa-2x"></i>';
   Title.textContent = "MusiKar - Music Player";
   for(var i = 0; i < ImgaeGifs.length; i++){
      ImgaeGifs[i].innerHTML = "";
   }
   for(var i = 0; i < buttons.length; i++){
      buttons[i].innerHTML = "<i class='fa fa-play'></i>";
   }
   let FilterImagesPlaylists2 = document.getElementsByClassName("filter_images_playlists");
   for(var i = 0; i < FilterImagesPlaylists2.length; i++){
      FilterImagesPlaylists2[i].classList.remove('filter_images_playlists_play');
   }
}
function nextTrack(){
   if (track_index < music_list.length - 1 && isRandom === false) {
      track_index += 1;
   } else if (track_index < music_list.length - 1 && isRandom === true) {
      let random_index = Number.parseInt(Math.random() * music_list.length);
      track_index = random_index;
   } else {
      track_index = 0;
   }
   loadTrack(track_index);
   playTrack();
}
function prevTrack(){
   if(track_index > 0){
      track_index -= 1;
   }else{
      track_index = music_list.length -1;
   }
   loadTrack(track_index);
   playTrack();
}

function seekTo(){
   let sekkto = curr_track.duration * (seek_silder.value / 100);
   let sekktoMobile = curr_track.duration * (MobileSeekSilder.value / 100);
   curr_track.currentTime = sekkto;
   function myFunction(x) {
      if (x.matches) { // If media query matches
         curr_track.currentTime = sekktoMobile;
      } else {
         curr_track.currentTime = sekkto;
      }
   }
   
   var x = window.matchMedia("(max-width: 600px)")
   myFunction(x) // Call listener function at run time
   x.addListener(myFunction) // Attach listener function on state changes
}
function setVolume(){
   curr_track.volume = volume_slider.value / 100;
   function myFunction(x) {
      if (x.matches) { // If media query matches
         curr_track.volume = MobileVolumeSilder.value / 100;
      } else {
         curr_track.volume = volume_slider.value / 100;
      }
   }
   
   var x = window.matchMedia("(max-width: 600px)")
   myFunction(x) // Call listener function at run time
   x.addListener(myFunction) // Attach listener function on state changes
}
document.addEventListener('keyup', event => {
  if (event.code === 'Space') {
   if(isPlaying) {
      pauseTrack();
   } else {
      playTrack();
   }
 }
 })
function setUpdate(){
   let seekPosition = 0;
   let seekPosition2 = 0;
   if(!isNaN(curr_track.duration)){
      seekPosition = curr_track.currentTime * (100 / curr_track.duration);
      seek_silder.value = seekPosition;
      if(seekPosition == 100){
         nextTrack();
      }
      let currentMinutes = Math.floor(curr_track.currentTime / 60);
      let currSecunds = Math.floor(curr_track.currentTime - currentMinutes * 60);
      let durationMinutes = Math.floor(curr_track.duration / 60);
      let durationSecunds = Math.floor(curr_track.duration - durationMinutes * 60);

      if(currSecunds < 10) {currSecunds = "0" + currSecunds; }
      if(durationSecunds < 10){ durationSecunds = "0" + durationSecunds; }
      if(currentMinutes < 10){ currentMinutes = "0" + currentMinutes; }
      if(durationMinutes < 10){durationMinutes = "0" + durationMinutes; }

      curr_time.textContent = currentMinutes + ":" + currSecunds;
      MobileCurrentTime.textContent = currentMinutes + ":" + currSecunds;
      total_duration.textContent = durationMinutes + ":" + durationSecunds;
      MobileTotalDuration.textContent = durationMinutes + ":" + durationSecunds;
   }
}

//dominat color

function getAverageColor(imageElement, ratio) {
   const canvas = document.createElement("canvas")

   let height = canvas.height = imageElement.naturalHeight
   let Width = canvas.width = imageElement.naturalWidth 

   const context = canvas.getContext("2d")
   context.drawImage(imageElement, 0, 0)

   let data, length
   let i = -4, count = 0

   try {
      data = context.getImageData(0,0,Width,height)
      length = data.data.length
   } catch (err) {
      console.error(err)
      return {
          R: 0,
          G: 0,
          B: 0
      }
   }
   let R,G,B
   R = G = B = 0

   while((i += ratio * 4) < length){
      ++count

      R += data.data[i]
      G += data.data[i + 1]
      B += data.data[i + 2]
   }

   R = ~~(R / count)
   G = ~~(G / count)
   B = ~~(B / count)

   return {
       R, G, B 
   }
}
imgPlayer.onload = ()=>{
   const {R, G, B} = getAverageColor(imgPlayer, 4)
   let dominatColor = `rgb(${R}, ${G}, ${B})`
   MusicPlayer.style.background = dominatColor;
   MusicPlayer.style.transition = ('1s');
   BarLists.style.background = dominatColor;
   MenuPanel.style.background = dominatColor;
   MenuPanel.style.transition = ('1s');
   PageMusicLists.style.background = dominatColor;
}

// right click menu

const rightClickMenu = document.getElementById("right-click-menu");
const rightClickTrigger = document.getElementById("right-click-trigger");

document.addEventListener("contextmenu", function(event) {
  event.preventDefault();
  rightClickMenu.style.left = event.clientX + "px";
  rightClickMenu.style.top = event.clientY + "px";
  rightClickMenu.style.display = "block";
});

document.addEventListener("click", function(event) {
  if (event.target !== rightClickMenu && event.target !== rightClickTrigger) {
   rightClickMenu.style.display = "none";
  }
});

const menuOptions = document.querySelectorAll(".menu-option");
for (let i = 0; i < menuOptions.length; i++) {
  menuOptions[i].addEventListener("click", function(event) {
   console.log("Option " + (i+1) + " clicked");
   rightClickMenu.style.display = "none";
  });
}

// Warch all Playlists

var watchAllPlaylists = document.getElementById('playlists_block');
var watchAllPlaylistsText = document.querySelector('.Watch_all_playlist');

var x = 1;
function WatchAllPlayLists() {
   if (x == 0) {
      watchAllPlaylists.classList.add('rec_tracks_block');
      watchAllPlaylists.classList.remove('rec_tracks_block_watchAll');
      watchAllPlaylistsText.textContent = 'Watch All';
      x = 1;
   } else {
      watchAllPlaylists.classList.remove('rec_tracks_block');
      watchAllPlaylists.classList.add('rec_tracks_block_watchAll');
      watchAllPlaylistsText.textContent = 'Close';
      x = 0
   }
}


// drag scroll

const slider1 = document.querySelector('.rec_tracks_block');
let isDown1 = false;
let startX1;
let scrollLeft1;

slider1.addEventListener('mousedown', (e) => {
  isDown1 = true;
  startX1 = e.pageX - slider1.offsetLeft;
  scrollLeft1 = slider1.scrollLeft
});
slider1.addEventListener('mouseleave', () => {
  isDown1 = false;
});
slider1.addEventListener('mouseup', () => {
  isDown1 = false;
});
slider1.addEventListener('mousemove', (e) => {
  if(!isDown1) return;
  e.preventDefault();
  const x = e.pageX - slider1.offsetLeft;
  const walk = (x - startX1) * 1.5;
  slider1.scrollLeft = scrollLeft1 - walk;
});

const slider = document.querySelector('.rec_tracks_block2');
let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - slider.offsetLeft;
  scrollLeft = slider.scrollLeft;
});
slider.addEventListener('mouseleave', () => {
  isDown = false;
});
slider.addEventListener('mouseup', () => {
  isDown = false;
});
slider.addEventListener('mousemove', (e) => {
  if(!isDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const walk = (x - startX) * 1.5;
  slider.scrollLeft = scrollLeft - walk;
});

let PlaylistName = document.querySelector('.playlist_name');
let ImageRecTracks = document.querySelector('.image_rec_tracks');
let PlaypauseTrackPlaylist = document.querySelector('.playpauseTrack_playlist');
let TrackRec = document.querySelector('.rec_tracks_block');
let FilterImagesPlaylists = document.querySelector('.filter_images_playlists');
let GifPlaylist = document.querySelector('.gif_playlist');

let track_index_playlist = 0;

function createPlaylists() {
   for (let i = 0; i < playlists.length; i++) {
      let AddPlaylist = document.createElement("div");
      AddPlaylist.classList.add('track_rec');
      TrackRec.appendChild(AddPlaylist);
      let ImagesPlaylist = document.createElement("div");
      ImagesPlaylist.classList.add('images_Playlist');
      AddPlaylist.appendChild(ImagesPlaylist);
      let PlaylistImgFilt = document.createElement("div");
      PlaylistImgFilt.classList.add('filter_images_playlists');
      ImagesPlaylist.appendChild(PlaylistImgFilt);
      let PlaylistName = document.createElement("h2");
      PlaylistName.classList.add('playlist_name');
      let PlaylistGif = document.createElement("div");
      PlaylistGif.classList.add('gif_playlist');
      PlaylistImgFilt.appendChild(PlaylistGif);
      PlaylistImgFilt.appendChild(PlaylistName);
      let ChlicToMusicLists = document.createElement('div');
      PlaylistImgFilt.appendChild(ChlicToMusicLists);
      ChlicToMusicLists.classList.add('ChlicToMusicLists');
      ChlicToMusicLists.addEventListener("click", eventFunc);
      function eventFunc() {
         ParentPageMusicLists.appendChild(PageMusicLists);
         PageMusicLists.classList.add('PageMusicList');
         createMusicLists(i);
      }
      PlaylistName.innerHTML = playlists[i].playlist_name;
      let Image1Playlist = document.createElement("img");
      Image1Playlist.classList.add('image1_rec_track');
      ImagesPlaylist.appendChild(Image1Playlist);
      let Image2Playlist = document.createElement("img");
      Image2Playlist.classList.add('image2_rec_track');
      ImagesPlaylist.appendChild(Image2Playlist);
      let Image3Playlist = document.createElement("img");
      Image3Playlist.classList.add('image3_rec_track');
      ImagesPlaylist.appendChild(Image3Playlist);
      let Image4Playlist = document.createElement("img");
      Image4Playlist.classList.add('image4_rec_track');
      ImagesPlaylist.appendChild(Image4Playlist);
      let PlaylistPlayPausButton = document.createElement("div");
      PlaylistImgFilt.appendChild(PlaylistPlayPausButton);
      PlaylistPlayPausButton.innerHTML = '<div class="playlist_button playpauseTrack_playlist"><i class="fa fa-play PlaylistPausIcon"></i></div>';
      PlaylistPlayPausButton.addEventListener('click', () => playpauseTrack_playlist(i))
      Image1Playlist.src = '../Images/diskLoadImage.png';
      Image2Playlist.src = '../Images/diskLoadImage.png';
      Image3Playlist.src = '../Images/diskLoadImage.png';
      Image4Playlist.src = '../Images/diskLoadImage.png';
      Image1Playlist.src = playlists[i].playlist_tracks[track_index = 0].img;
      Image2Playlist.src = playlists[i].playlist_tracks[track_index = 1].img;
      Image3Playlist.src = playlists[i].playlist_tracks[track_index = 2].img;
      Image4Playlist.src = playlists[i].playlist_tracks[track_index = 3].img;
   }
}
function createMusicLists(index) {
   let backMusicPlaylsits = document.createElement('div');
   PageMusicLists.appendChild(backMusicPlaylsits);
   backMusicPlaylsits.classList.add('backMusicLists');
   backMusicPlaylsits.addEventListener("click", closePageMusicList);

   let NamePlaylist = document.createElement('h2');
   PageMusicLists.appendChild(NamePlaylist);
   NamePlaylist.classList.add('TextPlaylistNameMusicLists');

   NamePlaylist.textContent = playlists[index].playlist_name;
   for (let j = 0; j < playlists[0].playlist_tracks.length; j++) {
      var MusicList = document.createElement('div');
      PageMusicLists.appendChild(MusicList);
      MusicList.classList.add('music_list');
      var MusicListNameMus = document.createElement('p');
      MusicList.appendChild(MusicListNameMus);
      MusicList.textContent = playlists[index].playlist_tracks[j].name;
       var MusicListImg = document.createElement('img');
      MusicList.appendChild(MusicListImg);
      MusicListImg.src = playlists[index].playlist_tracks[j].img;
      MusicListImg.classList.add('MusicListsImg');
   }
   function closePageMusicList() {
      PageMusicLists.removeChild(backMusicPlaylsits);
      ParentPageMusicLists.removeChild(PageMusicLists);
      PageMusicLists.removeChild(NamePlaylist);
      for (let i = 0; i < playlists[index].playlist_tracks.length; i++) {
         PageMusicLists.removeChild(PageMusicLists.firstElementChild);
      }
   }
}
function playpauseTrack_playlist(position){
   var buttons = document.getElementsByClassName("playlist_button");
   for(var i = 0; i < buttons.length; i++){
      buttons[i].innerHTML = "<i class='fa fa-play'></i>";
   }
   var ImgaeGifs = document.getElementsByClassName("gif_playlist");
   for(var i = 0; i < ImgaeGifs.length; i++){
      ImgaeGifs[i].innerHTML = "";
   }
   let FilterImagesPlaylists2 = document.getElementsByClassName("filter_images_playlists");
   for(var i = 0; i < FilterImagesPlaylists2.length; i++){
      FilterImagesPlaylists2[i].classList.remove('filter_images_playlists_play');
   }
   isPlaying ? pauseTrack_playlist() : playTrack_playlist(position);
}

let PlaylistButton = document.querySelector('.playlist_button');
var ImgaeGifs = document.getElementsByClassName("gif_playlist");
var buttons = document.getElementsByClassName("playlist_button");
let FilterImagesPlaylists2 = document.getElementsByClassName("filter_images_playlists");

function  playTrack_playlist(position){
   buttons[position].innerHTML = '<i class="fa fa-pause"></i>';
   ImgaeGifs[position].innerHTML = '<img src="../Images/now_playing_track.gif" class="gif_image_playlist" alt="This is Gif">';
   FilterImagesPlaylists2[position].classList.add('filter_images_playlists_play');
   track_index = track_index_playlist;
   music_list = playlists[position].playlist_tracks;
   loadTrack(track_index);
   playTrack();
}

function pauseTrack_playlist(){
   pauseTrack();
}

let ArtirsIndex = 0;

let TrackRec2 = document.querySelector('.rec_tracks_block2');

function CreateArtistsImgBlock() {
   for(let i = 0; i < artistsImages.length; i++){
      let ArtImgBlock = document.createElement("div");
      ArtImgBlock.classList.add('ArtistImg_Block');
      TrackRec2.appendChild(ArtImgBlock);
      let ArtImg = document.createElement("img");
      ArtImg.classList.add('artist_img');
      ArtImg.src = '../Images/diskLoadImage.png';
      ArtImgBlock.appendChild(ArtImg);
      let ArtName = document.createElement("h2");
      ArtName.classList.add('artist_name');
      ArtName.innerHTML = "Artist Name";
      ArtImgBlock.appendChild(ArtName);
      ArtName.textContent = artistsImages[i].artist_name;
      ArtImg.src = artistsImages[i].artist_img;
   }
}
let ValuseControlMobile = document.querySelector('.volume_slider-mobile');
function ChlickValueControl() {
   if (x == 0) {
      ValuseControlMobile.style.display = 'none';
      x = 1;
   } else {
      ValuseControlMobile.style.display = 'inline-block';
      x = 0
   }
}

setInterval(() => {
   ScrollBox.style.height = window.innerHeight - 129 + 'px';
   FilterBarPlayLists.style.height = window.innerHeight - 100 + 'px';
   if (this.innerWidth > 996) {
      ScrollBox.style.height = window.innerHeight - 136 + 'px';
   }
   if (this.innerWidth <= 996) {
      ScrollBox.style.height = window.innerHeight - 130 + 'px';
      FilterBarPlayLists.style.height = window.innerHeight - 100 + 'px';
   }
   if (this.innerWidth <= 600) {
      ScrollBox.style.height = window.innerHeight - 147 + 'px';
   }
   if (this.innerWidth <= 444) {
      ScrollBox.style.height = window.innerHeight - 134 + 'px';
   }
}, 10);