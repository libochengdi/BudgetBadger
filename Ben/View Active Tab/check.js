chrome.tabs.onActivated.addListener(function() {
    chrome.tabs.query({
        'active': true
    },
    function(tabs) {
        var url = tabs[0].url;
        var textNode = document.createTextNode(url);
        var node = document.createElement("LI");
        node.appendChild(textNode);
        document.getElementById("myList").appendChild(node);
    });
});