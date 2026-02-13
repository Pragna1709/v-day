/* ================= BASIC ELEMENTS ================= */
const noBtn = document.getElementById("noBtn");
const yesBtn = document.getElementById("yesBtn");
const questionPage = document.getElementById("questionPage");
const celebrationPage = document.getElementById("celebrationPage");
const bgMusic = document.getElementById("bgMusic");

/* ================= NO BUTTON MOVE ================= */
function moveButton() {
  const x = Math.random() * 200;
  const y = Math.random() * 80;
  noBtn.style.left = `${x}px`;
  noBtn.style.top = `${y}px`;
}

noBtn.addEventListener("mouseover", moveButton);
noBtn.addEventListener("touchstart", moveButton);

/* ================= CONFETTI ================= */
function launchConfetti() {
  for (let i = 0; i < 120; i++) {
    const confetti = document.createElement("div");
    confetti.style.position = "absolute";
    confetti.style.width = "8px";
    confetti.style.height = "8px";
    confetti.style.background = `hsl(${Math.random() * 360},100%,50%)`;
    confetti.style.left = Math.random() * window.innerWidth + "px";
    confetti.style.top = "-10px";
    confetti.style.borderRadius = "50%";
    document.body.appendChild(confetti);

    confetti.animate(
      [
        { transform: "translateY(0)" },
        { transform: `translateY(${window.innerHeight}px)` }
      ],
      { duration: 3000 }
    );

    setTimeout(() => confetti.remove(), 3000);
  }
}

/* ================= HEART FIREWORKS ================= */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let hearts = [];

class HeartFirework {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.particles = [];
    this.createHeart();
  }

  createHeart() {
    for (let t = 0; t < Math.PI * 2; t += 0.25) {
      const hx = 16 * Math.pow(Math.sin(t), 3);
      const hy = -(13 * Math.cos(t) -
                   5 * Math.cos(2 * t) -
                   2 * Math.cos(3 * t) -
                   Math.cos(4 * t));

      this.particles.push({
        x: this.x,
        y: this.y,
        vx: hx * 0.12,
        vy: hy * 0.12,
        alpha: 1,
        color: `hsl(${Math.random() * 360},100%,65%)`
      });
    }
  }

  update() {
    this.particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      p.alpha -= 0.015;
    });
    this.particles = this.particles.filter(p => p.alpha > 0);
  }

  draw() {
    this.particles.forEach(p => {
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, 3, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();
    });
    ctx.globalAlpha = 1;
  }
}

function launchHeartCrackers() {
  let count = 0;
  const interval = setInterval(() => {
    hearts.push(
      new HeartFirework(
        Math.random() * canvas.width,
        canvas.height / 3
      )
    );
    count++;
    if (count > 7) clearInterval(interval);
  }, 400);
}

function animateHearts() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  hearts.forEach((h, i) => {
    h.update();
    h.draw();
    if (h.particles.length === 0) hearts.splice(i, 1);
  });
  requestAnimationFrame(animateHearts);
}

animateHearts();

/* ================= YES BUTTON ================= */
yesBtn.addEventListener("click", () => {
  questionPage.classList.add("hidden");
  celebrationPage.classList.remove("hidden");
  bgMusic.play();
  launchConfetti();
  launchHeartCrackers(); // ❤️ HEART-SHAPED CRACKERS
});

/* ================= RESIZE FIX ================= */
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

