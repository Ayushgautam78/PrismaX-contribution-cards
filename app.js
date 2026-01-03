/* ================= QUESTIONS ================= */

const questions = [
  { q: "Your Name?", type: "input", key: "name" },
  { q: "Upload Profile Picture", type: "file", key: "avatar" },
  { q: "Your X Username?", type: "input", key: "x" },
  { q: "Your Discord Username?", type: "input", key: "discord" },

  {
    q: "Top Discord Role?",
    options: [
      "Verified Visionary",
      "Reactive",
      "Assistive",
      "Proactive",
      "Exploratory",
      "Stabilized",
      "Navigational",
      "Groundbreaker"
    ],
    key: "role"
  },

  {
    q: "your total Contribution Time for PrismaX?",
    options: ["<1 month", "1–3 months", "3–6 months", "6+ months"],
    key: "time"
  },

  {
    q: "Total PrismaX Points?",
    options: ["0–500", "500–2k", "2k–5k", "5k+"],
    key: "points"
  },

  {
    q: "Total Content Posted for PrsimaX ?",
    options: ["1–10", "10–30", "30-50", "50+",],
    key: "content"
  },

  {
    q: "Messages Shared?",
    options: ["<100", "100+", "500+", "1000+"],
    key: "messages"
  },

  {
    q: "Which Tier You Subscribed at PrismaX ?",
    options: ["Free", "Amplifier", "Innovator"],
    key: "consistency"
  }
];

let i = 0;
const data = {};

/* ================= QUOTES ================= */

const roleQuotes = {

  "Verified Visionary": [
    "Contribution coming soon 👀",
    "Ideas are huge execution pending 🧠",
    "Verified the server forgot the grind 😌",
    "Watching legends work from afar 🍿",
    "Vision level high activity level low 💤",
    "Roadmap reader not a builder yet 📖",
    "Here for vibes not commits 😎"
  ],

  Reactive: [
    "More watching less doing ",
    "Still warming up maybe ",
    "Observing greatness quietly ",
    "Active online passive impact ",
    "Reaction speed good action speed loading",
    "Learning the ropes slowly"
  ],

  Assistive: [
    "Helping without noise 🤝",
    "Support role strong always 💪",
    "Making others shine ✨",
    "Silent help real impact 🧩",
    "Backbone energy activated 🦴"
  ],

  Proactive: [
    "Moves before being asked ⚡",
    "Action over excuses 🚀",
    "Built different acts faster 🏎️",
    "No waiting just doing 🔥",
    "Momentum creator mode on 🎯"
  ],

  Exploratory: [
    "Curious by nature 🔍",
    "Exploring beyond comfort 🌍",
    "Questions lead the way ❓",
    "Finding paths others miss 🧭",
    "Discovery mode always on 🧠"
  ],

  Stabilized: [
    "Consistency wins quietly 🧱",
    "Reliable calm focused 🧘",
    "Holding the line daily 🛡️",
    "No drama just discipline 📅",
    "Stable energy strong results 📈"
  ],

  Navigational: [
    "Guiding without spotlight 🗺️",
    "Direction matters most 🧭",
    "Helping others find the way 🚦",
    "Maps before movement 📍",
    "Clarity over chaos 💡"
  ],

  Groundbreaker: [
    "First mover mindset 🏗️",
    "Building paths not following 🛠️",
    "Legacy in progress 👑",
    "Breaking ground daily 🌱",
    "Future starts here 🚀"
  ]
};

function getRandomQuote(role) {
  const quotes = roleQuotes[role] || ["Building quietly 🌙"];
  return quotes[Math.floor(Math.random() * quotes.length)];
}

/* ================= ELEMENTS ================= */

const home = document.getElementById("home");
const quiz = document.getElementById("quiz");
const cardScreen = document.getElementById("cardScreen");

const startBtn = document.getElementById("startBtn");
const nextBtn = document.getElementById("nextBtn");

