chrome.tabs.onActivated.addListener(function() {
    chrome.tabs.query({
        'active': true
    },
    function(tabs) {
        var url = tabs[0].url;
        // TODO add the url to local storage so that viewer.html can access it
        var textNode = document.createTextNode(url);
        var node = document.createElement("LI");
        node.appendChild(textNode);
        document.getElementById("myList").appendChild(node);
    });
});