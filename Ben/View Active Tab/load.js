chrome.storage.local.get(["items"], function(object) {
    var history = object.items;
    for (i = 0; i < history.length; ++i) {
        var url = "URL: " + history[i].url + " Time: " + history[i].time;
        var textNode = document.createTextNode(url);
        var node = document.createElement("LI");
        node.appendChild(textNode);
        document.getElementById("myList").appendChild(node);
    }
});

