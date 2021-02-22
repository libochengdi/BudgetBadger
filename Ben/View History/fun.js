var oneWeekAgo = (new Date).getTime - 1000 * 60 * 60 * 24 * 7;

chrome.history.search({
    'text': '',
    'startTime': oneWeekAgo,
    'maxResults': 10
    },
function(historyItems) {
    for(var i = 0; i < historyItems.length; ++i) {
        var url = historyItems[i].url;
        var textnode = document.createTextNode(url);
        var node = document.createElement("LI");
        node.appendChild(textnode); 
        document.getElementById("myList").appendChild(node);
    }
});

