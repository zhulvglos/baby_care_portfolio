const slides = Array.from({ length: 22 }, (_, index) => {
  const number = index + 1;
  return {
    number,
    src: `../dist/previews/slide_${String(number).padStart(2, "0")}.png`
  };
});

const chapters = [
  { name: "Positioning", start: 1, end: 4 },
  { name: "CabinPilot", start: 5, end: 10 },
  { name: "BuildTrace", start: 11, end: 16 },
  { name: "CribGuard", start: 17, end: 21 },
  { name: "Method", start: 22, end: 22 }
];

let currentSlide = 1;
let autoplayTimer = null;
let isPlaying = false;
let flowAnimationStarted = false;

const shell = document.querySelector(".portfolio-shell");
const slideFrame = document.querySelector(".slide-frame");
const image = document.querySelector("#slideImage");
const pageCount = document.querySelector("#pageCount");
const progressText = document.querySelector("#progressText");
const progressBar = document.querySelector("#progressBar");
const slideTitle = document.querySelector("#slideTitle");
const chapterButtons = [...document.querySelectorAll(".chapter")];
const thumbs = document.querySelector("#thumbs");
const playDemo = document.querySelector("#playDemo");
const speedSelect = document.querySelector("#speedSelect");
const slideTimer = document.querySelector("#slideTimer");
const animatedSlideSeven = document.querySelector("#animatedSlideSeven");
const animatedSlideEight = document.querySelector("#animatedSlideEight");
const animatedSlideNine = document.querySelector("#animatedSlideNine");
const animatedSlideTen = document.querySelector("#animatedSlideTen");
const animatedSlideTwelve = document.querySelector("#animatedSlideTwelve");
const animatedSlideThirteen = document.querySelector("#animatedSlideThirteen");
const animatedSlideFourteen = document.querySelector("#animatedSlideFourteen");
const animatedSlideFifteen = document.querySelector("#animatedSlideFifteen");
const animatedSlideSixteen = document.querySelector("#animatedSlideSixteen");
const animatedSlideEighteen = document.querySelector("#animatedSlideEighteen");
const animatedSlideNineteen = document.querySelector("#animatedSlideNineteen");
const animatedSlideTwenty = document.querySelector("#animatedSlideTwenty");
const animatedSlideTwentyone = document.querySelector("#animatedSlideTwentyone");
const flowPlay = document.querySelector("#flowPlay");
const flowCards = [...document.querySelectorAll("[data-flow-card]")];
const flowChips = [...document.querySelectorAll("[data-flow]")];

animatedSlideNine.innerHTML = `
  <img class="replica-slide" src="../dist/previews/slide_09.png" alt="AI PM Portfolio slide 09 full replica">
  <div class="arch-overlay" aria-hidden="true">
    <span class="arch-mask mask-step-1"></span>
    <span class="arch-mask mask-step-2"></span>
    <span class="arch-mask mask-step-3"></span>
    <span class="arch-mask mask-step-4"></span>
    <span class="arch-mask mask-step-5"></span>
    <span class="arch-mask mask-json"></span>
    <span class="arch-mask mask-mapping"></span>
    <span class="arch-mask mask-value"></span>
    <span class="arch-scan"></span>
    <span class="arch-hotspot step-1"></span>
    <span class="arch-hotspot step-2"></span>
    <span class="arch-hotspot step-3"></span>
    <span class="arch-hotspot step-4"></span>
    <span class="arch-hotspot step-5"></span>
    <span class="arch-hotspot json-zone"></span>
    <span class="arch-hotspot mapping-zone"></span>
    <span class="arch-hotspot ui-card-zone"></span>
    <span class="arch-hotspot value-zone"></span>
    <span class="arch-flow-dot dot-a"></span>
    <span class="arch-flow-dot dot-b"></span>
    <span class="arch-flow-dot dot-c"></span>
  </div>
`;

