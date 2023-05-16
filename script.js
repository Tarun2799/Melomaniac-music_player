console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Warriyo - Mortals [NCS Release]", filePath: "songs/1.mp3", coverPath: "covers/1.jpg"},
    {songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg"},
    {songName: "DEAF KEV - Invincible [NCS Release]-320k", filePath: "songs/3.mp3", coverPath: "covers/3.jpg"},
    {songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg"},
    {songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg"},
    {songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg"},
    {songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg"},
    {songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg"},
    {songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg"},
    {songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg"},
]


// forEach leta hai ek call back function., here songItems.forEach is not a function so we use Array.from in front of LINE 10 in SONGITEM. kyuki ye HTML collection hai to ispr foe each in lagega.
songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    // yahan se songname ko change kiya hai CLASS ka USE KRKE span mai.
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    // for playing the audio
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        // changing the opacity of gif we use to 1, means we able to see it.
        gif.style.opacity = 1;
    }
    else{
        // for pusing the audio.
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        // changing the opacity of gif we use to 0, means we not able to see it.
        gif.style.opacity = 0;
    }
})
// Listen to Events
// we have to update the time in audio. 
audioElement.addEventListener('timeupdate', ()=>{ 
    // Update Seekbar
    //  kitna percent ye humari audio chal chuki hai humari audio, using parseint kyuki value integer mai chahiye, cuuretTime btayega jitne time par gana chal ra hai. WHOLE formula give us kitna % song chal chuka hai.
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100); 
    // isse progress bar mai progress set hojayegi or iski INTIAL VALUE KO "0" KAR diya html tag value="0", taki har bar zero se start ho new song k liye.
    myProgressBar.value = progress;
})

// SIMPLE MATHS FROM ABOVE
// 100x(CT)/DURATION = PERCENTAGE => CT = PERCENTAGE*DURATION/100, progresbar ko link kiya hai duration of song ks sath.
myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

// ye function chote button ko play bna dega 
const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

// 
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        // this function defined above => const makeAllPlays.
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        // yahan do line graphically small play button ko chnage kr rahi hai, pay and pause respectively. agar ek ko play kiya to dusra pause hojaye, but YE GRAPHCALLY KIYA HAI FUNCTION SE BAS.
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        // ye line songs ko change krri hai jab small play button press kre.
        audioElement.src = `songs/${songIndex+1}.mp3`;
        //  this changes SONG NAME IN BOTTOM PROGRESS BAR.
        masterSongName.innerText = songs[songIndex].songName;
        // time ko zero kiya, kyuki song change hua hai, from this => myProgressBar.addEventListener LINE 65.
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        // ye do line large play icon ko change krne k lie small vale k sath.
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

// koi bhi NEXT(ICON IN BOTTOM CONATINER) id par click kare to ye function RUN KARO.
document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    // i added this 
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

// koi bhi previous(ICON IN BOTTOM CONATINER) id par click kare to ye function RUN KARO.
document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    // i added this
    gif.style.opacity = 1;
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})


// NEED THIS ENHANCEMENTS
//1. Jab next ya previous kar de to small icons bhi next or previos change hone chahiye.YE LOGIC LIKHNA HAI ABHI.
// 2. TO PAUSE FROM SMALL PLAY ICON ALSO
// 3.JAB BIF ICON SE PLAY KARE TO SMALL ICON BHI PLAY HOTA DIKHE.
// 4. ISKO REPONSIVE BNANA HAI
// 5. HOW TO AUTOMATIC PLAY NEXT SONG. KONSE EVENT KO LISTEN KRKE AGLA SONG PLAY KRAYE.
// 6. FAV ICON NAHI DALA