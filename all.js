//search
const search = document.querySelector(".search");
let searching = document.querySelector(".searching");
search.addEventListener("click", () => {
    searching.classList.toggle("searchinggg");
});

//開啟小鈴鐺
const bell = document.querySelector('.bell');
const ding = localStorage.getItem('bellDing');
if(ding){
    bell.classList.add(ding);
}
bell.addEventListener('click', () => {
    bell.classList.toggle('bell-ding');
    if(bell.classList.contains('bell-ding')){
        localStorage.setItem('bellDing', 'bell-ding');
    }else{
        alert('確定要關閉小鈴鐺通知？');
        localStorage.removeItem('bellDing');
    }
})

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

//輪播圖
const navItems = document.querySelectorAll(".slider-nav-item");
const container = document.querySelector(".slider-wrapper");

const distance = container.offsetWidth / navItems.length;
let currentIndex = 0;
let targetIndex = 0;
let isAnimating = false;
let timer = null;

const autoSlide = () => {
    targetIndex = (currentIndex + 1) % navItems.length;
    switchSlide();
};

const switchSlide = () => {
    if (currentIndex !== targetIndex && !isAnimating) {
        isAnimating = true;
        navItems[currentIndex].classList.remove("slider-active");
        navItems[targetIndex].classList.add("slider-active");

        const displacement = -targetIndex * (100 / navItems.length);
        container.style.transition = "transform 0.5s ease-in-out";
        container.style.transform = `translateX(${displacement}%)`;

        const currentSlide = document.querySelector(
            ".slider-wrapper .slider-active"
        );
        currentSlide.classList.remove("slider-active");
        const targetSlide = document.querySelector(
            `.slider-item:nth-of-type(${targetIndex + 1})`
        );
        targetSlide.classList.add("slider-active");

        currentIndex = targetIndex;

        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
};

navItems.forEach((navItem) => {
    navItem.addEventListener("click", () => {
        targetIndex = parseInt(navItem.getAttribute("data-index"));
        switchSlide();
        clearInterval(timer);
        timer = setInterval(autoSlide, 5000);
    });
});

timer = setInterval(autoSlide, 5000);

//舒服滾動
window.scrollTo({
    behavior: "smooth",
});

//貓點
const intro = document.querySelector("#intro");
const env = document.querySelector("#environment");

window.addEventListener("scroll", () => {
    const introRect = intro.getBoundingClientRect();
    const envRect = env.getBoundingClientRect();
    const introIsVisible =
        introRect.top <= 500 && introRect.bottom >= window.innerHeight;
    const envIsVisible = envRect.top <= 1000;

    if (introIsVisible) {
        document.querySelector("#introDot").style.color = "white";
        document.querySelector("#envDot").style.color = "#ffffff80";
    } else if (envIsVisible) {
        document.querySelector("#envDot").style.color = "white";
        document.querySelector("#introDot").style.color = "#ffffff80";
    } else {
        document.querySelector("#introDot").style.color = "#ffffff80";
        document.querySelector("#envDot").style.color = "#ffffff80";
    }
});

//fade-in
const elements = document.querySelectorAll('.fade-in');
function checkVisibility(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }

  const observer = new IntersectionObserver(checkVisibility, { threshold: 0.3 }); 
                                            //觀察目標元素的30%的面積進入視窗就會視為可見
  elements.forEach(element => {
    observer.observe(element);
  });   //IntersectionObserver API