animatedSlideTen.innerHTML = `
  <img class="replica-slide" src="../dist/previews/slide_10.png" alt="AI PM Portfolio slide 10 full replica">
  <div class="value-overlay" aria-hidden="true">
    <span class="value-mask mask-before"></span>
    <span class="value-mask mask-agent"></span>
    <span class="value-mask mask-after"></span>
    <span class="value-mask mask-highlight-1"></span>
    <span class="value-mask mask-highlight-2"></span>
    <span class="value-mask mask-highlight-3"></span>
    <span class="value-mask mask-highlight-4"></span>
    <span class="value-mask mask-source"></span>
    <span class="value-highlight highlight-before"></span>
    <span class="value-highlight highlight-after"></span>
    <span class="value-highlight highlight-card-1"></span>
    <span class="value-highlight highlight-card-2"></span>
    <span class="value-highlight highlight-card-3"></span>
    <span class="value-highlight highlight-card-4"></span>
    <span class="value-highlight highlight-source"></span>
    <span class="value-agent-pulse"></span>
    <span class="value-scan scan-a"></span>
    <span class="value-scan scan-b"></span>
    <span class="value-scan scan-c"></span>
    <span class="value-dot dot-1"></span>
    <span class="value-dot dot-2"></span>
    <span class="value-dot dot-3"></span>
    <span class="value-dot dot-4"></span>
  </div>
`;

animatedSlideTwelve.innerHTML = `
  <img class="replica-slide" src="../dist/previews/slide_12.png" alt="AI PM Portfolio slide 12 full replica">
  <div class="build-overlay" aria-hidden="true">
    <span class="build-scan scan-left"></span>
    <span class="build-scan scan-right"></span>
    <span class="build-node node-a"></span>
    <span class="build-node node-b"></span>
    <span class="build-node node-c"></span>
    <span class="build-node node-d"></span>
    <span class="build-pulse pulse-a"></span>
    <span class="build-pulse pulse-b"></span>
  </div>
`;

animatedSlideThirteen.innerHTML = `
  <img class="replica-slide" src="../dist/previews/slide_13.png" alt="AI PM Portfolio slide 13 full replica">
  <div class="agent-system-overlay" aria-hidden="true">
    <span class="system-mask system-card-1"></span>
    <span class="system-mask system-card-2"></span>
    <span class="system-mask system-card-3"></span>
    <span class="system-pulse system-pulse-1"></span>
    <span class="system-pulse system-pulse-2"></span>
    <span class="system-pulse system-pulse-3"></span>
    <span class="system-dot system-dot-1"></span>
    <span class="system-dot system-dot-2"></span>
    <span class="system-dot system-dot-3"></span>
  </div>
`;

animatedSlideFourteen.innerHTML = `
  <img class="replica-slide" src="../dist/previews/slide_14.png" alt="AI PM Portfolio slide 14 full replica">
  <div class="risk-overlay" aria-hidden="true">
    <span class="risk-mask mask-1"></span>
    <span class="risk-mask mask-2"></span>
    <span class="risk-mask mask-3"></span>
    <span class="risk-mask mask-4"></span>
    <span class="risk-mask mask-5"></span>
    <span class="risk-mask mask-6"></span>
    <span class="risk-mask mask-output"></span>
    <span class="risk-mask mask-evidence"></span>
    <span class="risk-core"></span>
    <span class="risk-card card-1"></span>
    <span class="risk-card card-2"></span>
    <span class="risk-card card-3"></span>
    <span class="risk-card card-4"></span>
    <span class="risk-card card-5"></span>
    <span class="risk-card card-6"></span>
    <span class="risk-card card-output"></span>
    <span class="risk-evidence"></span>
    <span class="risk-dot dot-1"></span>
    <span class="risk-dot dot-2"></span>
    <span class="risk-dot dot-3"></span>
    <span class="risk-dot dot-4"></span>
    <span class="risk-dot dot-5"></span>
    <span class="risk-dot dot-6"></span>
  </div>
`;

animatedSlideFifteen.innerHTML = `
  <img class="replica-slide" src="../dist/previews/slide_15.png" alt="AI PM Portfolio slide 15 full replica">
  <div class="evidence-overlay" aria-hidden="true">
    <span class="evidence-mask layer-1"></span>
    <span class="evidence-mask layer-2"></span>
    <span class="evidence-mask layer-3"></span>
    <span class="evidence-mask layer-4"></span>
    <span class="evidence-mask source-panel"></span>
    <span class="evidence-mask output-panel"></span>
    <span class="evidence-mask value-footer"></span>
    <span class="evidence-dot dot-1"></span>
    <span class="evidence-dot dot-2"></span>
    <span class="evidence-dot dot-3"></span>
    <span class="evidence-dot dot-4"></span>
    <span class="evidence-pulse pulse-input"></span>
    <span class="evidence-pulse pulse-output"></span>
  </div>
`;

