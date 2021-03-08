/**
 * load.js populates popup.html by getting the stored data from local storage
 * @author Benjamin Sheth
 */
chrome.storage.local.get(["items"], function(object) {
    var history = object.items; // history is an array of objects which contain the urls of sites
                                // you have visited and the time in milliseconds since Jan 1, 
                                // 1970 00:00:00.000 GMT when it was visited
    if (typeof(history) !== "undefined") {
        for (i = 0; i < history.length; ++i) {
            var url = "URL: " + history[i].url + " Time: " + history[i].time;
            var textNode = document.createTextNode(url);
            var node = document.createElement("LI");
            node.appendChild(textNode);
            document.getElementById("myList").appendChild(node);
        }
    }
});

