/**
 * load.js populates popup.html by getting the stored data from local storage
 * @author Benjamin Sheth
 */
chrome.storage.local.get(["items"], function(object) {
    var history = object.items; // history is an array of objects which contain the urls of sites
                                // you have visited and the time in milliseconds since Jan 1, 
                                // 1970 00:00:00.000 GMT when it was visited
    if (typeof(history) !== "undefined") {
        for (i = history.length - 6; i < history.length - 1; ++i) {
            
            var time1 = 0;
            var time2 = 0
            var time = 0;
            if (history.length > 1) {
                time1 = history[i].time;
                if (i+1 < history.length)
                time2 = history[i + 1].time;
                time = time2 - time1;
            }
            var timeMinSec = ":";
            if (time > 0)
                timeMinSec = msConversion(time);
            //console.log(typeof history[i]);
            var url = "URL: " + history[i].url + " Time: " + timeMinSec;
            var textNode = document.createTextNode(url);
            var node = document.createElement("LI");
            node.appendChild(textNode);
            document.getElementById("myList").appendChild(node);
        }
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

