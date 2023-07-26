let MobileTrackName = document.querySelector('.track-name-mobile');
let MobileTrackArtist = document.querySelector('.track-artist-mobile');
let MobileTrackImg = document.querySelector('.img_player-mobile');
let MobileCurrentTime = document.querySelector('.current-time-Mobile');
let MobileTotalDuration = document.querySelector('.total-duration-Mobile');
let MobileSeekSilder = document.querySelector('.seek_slider-Mobile');
let MobilePlayPauseBtn = document.querySelector('.playpause-track-mobile');
let MobileVolumeSilder = document.querySelector('.volume_slider-mobile');
let MobileButtons = document.querySelector('.buttons-Mobile');
let MobileSilderContainer = document.querySelector('.slider_container-mobile');
let MobileRepat = document.querySelector('.repeat-track-mobile');
let MobileRandom = document.querySelector('.random-track-mobile');
let BackMusicPlayerMobileParent = document.querySelector('.back_music_playerMobileParent');

let openMusicPageMobile = document.querySelector('.text_details_music-Mobile');
let MusicInformMobile = document.querySelector('.music_inform-mobile');
let MobileDetailsBlock = document.querySelector('.details-mobile');
let MusicInformMobileImg = document.querySelector('.img_player-mobile');
let DetailsBlock = document.querySelector('.details-block');
openMusicPageMobile.addEventListener("click", openMusicPlayerMobile);

let test = 0;

function openMusicPlayerMobile() {
   test++;
   MusicInformMobile.classList.add('openMusicPlayerMobile');
   MusicInformMobileImg.classList.add('openMusicPlayerMobileImg');
   openMusicPageMobile.style.width = '100%';
   MobileTrackName.style.fontSize = '30px';
   MobileButtons.style.marginBottom = '30px';
   setInterval(() => {
      MusicInformMobile.style.height = window.innerHeight - 230 + 'px';   
   }, 10);
   openMusicPageMobile.style.margin = '30px 0';
   MobileTrackArtist.style.fontSize = '20px';
   MobileDetailsBlock.style.flexDirection = 'column';
   MobileDetailsBlock.style.width = '100%';
   MobileSilderContainer.style.marginBottom = '20px';
   MobileSilderContainer.style.display = 'flex';
   MobileRepat.style.display = 'block';
   MobileRandom.style.display = 'block';
   DetailsBlock.style.width = '100%';
   DetailsBlock.style.flexDirection = 'column';
   MobileDetailsBlock.style.position = 'relative';
   let BackMusicPlayerMobile = document.createElement('div');
   BackMusicPlayerMobileParent.appendChild(BackMusicPlayerMobile);
   BackMusicPlayerMobile.classList.add('back_music_playerMobile');
   BackMusicPlayerMobile.innerHTML = '<i class="fa fa-angle-down"></i>';
   BackMusicPlayerMobile.addEventListener("click", CloseMusicPageMobile);
   function CloseMusicPageMobile() {
      MusicInformMobile.classList.remove('openMusicPlayerMobile');
      MusicInformMobileImg.classList.remove('openMusicPlayerMobileImg');
      MusicInformMobile.classList.add('closeMusicPlayerMobile');
      openMusicPageMobile.style.width = '50%';
      MobileTrackName.style.fontSize = '20px';
      MobileButtons.style.marginBottom = '0';
      openMusicPageMobile.style.margin = '0 10px';
      MobileTrackArtist.style.fontSize = '18px';
      MobileDetailsBlock.style.flexDirection = 'row';
      MobileDetailsBlock.style.width = '50%';
      MobileSilderContainer.style.display = 'none';
      MobileRepat.style.display = 'none';
      MobileRandom.style.display = 'none';
      DetailsBlock.style.flexDirection = 'row';
      MobileDetailsBlock.style.position = 'absolute';
      BackMusicPlayerMobileParent.removeChild(BackMusicPlayerMobile);
   }
}