animatedSlideSixteen.innerHTML = `
  <img class="replica-slide" src="../dist/previews/slide_16.png" alt="AI PM Portfolio slide 16 full replica">
  <div class="pm-value-overlay" aria-hidden="true">
    <span class="pm-mask traditional"></span>
    <span class="pm-mask ai"></span>
    <span class="pm-mask footer"></span>
    <span class="pm-dot dot-left-1"></span>
    <span class="pm-dot dot-left-2"></span>
    <span class="pm-dot dot-right-1"></span>
    <span class="pm-dot dot-right-2"></span>
    <span class="pm-pulse arrow-pulse"></span>
    <span class="pm-pulse ai-pulse"></span>
  </div>
`;

animatedSlideEighteen.innerHTML = `
  <img class="replica-slide" src="../dist/previews/slide_18.png" alt="AI PM Portfolio slide 18 full replica">
  <div class="care-scope-overlay" aria-hidden="true">
    <span class="care-mask care-demo"></span>
    <span class="care-mask care-status"></span>
    <span class="care-mask care-card-1"></span>
    <span class="care-mask care-card-2"></span>
    <span class="care-mask care-card-3"></span>
    <span class="care-scan"></span>
    <span class="care-pulse pulse-risk"></span>
    <span class="care-pulse pulse-trust"></span>
    <span class="care-dot dot-status"></span>
    <span class="care-dot dot-log"></span>
  </div>
`;

animatedSlideNineteen.innerHTML = `
  <img class="replica-slide" src="../dist/previews/slide_19.png" alt="AI PM Portfolio slide 19 full replica">
  <div class="care-demo-overlay" aria-hidden="true">
    <span class="care-demo-mask demo-col-1"></span>
    <span class="care-demo-mask demo-col-2"></span>
    <span class="care-demo-mask demo-col-3"></span>
    <span class="care-demo-mask demo-footer"></span>
    <span class="care-demo-pulse pulse-video"></span>
    <span class="care-demo-pulse pulse-risk"></span>
    <span class="care-demo-pulse pulse-memory"></span>
    <span class="care-demo-dot dot-1"></span>
    <span class="care-demo-dot dot-2"></span>
    <span class="care-demo-dot dot-3"></span>
  </div>
`;

animatedSlideTwenty.innerHTML = `
  <img class="replica-slide" src="../dist/previews/slide_20.png" alt="AI PM Portfolio slide 20 full replica">
  <div class="dual-flow-overlay" aria-hidden="true">
    <span class="dual-mask chain-a"></span>
    <span class="dual-mask a-step-1"></span>
    <span class="dual-mask a-step-2"></span>
    <span class="dual-mask a-step-3"></span>
    <span class="dual-mask a-step-4"></span>
    <span class="dual-mask chain-b"></span>
    <span class="dual-mask b-step-1"></span>
    <span class="dual-mask b-step-2"></span>
    <span class="dual-mask b-step-3"></span>
    <span class="dual-mask b-step-4"></span>
    <span class="dual-mask shared-layer"></span>
    <span class="dual-dot a-dot-1"></span>
    <span class="dual-dot a-dot-2"></span>
    <span class="dual-dot a-dot-3"></span>
    <span class="dual-dot b-dot-1"></span>
    <span class="dual-dot b-dot-2"></span>
    <span class="dual-dot b-dot-3"></span>
    <span class="dual-pulse pulse-a"></span>
    <span class="dual-pulse pulse-b"></span>
  </div>
`;

animatedSlideTwentyone.innerHTML = `
  <img class="replica-slide" src="../dist/previews/slide_21.png" alt="AI PM Portfolio slide 21 full replica">
  <div class="boundary-design-overlay" aria-hidden="true">
    <span class="boundary-mask boundary-card-1"></span>
    <span class="boundary-mask boundary-card-2"></span>
    <span class="boundary-mask boundary-card-3"></span>
    <span class="boundary-mask boundary-card-4"></span>
    <span class="boundary-mask boundary-principle"></span>
    <span class="boundary-pulse pulse-vision"></span>
    <span class="boundary-pulse pulse-scene"></span>
    <span class="boundary-pulse pulse-health"></span>
    <span class="boundary-pulse pulse-voice"></span>
    <span class="boundary-dot dot-1"></span>
    <span class="boundary-dot dot-2"></span>
    <span class="boundary-dot dot-3"></span>
    <span class="boundary-dot dot-4"></span>
  </div>
`;

function formatPage(number) {
  return String(number).padStart(2, "0");
}

function getChapter(number) {
  return chapters.find((chapter) => number >= chapter.start && number <= chapter.end) || chapters[0];
}

