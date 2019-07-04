
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".vid-container video");
    
    //sounds
    const sounds = document.querySelectorAll(".sound-picker button");
    const timeSelect = document.querySelectorAll(".time-select button")
  
    

    //timeDisplay 
    const timeDisplay = document.querySelector(".time-display");

    //Get the Length of the Circle
    const outlineLength = outline.getTotalLength();


    //Duration 
    let fakeDuration = 600;
    outline.style.strokeDashoffset = outlineLength;
    outline.style.strokeDasharray = outlineLength;


    //play Sound
    play.addEventListener("click", () => {
        checkPlaying(song);
    })
    
    timeSelect.forEach(option => {
        option.addEventListener("click", function(){
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`
        })
    })

    //create a function specific to stop and play the sounds
    const checkPlaying = song => {
        if(song.paused){
           song.play();
           video.play();
           play.src = "./svg/pause.svg" 
        }
        else{
            song.pause();
            video.pause();
            play.src = "./svg/play.svg"
        }
    };
    // We can animated the circle
    song.ontimeupdate = function() {
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);
        timeDisplay.textContent = `${minutes}:${seconds}`;
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
      
        if (currentTime >= fakeDuration) {
          song.pause();
          song.currentTime = 0;
          play.src = "./svg/play.svg";
          video.pause();
        }

};







