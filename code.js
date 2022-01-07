var is_playing = false
var there_afile = false
var sliderng = false
var audio = document.getElementById("audio_id");
var file = document.getElementById("audio_file");
var file_picker = document.getElementById('file_picker');
var play_button = document.getElementById('play');
var mute = document.getElementById('mute')
var slider = document.getElementById('myBar');
var volume = document.getElementById('mute_bar')
slider.addEventListener("mousedown" , function(clicked) {sliderng = true;seek(event);});
slider.addEventListener("mouseup" , function(clicked) {sliderng = false;seek(event);});
slider.addEventListener("mousemove" , function(clicked) {seek(event);})
mute_bar.addEventListener("mousemove" , setvolume)



var now_src = audio.currentSrc
var now_url = "127.0.0.1:5500"

var c_time = document.getElementById("c_time");
var full_time = document.getElementById("fulltime");



var toHHMMSS = (secs) => {
  var sec_num = parseInt(secs, 10)
  var hours   = Math.floor(sec_num / 3600)
  var minutes = Math.floor(sec_num / 60) % 60
  var seconds = sec_num % 60

  return [hours,minutes,seconds]
      .map(v => v < 10 ? "0" + v : v)
      .filter((v,i) => v !== "00" || i > 0)
      .join(":")
}

var URL = window.URL || window.webkitURL
///////////////////////////////////////////
///////////////////////////////////////////
function toggle_play(){
    if(is_playing == true && there_afile == true){ 
            audio.pause();

            is_playing = false;
            play_button.style.cssText = "background:url('logo and icon for music/play-button.png') no-repeat; background-position: 6px 3.7px; background-size: 0.7cm";
            //"background:url('logo and icon for music/play-button.png') no-repeat; background-position: 6px 3px; background-size: 0.7cm"
            console.log(is_playing)
           
}
    else if(is_playing == false && there_afile == true){
        
            audio.play();
            is_playing = true;
            play_button.style.cssText = "background:url('logo and icon for music/pause-button.png') no-repeat; background-position: 2px 2.5px; background-size: 0.8cm"
            //background:url('logo and icon for music/pause-button.png') no-repeat; background-position: 2px 2.5px; background-size: 0.8cm
            console.log(is_playing)
            
    }
    
}
////////////////////////////////////////////
const fileSelector = document.getElementById('file_picker');
fileSelector.addEventListener('change', (event) => {
  var file = file_picker.files[0];
  const fileURL = URL.createObjectURL(file)

  alert("file:louded");
  document.getElementById("audio_file").src=fileURL;
  //const audio = new Audio('Oraoraora.mp3');
  audio.load();
  there_afile = true
  is_playing = false
  full_time.innerHTML = toHHMMSS(audio.duration)
});
/////////////////////////////////////////////
audio.onended = function() {
  is_playing = false;
  play_button.style.cssText = "background:url('logo and icon for music/play-button.png') no-repeat; background-position: 6px 3.7px; background-size: 0.7cm";
}
/////////////////////////////////////////////
//debuging state
function debug(){  
  
  console.log(audio.duration);
  alert(audio.volume)}
  setInterval(
  function repeat(){
    

  c_time.innerHTML = toHHMMSS(audio.currentTime);
  if(there_afile == true){
    full_time.innerHTML = toHHMMSS(audio.duration)}

},1);

  var per = audio.currentTime/audio.duration*100
  //document.getElementById('myBar').value = per
////////////////////////////////////////////////
function setvolume() {
audio.volume = volume.value /100;
if(audio.muted == false){
  if(audio.volume == 0.0)
  {
    mute.style.cssText = "background: url('logo and icon for music/mute.png') no-repeat;background-size: 90% 90%;background-position: 0ex 0.2ex;"
  }
  else if(audio.volume >= 0.0 && audio.volume < 0.5){
    mute.style.cssText = "background: url('logo and icon for music/low val.png') no-repeat;background-size: 90% 90%;background-position: 0ex 0.2ex;"
  }
  else if(audio.volume >= 0.5){
    mute.style.cssText = "background: url('logo and icon for music/high val.png') no-repeat;background-size: 90% 90%;background-position: 0ex 0.2ex;"
  }
}
}
function muted(){
  if(audio.muted == false){
  audio.muted = true
  mute.style.cssText = "background: url('logo and icon for music/mute.png') no-repeat;background-size: 90% 90%;background-position: 0ex 0.2ex;"
  }
  else{
    audio.muted = false
    setvolume();
  }
}
////////////////////////////////////////////////////
function seek (event){
  if(sliderng) {
      slider.value = event.clientX - slider.offsetLeft;
      var seekto = (slider.value / 100);
      audio.currentTime = seekto;
  }}