function renderThumbs() {
  thumbs.innerHTML = slides.map((slide) => `
    <button class="thumb" data-slide="${slide.number}" aria-label="第 ${slide.number} 页">
      <img src="${slide.src}" alt="Slide ${formatPage(slide.number)} thumbnail">
      <span>${formatPage(slide.number)}</span>
    </button>
  `).join("");
}

function setSlide(number) {
  currentSlide = Math.max(1, Math.min(slides.length, Number(number)));
  const slide = slides[currentSlide - 1];
  const chapter = getChapter(currentSlide);
  const label = `${formatPage(currentSlide)} / ${formatPage(slides.length)}`;

  image.classList.remove("entering");
  void image.offsetWidth;
  image.src = slide.src;
  image.classList.add("entering");
  image.alt = `AI PM Portfolio slide ${formatPage(currentSlide)}`;
  slideFrame.classList.toggle("show-animated-seven", currentSlide === 7);
  slideFrame.classList.toggle("show-animated-eight", currentSlide === 8);
  slideFrame.classList.toggle("show-animated-nine", currentSlide === 9);
  slideFrame.classList.toggle("show-animated-ten", currentSlide === 10);
  slideFrame.classList.toggle("show-animated-twelve", currentSlide === 12);
  slideFrame.classList.toggle("show-animated-thirteen", currentSlide === 13);
  slideFrame.classList.toggle("show-animated-fourteen", currentSlide === 14);
  slideFrame.classList.toggle("show-animated-fifteen", currentSlide === 15);
  slideFrame.classList.toggle("show-animated-sixteen", currentSlide === 16);
  slideFrame.classList.toggle("show-animated-eighteen", currentSlide === 18);
  slideFrame.classList.toggle("show-animated-nineteen", currentSlide === 19);
  slideFrame.classList.toggle("show-animated-twenty", currentSlide === 20);
  slideFrame.classList.toggle("show-animated-twentyone", currentSlide === 21);
  if (currentSlide === 7) {
    animatedSlideSeven.style.animation = "none";
    void animatedSlideSeven.offsetWidth;
    animatedSlideSeven.style.animation = "";
    animatedSlideSeven.classList.toggle("flow-playing", flowAnimationStarted);
  }
  if (currentSlide === 8) {
    animatedSlideEight.style.animation = "none";
    void animatedSlideEight.offsetWidth;
    animatedSlideEight.style.animation = "";
  }
  if (currentSlide === 9) {
    animatedSlideNine.style.animation = "none";
    void animatedSlideNine.offsetWidth;
    animatedSlideNine.style.animation = "";
  }
  if (currentSlide === 10) {
    animatedSlideTen.style.animation = "none";
    void animatedSlideTen.offsetWidth;
    animatedSlideTen.style.animation = "";
    animateValueCounters();
  }
  if (currentSlide === 12) {
    animatedSlideTwelve.style.animation = "none";
    void animatedSlideTwelve.offsetWidth;
    animatedSlideTwelve.style.animation = "";
  }
  if (currentSlide === 13) {
    animatedSlideThirteen.style.animation = "none";
    void animatedSlideThirteen.offsetWidth;
    animatedSlideThirteen.style.animation = "";
  }
  if (currentSlide === 14) {
    animatedSlideFourteen.style.animation = "none";
    void animatedSlideFourteen.offsetWidth;
    animatedSlideFourteen.style.animation = "";
  }
  if (currentSlide === 15) {
    animatedSlideFifteen.style.animation = "none";
    void animatedSlideFifteen.offsetWidth;
    animatedSlideFifteen.style.animation = "";
  }
  if (currentSlide === 16) {
    animatedSlideSixteen.style.animation = "none";
    void animatedSlideSixteen.offsetWidth;
    animatedSlideSixteen.style.animation = "";
  }
  if (currentSlide === 18) {
    animatedSlideEighteen.style.animation = "none";
    void animatedSlideEighteen.offsetWidth;
    animatedSlideEighteen.style.animation = "";
  }
  if (currentSlide === 19) {
    animatedSlideNineteen.style.animation = "none";
    void animatedSlideNineteen.offsetWidth;
    animatedSlideNineteen.style.animation = "";
  }
  if (currentSlide === 20) {
    animatedSlideTwenty.style.animation = "none";
    void animatedSlideTwenty.offsetWidth;
    animatedSlideTwenty.style.animation = "";
  }
  if (currentSlide === 21) {
    animatedSlideTwentyone.style.animation = "none";
    void animatedSlideTwentyone.offsetWidth;
    animatedSlideTwentyone.style.animation = "";
  }
  pageCount.textContent = label;
  progressText.textContent = label;
  slideTitle.textContent = chapter.name;
  progressBar.style.width = `${(currentSlide / slides.length) * 100}%`;

  chapterButtons.forEach((button) => {
    const start = Number(button.dataset.slide);
    const related = getChapter(start);
    button.classList.toggle("active", related.name === chapter.name);
  });

  document.querySelectorAll(".thumb").forEach((button) => {
    const active = Number(button.dataset.slide) === currentSlide;
    button.classList.toggle("active", active);
    if (active) button.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  });

  window.location.hash = `slide-${formatPage(currentSlide)}`;
  restartTimerAnimation();
}

