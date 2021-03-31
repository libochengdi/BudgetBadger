/**
 * load.js populates popup.html by getting the stored data from local storage
 * @author Benjamin Sheth
 */
chrome.storage.local.get(["items"], function(object) {
    var history = object.items; // history is an array of objects which contain the urls of sites
                                // you have visited and the time in milliseconds since Jan 1, 
                                // 1970 00:00:00.000 GMT when it was visited
    var count = 0;
    var domains = new Array(5);
    var viewtime = new Array(5);

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
            
            domains[count] = history[i].url;
            viewtime[count] = time;
            count++;

            var textNode = document.createTextNode(url);
            var node = document.createElement("LI");
            node.appendChild(textNode);
            document.getElementById("myList").appendChild(node);

        }
       
        // 

        //,https://www.gamersky.com/,
        // chrome://newtab/,
        // https://twitter.com/EliGE/status/1376956997942325250,
        // https://www.google.com/search?q=can+javascript+do+continue&rlz=1C5CHFA_enUS870US870&oq=can+javascript+do+continue&aqs=chrome..69i57j0l3j0i22i30l6.4113j0j4&sourceid=chrome&ie=UTF-8
        
        // Calculate longest viewed domain part
        // https://www.domain.com
        var newdomains = new Array();
        var newviewtime = new Array();
        // newdomains[0] = domains[0];
        // newviewtime[0] = viewtime[0];

        for (i = 0; i < domains.length; i++) {
            if (domains[i].contains("chrome://newtab/")) {
                continue;
            }

            var domainname = domains[i].split(".")[1];

            if (newdomains.includes(domainname)) {
                newviewtime[newdomains.indexOf(domainname)] += viewtime[i];
            } else {
                newdomains[i] = domainname;
                newviewtime[i] = viewtime[i];
            }

        } // Now we should have an array with each domain and view time

        document.getElementById("domainArr").innerHTML = newdomains;
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

