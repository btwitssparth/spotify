console.log("Lets do js");
let currenstsong= new Audio();


function formatSeconds(seconds) {
    // Ensure we only use whole seconds
    seconds = Math.floor(seconds);

    let mins = Math.floor(seconds / 60);
    let secs = seconds % 60;

    // Pad seconds to always have 2 digits
    secs = secs < 10 ? '0' + secs : secs;

    return `${mins}:${secs}`;
}




async function getsongs() {
    let a = await fetch("http://127.0.0.1:5500/songs/");
    let response = await a.text(); // ✅ await here
    console.log(response);

    let div = document.createElement("div");
    div.innerHTML = response;

    let as = div.getElementsByTagName("a");
    let songs = [];

    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
        }
    }


    return songs;
}

const playmusic=(track,pause=false)=>{
//   let audio= new Audio("/songs/" + track)
//   audio.play();



currenstsong.src="/songs/"+track;
if (!pause) {
    currenstsong.play();
    play.src="pause.svg";
}

document.querySelector(".songinfo").innerHTML=decodeURI(track);
document.querySelector(".song-time").innerHTML="00:00";
}



async function main(params) {

    let songs = await getsongs()
    playmusic(songs[0],true);
    console.log(songs)
    let songul = document.querySelector(".songlist").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songul.innerHTML = songul.innerHTML + `<li> <img class="invert" src="music.svg" alt="">
                        <div class="info">
                            <div> ${song.replaceAll("%20", " ")}</div>
                            <div>Parth</div>
                        </div>
                        <div class="playnow">
                            <span>Play Now</span>
                        <img src="play.svg" alt="" class="invert">
                        </div>
                       </li>`
    }

    // var audio = new Audio(songs[0]);
    // audio.play();

    // audio.addEventListener("loadeddata", () => {
    //     console.log(audio.duration, audio.currentSrc, audio.currentTime)
    // })

    Array.from(document.querySelector(".songlist").getElementsByTagName("li")).forEach(e => {
        e.addEventListener("click", element => {
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playmusic(e.querySelector(".info").firstElementChild.innerHTML.trim());

        })
    })

    //Attacing an eventlistener to play pause next

    play.addEventListener("click",()=>{
        if (currenstsong.paused) {
            currenstsong.play();
            play.src="pause.svg";
        }

        else{
            currenstsong.pause();
            play.src="play.svg";
        }
    })

    currenstsong.addEventListener("timeupdate",()=>{
       
        document.querySelector(".song-time").innerHTML=`${formatSeconds(currenstsong.currentTime)}/${formatSeconds(currenstsong.duration)}`
         document.querySelector(".circle").style.left=(currenstsong.currentTime/currenstsong.duration)* 100 +"%";

         //seekbar

         
    })
    document.querySelector(".seekbar").addEventListener("click",e=>{
        let percent= (e.offsetX/e.target.getBoundingClientRect().width) * 100;
            document.querySelector(".circle").style.left = percent +"%";
                currenstsong.currentTime=((currenstsong.duration)* percent)/100;
         })

    //Adding a eventlistener to hamburger
    document.querySelector(".hamburger").addEventListener("click",()=>{
        document.querySelector(".left").style.left="0";
    })

     document.querySelector(".close").addEventListener("click",()=>{
        document.querySelector(".left").style.left="-120%";
    })

    previous.addEventListener("click",()=>{
        console.log("pehekla")

        
        let index=songs.indexOf(currenstsong.src.split("/").slice(-1)[0]);
        if((index-1)>=0){
            playmusic(songs[index-1])

        }



    })

    next.addEventListener("click",()=>{


        let index=songs.indexOf(currenstsong.src.split("/").slice(-1)[0]);
        if((index+1)<songs.length){
            playmusic(songs[index+1])

        }

    })
document.querySelector(".range").addEventListener("input", (e) => {
    currenstsong.volume = parseInt(e.target.value) / 100;
});


   


}
main();

