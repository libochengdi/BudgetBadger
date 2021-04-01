/**
 * load.js populates popup.html by getting the stored data from local storage
 * @author Benjamin Sheth, Patrick Merchant
 */
chrome.storage.local.get(["items"], function(object) {
    var history = object.items; // history is an array of objects which contain the urls of sites
                                // you have visited and the time in milliseconds since Jan 1, 
                                // 1970 00:00:00.000 GMT when it was visited
    if (typeof (history) !== "undefined") {
        var timeLong = 1;
        var timeLongMinSec = ":";
        var historyLong = history[0].url.trim();
        for (i = 0; i < history.length; ++i) {
            
            var time1 = 0;
            var time2 = 0
            var time = 0;
            if (history.length > 1) {
                time1 = history[i].time;
                if (i+1 < history.length)
                time2 = history[i + 1].time;
                time = time2 - time1;
            }
            if (time > timeLong) {
                timeLong = time;
                historyLong = history[i].url.trim();
            }
            var timeMinSec = ":";
            if (time > 0)
                timeMinSec = msConversion(time);
        }
        timeLongMinSec = msConversion(timeLong);
        var url = "URL: " + historyLong + " \nTime: " + timeLongMinSec;
        var textNode = document.createTextNode(url);
        var node = document.createElement("LI");
        node.appendChild(textNode);
        document.getElementById("myList2").appendChild(node);
    }
    
    /*
     * Converts time from milliseconds since Jan 1, 1970 00:00:00.000 GMT to min:sec.
     * Code used from Stackoverflow: 
     * https://stackoverflow.com/questions/21294302/converting-milliseconds-to-minutes-and-seconds-with-javascript
     */
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
});

