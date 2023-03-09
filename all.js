//舒服滾動
window.scrollTo({
    behavior: "smooth",
});

//僅供pc遊玩按鈕
function isMobileDevice() {
    return (
        typeof window.orientation !== "undefined" ||
        navigator.userAgent.indexOf("IEMobile") !== -1
    );
}
let startBtn = document.querySelector(".startBtn");
let error = document.querySelector(".errorBtn");
if (isMobileDevice()) {
    // mobile
    startBtn.style.display = "none";
    error.style.display = "block";
} else {
    // pc
    startBtn.style.display = "block";
    error.style.display = "none";
}

