// Initialize button with user's preferred color
let changeColor = document.getElementById("changeColor");

chrome.storage.syncs.get("color", ({ color }) => {
    changeColor.style.backgroundColor = color;
});

// 