function animateValueCounters() {
  animatedSlideTen.querySelectorAll("[data-count]").forEach((node) => {
    const target = Number(node.dataset.count);
    const suffix = node.textContent.includes("+") ? "%+" : "%";
    const startTime = performance.now();
    const duration = 900;
    function tick(now) {
      const progress = Math.min(1, (now - startTime) / duration);
      const eased = 1 - Math.pow(1 - progress, 3);
      node.textContent = `${Math.round(target * eased)}${suffix}`;
      if (progress < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  });

  animatedSlideTen.querySelectorAll("[data-label]").forEach((node) => {
    node.textContent = "0";
    window.setTimeout(() => {
      node.textContent = node.dataset.label;
    }, 900);
  });
}

function setFlowStep(step) {
  flowCards.forEach((card) => {
    card.classList.toggle("active", card.dataset.flowCard === String(step));
  });
  flowChips.forEach((chip) => {
    chip.classList.toggle("active", chip.dataset.flow === String(step));
  });
}

function moveSlide(delta) {
  const next = currentSlide + delta;
  if (next > slides.length) {
    setSlide(1);
  } else if (next < 1) {
    setSlide(slides.length);
  } else {
    setSlide(next);
  }
}

function manualMove(delta) {
  moveSlide(delta);
  scheduleAutoplay();
}

function manualSetSlide(number) {
  setSlide(number);
  scheduleAutoplay();
}

function getDuration() {
  return Number(speedSelect.value);
}

function restartTimerAnimation() {
  shell.style.setProperty("--demo-duration", `${getDuration()}ms`);
  slideTimer.style.animation = "none";
  void slideTimer.offsetWidth;
  slideTimer.style.animation = "";
}

function scheduleAutoplay() {
  window.clearTimeout(autoplayTimer);
  if (!isPlaying) return;
  autoplayTimer = window.setTimeout(() => {
    moveSlide(1);
    scheduleAutoplay();
  }, getDuration());
}

function setPlaying(nextPlaying) {
  isPlaying = nextPlaying;
  shell.classList.toggle("playing", isPlaying);
  playDemo.textContent = isPlaying ? "暂停演示" : "播放演示";
  restartTimerAnimation();
  scheduleAutoplay();
}

renderThumbs();

document.querySelector("#prevSlide").addEventListener("click", () => manualMove(-1));
document.querySelector("#nextSlide").addEventListener("click", () => manualMove(1));
document.querySelector("#prevEdge").addEventListener("click", () => manualMove(-1));
document.querySelector("#nextEdge").addEventListener("click", () => manualMove(1));
playDemo.addEventListener("click", () => setPlaying(!isPlaying));
speedSelect.addEventListener("change", () => {
  restartTimerAnimation();
  scheduleAutoplay();
});

flowPlay.addEventListener("click", () => {
  flowAnimationStarted = true;
  animatedSlideSeven.classList.add("flow-playing");
});

animatedSlideSeven.addEventListener("click", (event) => {
  const card = event.target.closest("[data-flow-card]");
  const chip = event.target.closest("[data-flow]");
  if (card) setFlowStep(card.dataset.flowCard);
  if (chip) setFlowStep(chip.dataset.flow);
});

chapterButtons.forEach((button) => {
  button.addEventListener("click", () => manualSetSlide(button.dataset.slide));
});

thumbs.addEventListener("click", (event) => {
  const thumb = event.target.closest(".thumb");
  if (thumb) manualSetSlide(thumb.dataset.slide);
});

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    event.preventDefault();
    manualMove(-1);
  }
  if (event.key === "ArrowRight") {
    event.preventDefault();
    manualMove(1);
  }
  if (event.code === "Space") {
    event.preventDefault();
    setPlaying(!isPlaying);
  }
});

const initialMatch = window.location.hash.match(/slide-(\d+)/);
setSlide(initialMatch ? Number(initialMatch[1]) : 1);
