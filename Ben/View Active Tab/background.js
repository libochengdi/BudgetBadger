// Every time active tab is changed the url and time is saved
chrome.tabs.onActivated.addListener(function() {
    chrome.tabs.query({
        'active': true
    },
    function(tabs) {
        chrome.storage.local.get(["items"], function(object) {
            var history = object.items;

            var activeTab = {
                'url': tabs[0].url,
                'time': (new Date()).getTime()
            };
            if (typeof(history) === "undefined") {
                history = new Array();
            }
            history.push(activeTab);

            console.log(history);

            chrome.storage.local.set({items: history});
            history = null;
        });
    });
});