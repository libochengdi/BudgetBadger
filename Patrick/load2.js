/**
 * load.js populates popup.html by getting the stored data from local storage
 * @author Benjamin Sheth
 */
chrome.storage.local.get(["items"], function(object) {
    var history = object.items; // history is an array of objects which contain the urls of sites
                                // you have visited and the time in milliseconds since Jan 1, 
                                // 1970 00:00:00.000 GMT when it was visited
    if (typeof (history) !== "undefined") {
        var timeLong = 1;
        var timeLongMinSec = ":";
        var historyLong = history[0].url;
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
            if (time > timeLong)
                timeLong = time;
            var timeMinSec = ":";
            if (time > 0)
                timeMinSec = msConversion(time);
            /*
            var url = "URL: " + history[i].url + " Time: " + timeMinSec;
            var textNode = document.createTextNode(url);
            var node = document.createElement("LI");
            node.appendChild(textNode);
            document.getElementById("myList").appendChild(node);
            */
        }
        timeLongMinSec = msConversion(timeLong);
        var url = "URL: " + historyLong + " Time: " + timeLongMinSec;
        var textNode = document.createTextNode(url);
        var node = document.createElement("LI");
        node.appendChild(textNode);
        document.getElementById("myList2").appendChild(node);
    }
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

