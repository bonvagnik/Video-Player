// get all elements
const player= document.querySelector('.player');

const video= player.querySelector('.viewer');
const progress= player.querySelector('.progress');
const progressBar= player.querySelector('.progress__filled');
const toggle= player.querySelector('.toggle');

const skipButtons= player.querySelectorAll('[data-skip]');
const ranges= player.querySelectorAll('.player__slider');


// functions

function togglePlay() // toggle plsy/pause when called
{
    if(video.paused)
        video.play();
    else
        video.pause();
} 

function updateButton()
{
    const icon= video.paused ? '►' : '❚ ❚';    // changes button icon according to play/pause condition
    toggle.textContent=icon;
}

function skip()
{
    video.currentTime += parseFloat(this.dataset.skip); //adds or removes required time from the video 
}

function rangeHandler()
{
    video[this.name]= this.value; // video property of volume/speed is updated to the selected value
}

function progressHandler()
{
    const percent = (video.currentTime/video.duration) * 100; //calculates the % of video completed
    progressBar.style.flexBasis= `${percent}%`; // fills up the relative % space
}

function scrub (e)
{
    const scrubTime= (e.offsetX/ progress.offsetWidth) * video.duration; // the time at which the progress bar is clicked
    video.currentTime= scrubTime;
}

// event listeners

video.addEventListener('click',togglePlay); //play/pause when clicked on video window
toggle.addEventListener('click',togglePlay); //play/pause when clicked on toggle button

video.addEventListener('play',updateButton); // change play/pause toggle button 
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',progressHandler);

skipButtons.forEach(button => button.addEventListener('click',skip)); // skips on being clicked

ranges.forEach(range=> range.addEventListener('change',rangeHandler));

progress.addEventListener('click',scrub);