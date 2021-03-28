/**
 * timer.js is a simple javascript function which allows users to start a timer on the webpage with a button
 * 
 * My group mate Benjamin Sheth created the function msConversion. I did a little copy+paste from his code. Thank you Ben! ^^
 * 
 * @author Eric Li
 */

 // console.log("Test, test");

 let init = function() {
     let button = document.querySelector("#timerButton");
     let startTime = new Date();
     let lap = 0;

     if (button) {
        // TODO: Telling user how long they've been on browser before exiting
        window.addEventListener('beforeunload', function (e) {
            e.preventDefault();
            e.returnValue = 'return event.returnValue = "Are you sure you want to exit?";';
        });

         button.addEventListener("click", function() {
             let miliSeconds = new Date() - startTime;

             let message = "Lap " + lap + ": " + msConversion(miliSeconds);

             var timeMsg = document.createTextNode(message);
             var node = document.createElement("LI");
             node.appendChild(timeMsg);

             document.getElementById("stopwatchlist").appendChild(node);

             lap++;
             //console.log(timeMsg);
             //console.log(miliSeconds/1000 + "Seconds.")
         });
     }
 }

 document.addEventListener("DOMContentLoaded", function() {
    init(); }, false);

function msConversion(millis) {
    let sec = Math.floor(millis / 1000);
    let hrs = Math.floor(sec / 3600);
    sec -= hrs * 3600;
    let min = Math.floor(sec / 60);
    sec -= min * 60;

    sec = '' + sec;
    sec = ('00' + sec).substring(sec.length);

    if (hrs > 0) {
        min = '' + min;
        min = ('00' + min).substring(min.length);
        return hrs + ":" + min + ":" + sec;
    }
    else {
        return min + ":" + sec;
    }
}