const qEl = document.getElementById("question");
const oEl = document.getElementById("options");

/* CARD ELEMENTS */
const card = document.querySelector(".card");
const cardAvatar = document.getElementById("cardAvatar");
const cardName = document.getElementById("cardName");
const cardRole = document.getElementById("cardRole");
const cardQuote = document.getElementById("cardQuote");

const cTime = document.getElementById("cTime");
const cPoints = document.getElementById("cPoints");
const cContent = document.getElementById("cContent");
const cMessages = document.getElementById("cMessages");
const cConsistency = document.getElementById("cConsistency");
const cX = document.getElementById("cX");
const cDiscord = document.getElementById("cDiscord");

const downloadBtn = document.getElementById("downloadBtn");
const shareBtn = document.getElementById("shareBtn");

/* ================= START ================= */

startBtn.onclick = () => {
  home.classList.remove("active");
  quiz.classList.add("active");
  i = 0;
  render();
};

/* ================= NEXT ================= */

nextBtn.onclick = () => {
  const q = questions[i];

  if (q.options && !data[q.key]) {
    alert("Please select an option to continue");
    return;
  }

  if (!q.options && q.type !== "file" && !data[q.key]) {
    alert("Please fill the field to continue");
    return;
  }

  if (q.type === "file" && !data.avatar) {
    alert("Please upload a profile picture");
    return;
  }

  i++;
  i < questions.length ? render() : showCard();
};

/* ================= RENDER ================= */

function render() {
  oEl.innerHTML = "";
  const q = questions[i];
  qEl.innerText = q.q;

  if (!q.options) {
    const inp = document.createElement("input");

    if (q.type === "file") {
      inp.type = "file";
      inp.accept = "image/*";
      inp.onchange = e => {
        const file = e.target.files[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => (data.avatar = reader.result);
        reader.readAsDataURL(file);
      };
    } else {
      inp.type = "text";
      inp.placeholder = "Type here…";
      inp.value = data[q.key] || "";
      inp.oninput = e => (data[q.key] = e.target.value.trim());
    }

    oEl.appendChild(inp);
  } else {
    q.options.forEach(opt => {
      const d = document.createElement("div");
      d.className = "option";
      d.innerText = opt;

      if (data[q.key] === opt) d.classList.add("selected");

      d.onclick = () => {
        [...oEl.children].forEach(c => c.classList.remove("selected"));
        d.classList.add("selected");
        data[q.key] = opt;
      };

      oEl.appendChild(d);
    });
  }
}

/* ================= SHOW CARD ================= */

function showCard() {
  quiz.classList.remove("active");
  cardScreen.classList.add("active");

  cardAvatar.src = data.avatar;
  cardName.innerText = data.name;
  cardRole.innerText = data.role;
  cardQuote.innerText = getRandomQuote(data.role);

  cTime.innerText = data.time;
  cPoints.innerText = data.points;
  cContent.innerText = data.content;
  cMessages.innerText = data.messages;
  cConsistency.innerText = data.consistency;
  cX.innerText = data.x;
  cDiscord.innerText = data.discord;
}

/* ================= DOWNLOAD ================= */

downloadBtn.onclick = async () => {
  card.classList.add("export");

  const tokenImg = document.createElement("img");
  tokenImg.src = "px-token.png";
  tokenImg.className = "card-export-token";
  card.appendChild(tokenImg);

  const canvas = await html2canvas(card, {
    scale: 3,
    backgroundColor: null,
    useCORS: true
  });

  const a = document.createElement("a");
  a.download = "PrismaX-Card.png";
  a.href = canvas.toDataURL("image/png");
  a.click();

  tokenImg.remove();
  card.classList.remove("export");
};

/* ================= SHARE ================= */

shareBtn.onclick = () => {
  const text = "Just generated my @PrismaXai Contributor Card build by 🚀 @ayushgautam174";
  window.open(
    `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}`,
    "_blank"
  );
};