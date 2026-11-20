/* Reading Fundamentals – app logic. Content lives in data.js */
(function () {
  "use strict";

  const app = document.getElementById("app");
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  const hasTTS = "speechSynthesis" in window;

  /* ---------- tiny helpers ---------- */
  function h(tag, attrs, ...kids) {
    const e = document.createElement(tag);
    for (const k in attrs || {}) {
      if (k === "class") e.className = attrs[k];
      else if (k.startsWith("on")) e.addEventListener(k.slice(2), attrs[k]);
      else e.setAttribute(k, attrs[k]);
    }
    kids.flat().forEach(c => e.append(c instanceof Node ? c : document.createTextNode(c)));
    return e;
  }
  function btn(label, fn, cls) {
    return h("button", { class: "btn " + (cls || ""), onclick: fn, type: "button" }, label);
  }
  const norm = s => s.toLowerCase().replace(/[^a-z' ]/g, " ").split(/\s+/).filter(Boolean);

  /* ---------- progress (saved in this browser only) ---------- */
  const KEY = "rf_progress", NAME = "rf_name";
  const store = {
    get() { try { return JSON.parse(localStorage.getItem(KEY) || "{}"); } catch (e) { return {}; } },
    set(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} },
    name() { try { return localStorage.getItem(NAME) || ""; } catch (e) { return ""; } },
    setName(n) { try { localStorage.setItem(NAME, n); } catch (e) {} }
  };
  function saveStars(id, stars) {
    const p = store.get();
    if (!p[id] || p[id] < stars) p[id] = stars;
    store.set(p);
  }
  const starText = n => "★".repeat(n) + "☆".repeat(3 - n);
  function totalStars() {
    const p = store.get(); let t = 0, max = 0;
    LEVELS.forEach(l => l.activities.forEach(a => { t += p[a.id] || 0; max += 3; }));
    return { t, max };
  }
  function updateWho() {
    const { t, max } = totalStars();
    const n = store.name();
    document.getElementById("who").textContent = (n ? n + " · " : "") + "⭐ " + t + "/" + max;
  }

  /* ---------- text to speech (the voice the pupils hear) ---------- */
  let voice = null;
  function pickVoice() {
    if (!hasTTS) return;
    const v = speechSynthesis.getVoices();
    voice = v.find(x => /en[-_]US/i.test(x.lang)) || v.find(x => /^en/i.test(x.lang)) || null;
  }
  if (hasTTS) { pickVoice(); speechSynthesis.onvoiceschanged = pickVoice; }
  function speak(text, rate) {
    if (!hasTTS) { alert("This browser cannot read aloud. Please try Chrome or Edge."); return; }
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    if (voice) u.voice = voice;
    u.lang = voice ? voice.lang : "en-US";
    u.rate = rate || 0.9;
    speechSynthesis.speak(u);
  }

  /* ---------- speech recognition (checks what the pupil said) ---------- */
  function micCheck(setStatus, onDone) {
    if (hasTTS) speechSynthesis.cancel();
    let finished = false;
    const finish = (alts, err) => { if (!finished) { finished = true; onDone(alts, err); } };
    const r = new SR();
    r.lang = "en-US"; r.maxAlternatives = 5; r.interimResults = false; r.continuous = false;
    r.onresult = e => finish([...e.results[0]].map(a => a.transcript));
    r.onerror = e => finish(null, e.error);
    r.onend = () => finish(null, "no-speech");
    try { r.start(); setStatus("🎤 Listening… read now!"); } catch (e) { finish(null, "start"); }
  }
  function errMsg(err) {
    if (err === "not-allowed" || err === "service-not-allowed") return "Please allow the microphone, then try again.";
    if (err === "network") return "The mic check needs the internet. Please try again.";
    return "I did not hear you. Tap the mic and try again.";
  }
  // Which target words were found, in order, in what was said (longest common subsequence)
  function align(t, s) {
    const n = t.length, m = s.length;
    const d = Array.from({ length: n + 1 }, () => Array(m + 1).fill(0));
    for (let i = 1; i <= n; i++) for (let j = 1; j <= m; j++)
      d[i][j] = t[i - 1] === s[j - 1] ? d[i - 1][j - 1] + 1 : Math.max(d[i - 1][j], d[i][j - 1]);
    const marks = Array(n).fill(false);
    let i = n, j = m;
    while (i > 0 && j > 0) {
      if (t[i - 1] === s[j - 1]) { marks[i - 1] = true; i--; j--; }
      else if (d[i - 1][j] >= d[i][j - 1]) i--; else j--;
    }
    return marks;
  }

  /* ---------- fun: stars, sounds, confetti, mascot ---------- */
  const rainbowColors = ["#ef476f", "#f77f00", "#d99a00", "#06a77d", "#118ab2", "#7b4bd6"];
  function rainbow(text) {
    return [...text].map((ch, i) => h("span", { style: "color:" + rainbowColors[i % rainbowColors.length] + ";animation-delay:" + (i * 0.12) + "s" }, ch === " " ? "\u00a0" : ch));
  }
  function starsEl(n, small) {
    const w = h("span", { class: "starrow" + (small ? " small" : "") });
    for (let i = 0; i < 3; i++) w.append(h("span", { class: "star " + (i < n ? "on" : "off"), style: "animation-delay:" + (i * 0.2) + "s" }, "★"));
    return w;
  }
  let soundOn = true;
  try { soundOn = localStorage.getItem("rf_sound") !== "off"; } catch (e) {}
  let audioCtx = null;
  function tone(freqs, dur) {
    if (!soundOn) return;
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const t = audioCtx.currentTime;
      freqs.forEach((f, i) => {
        const o = audioCtx.createOscillator(), g = audioCtx.createGain();
        o.type = "triangle"; o.frequency.value = f;
        g.gain.setValueAtTime(0.15, t + i * dur);
        g.gain.exponentialRampToValueAtTime(0.001, t + (i + 1) * dur);
        o.connect(g); g.connect(audioCtx.destination);
        o.start(t + i * dur); o.stop(t + (i + 1) * dur);
      });
    } catch (e) {}
  }
  function confetti(n) {
    const E = ["🎉", "⭐", "🌈", "🎈", "✨", "💖", "🍭"];
    const wrap = h("div", { class: "conf", "aria-hidden": "true" });
    for (let i = 0; i < n; i++) {
      wrap.append(h("span", { style: "left:" + (Math.random() * 100) + "%;animation-delay:" + (Math.random() * 0.8) + "s;animation-duration:" + (2 + Math.random() * 1.5) + "s;font-size:" + (16 + Math.random() * 20) + "px" }, E[i % E.length]));
    }
    document.body.append(wrap);
    setTimeout(() => wrap.remove(), 4500);
  }
  const win = () => { tone([660, 880, 1100], 0.1); confetti(10); };
  const lose = () => tone([260, 200], 0.16);
  const CHEERS = ["Great job!", "Super reading!", "Awesome!", "You did it!", "Fantastic!", "Hooray!", "Wonderful!"];
  const cheer = () => "🌟 " + CHEERS[Math.floor(Math.random() * CHEERS.length)];
  function pictureStrip(sentence) {
    const seen = [];
    norm(sentence).forEach(w => { if (PICS[w] && !seen.includes(PICS[w])) seen.push(PICS[w]); });
    return seen.length ? h("div", { class: "pics" }, seen.slice(0, 5).join(" ")) : "";
  }
  function theme(level) {
    app.style.setProperty("--lc", LEVEL_COLORS[level.id] || "#2f6fed");
  }
  const soundBtn = document.getElementById("soundBtn");
  function showSound() { soundBtn.textContent = soundOn ? "🔊" : "🔇"; }
  soundBtn.addEventListener("click", () => {
    soundOn = !soundOn; showSound();
    try { localStorage.setItem("rf_sound", soundOn ? "on" : "off"); } catch (e) {}
    if (soundOn) tone([660, 880], 0.1);
  });
  showSound();

  /* ---------- screens ---------- */
  function home() {
    app.innerHTML = "";
    app.style.setProperty("--lc", "#2f6fed");
    updateWho();
    app.append(
      h("div", { class: "ribbon" }, "👩‍🏫 " + SITE.corner),
      h("h1", { class: "hero" }, rainbow("Let's read!"), " 📖"),
      h("div", { class: "owl" },
        h("span", { class: "owl-face" }, "🦉"),
        h("div", { class: "bubble" }, "Hoot hoot! I'm Owly, " + SITE.owner + "'s helper. Pick a level and let's read together. Listen first, then read it yourself!"))
    );
    const nameIn = h("input", { type: "text", placeholder: "Type your name", value: store.name(), "aria-label": "Your name" });
    nameIn.addEventListener("input", () => { store.setName(nameIn.value.trim()); updateWho(); });
    app.append(h("div", { class: "row" }, h("label", {}, "Name: "), nameIn));

    if (!SR) app.append(h("div", { class: "note" },
      "🎤 The mic check works on Chrome or Edge. On this browser you can still listen and use the self-check buttons."));

    const grid = h("div", { class: "grid" });
    const p = store.get();
    LEVELS.forEach((l, idx) => {
      const got = l.activities.reduce((s, a) => s + (p[a.id] || 0), 0);
      const max = l.activities.length * 3;
      grid.append(h("button", { class: "tile", style: "--tc:" + (LEVEL_COLORS[l.id] || "#2f6fed"), onclick: () => levelScreen(l) },
        h("span", { class: "badge" }, "Level " + (idx + 1)),
        h("div", { class: "em" }, l.emoji),
        h("div", { class: "t" }, l.title.replace(/^Level \d+: /, "")),
        h("div", { class: "muted" }, l.desc),
        h("div", { class: "mini" }, h("span", { style: "width:" + Math.round(got / max * 100) + "%" })),
        h("div", { class: "stars" }, "⭐ " + got + "/" + max)));
    });
    app.append(grid,
      h("div", { class: "row" },
        btn("🖨️ My score sheet", sheetScreen, "alt"),
        btn("🖨️ Class record sheet", classSheet, "alt"),
        btn("Reset my stars", () => {
        if (confirm("Erase all stars on this device?")) { store.set({}); home(); }
      }, "alt")));
  }

  function levelScreen(level) {
    app.innerHTML = "";
    theme(level);
    const p = store.get();
    const ICONS = { words: "🗣️", sentences: "📖", quiz: "❓", passage: "📄" };
    const KIND = { words: "Read the words", sentences: "Read aloud", quiz: "Quiz time", passage: "Read and answer" };
    app.append(
      h("button", { class: "back", onclick: home }, "⬅ All levels"),
      h("h1", {}, level.emoji + " " + level.title),
      h("div", { class: "owl" },
        h("span", { class: "owl-face" }, "🦉"),
        h("div", { class: "bubble" }, level.desc + " Choose an activity!"))
    );
    level.activities.forEach(a => {
      app.append(h("button", { class: "act", onclick: () => startActivity(level, a) },
        h("span", { class: "ic" }, ICONS[a.type] || "⭐"),
        h("span", { class: "tt" }, a.title, h("small", {}, KIND[a.type] || "")),
        starsEl(p[a.id] || 0, true)));
    });
  }

  function startActivity(level, act) {
    theme(level);
    if (act.type === "passage") return passageIntro(level, act);
    runActivity(level, act);
  }

  function passageBlock(text, open) {
    const d = h("details", { class: "pass" },
      h("summary", {}, "📄 Passage"),
      h("p", { class: "passage" }, text),
      h("div", { class: "row" }, btn("🔊 Listen to the passage", () => speak(text, 0.9), "listen")));
    if (open) d.open = true;
    return d;
  }

  function passageIntro(level, act) {
    app.innerHTML = "";
    app.append(
      h("button", { class: "back", onclick: () => levelScreen(level) }, "⬅ " + level.title),
      h("h2", {}, act.title),
      ART[act.id] ? h("div", { class: "art" }, ART[act.id]) : "",
      h("p", { class: "muted" }, "Read the passage (or listen to it). Then answer the questions."),
      h("div", { class: "card" }, passageBlock(act.passage, true),
        h("div", { class: "row center" }, btn("Start questions ➡", () => runActivity(level, act))))
    );
  }

  function runActivity(level, act) {
    const items = act.items;
    let i = 0, correct = 0;

    function step() {
      if (i >= items.length) return finish();
      app.innerHTML = "";
      const bar = h("div", { class: "progress" }, h("span", { style: "width:" + Math.round(i / items.length * 100) + "%" }));
      const card = h("div", { class: "card" });
      const nextRow = h("div", { class: "row center" });
      let answered = false;

      const done = ok => {
        if (answered) return;
        answered = true;
        if (ok) correct++;
        nextRow.innerHTML = "";
        nextRow.append(btn(i === items.length - 1 ? "Finish ✅" : "Next ➡", () => { i++; step(); }, "good"));
      };
      nextRow.append(btn("Skip", () => { answered = true; i++; step(); }, "alt"));

      app.append(
        h("button", { class: "back", onclick: () => levelScreen(level) }, "⬅ " + level.title),
        h("h2", {}, act.title + "  (" + (i + 1) + "/" + items.length + ")"),
        bar, ART[act.id] ? h("div", { class: "art" }, ART[act.id]) : "", card, nextRow);
      RENDER[act.type === "passage" ? "quiz" : act.type](items[i], card, done, act);
    }

    function finish() {
      const ratio = correct / items.length;
      const stars = ratio >= 0.9 ? 3 : ratio >= 0.7 ? 2 : ratio >= 0.4 ? 1 : 0;
      saveStars(act.id, stars);
      updateWho();
      const idx = level.activities.indexOf(act);
      const nextAct = level.activities[idx + 1];
      const msg = stars === 3 ? "Excellent reading! 🎉" : stars === 2 ? "Very good! Keep going! 👏" :
        stars === 1 ? "Nice try! Practice once more. 💪" : "Let's listen again and try one more time. 🌱";
      app.innerHTML = "";
      app.append(h("div", { class: "card" },
        h("h2", { class: "center" }, act.title),
        h("div", { class: "result-stars" }, starsEl(stars)),
        h("p", { class: "center" }, correct + " out of " + items.length + " correct"),
        h("div", { class: "owl" }, h("span", { class: "owl-face" }, "🦉"), h("div", { class: "bubble" }, msg, h("span", { class: "sign" }, "– " + SITE.owner))),
        h("div", { class: "row center" },
          btn("🔁 Try again", () => runActivity(level, act), "alt"),
          nextAct ? btn("Next activity ➡", () => startActivity(level, nextAct)) : "",
          btn("Back to level", () => levelScreen(level), "alt"))));
      if (stars) confetti(stars === 3 ? 70 : 25);
    }
    step();
  }

  /* ---------- activity renderers ---------- */
  const RENDER = {
    words(item, card, done) {
      const hasSyl = item.syl && item.syl.includes("-");
      if (PICS[item.w]) card.append(h("div", { class: "pic" }, PICS[item.w]));
      card.append(h("div", { class: "big" }, item.w));
      if (hasSyl) card.append(h("div", { class: "syl" }, item.syl.split("-").join(" · ")));
      const fb = h("div", { class: "fb" });
      const row = h("div", { class: "row center" });
      row.append(btn("🔊 Listen", () => speak(item.w, 0.85), "listen"));
      if (hasSyl) row.append(btn("🐢 Slow", () => speak(item.syl.split("-").join(", "), 0.6), "slow"));

      if (SR) {
        let tries = 0;
        const mic = btn("🎤 Say it", () => {
          mic.disabled = true; mic.classList.add("pulse"); fb.className = "fb";
          micCheck(t => fb.textContent = t, (alts, err) => {
            mic.disabled = false; mic.classList.remove("pulse");
            if (!alts) { fb.className = "fb bad"; fb.textContent = errMsg(err); return; }
            const target = norm(item.w).join("");
            const ok = alts.some(a => norm(a).join("") === target || norm(a).includes(target));
            if (ok) { fb.className = "fb good"; fb.textContent = cheer(); win(); done(true); }
            else {
              tries++;
              fb.className = "fb bad";
              lose(); fb.textContent = "I heard “" + alts[0] + "”. Tap Listen, then try again.";
              if (tries >= 2) done(false);
            }
          });
        });
        mic.classList.add("mic"); row.append(mic);
      } else {
        row.append(
          btn("✅ I said it right", () => { fb.className = "fb good"; fb.textContent = "Good job!"; done(true); }, "good"),
          btn("🔁 Not yet", () => { fb.className = "fb bad"; fb.textContent = "Listen again and say it out loud."; }, "alt"));
      }
      card.append(row, fb);
    },

    sentences(item, card, done) {
      const words = item.split(/\s+/);
      const targets = words.map(w => norm(w).join(""));
      const spans = words.map(w => h("span", { class: "w" }, w));
      const box = h("div", { class: "sent" });
      spans.forEach(s => { box.append(s, " "); });
      const fb = h("div", { class: "fb" });
      const row = h("div", { class: "row center" });
      row.append(
        btn("🔊 Listen", () => speak(item, 0.85), "listen"),
        btn("🐢 Slow", () => speak(item, 0.6), "slow"));

      if (SR) {
        let tries = 0;
        const mic = btn("🎤 Read it", () => {
          mic.disabled = true; mic.classList.add("pulse"); fb.className = "fb";
          micCheck(t => fb.textContent = t, (alts, err) => {
            mic.disabled = false; mic.classList.remove("pulse");
            if (!alts) { fb.className = "fb bad"; fb.textContent = errMsg(err); return; }
            let best = null, bestCount = -1;
            alts.forEach(a => {
              const marks = align(targets, norm(a));
              const c = marks.filter(Boolean).length;
              if (c > bestCount) { bestCount = c; best = marks; }
            });
            spans.forEach((s, k) => { s.className = "w " + (best[k] ? "ok" : "miss"); });
            const ok = bestCount / words.length >= 0.8;
            tries++;
            if (ok) { fb.className = "fb good"; fb.textContent = cheer() + " " + bestCount + " of " + words.length + " words."; win(); done(true); }
            else {
              fb.className = "fb bad";
              lose(); fb.textContent = "Red words need practice. Listen, then try again. (" + bestCount + " of " + words.length + ")";
              if (tries >= 2) done(false);
            }
          });
        });
        mic.classList.add("mic"); row.append(mic);
      } else {
        row.append(
          btn("✅ I read it right", () => { fb.className = "fb good"; fb.textContent = "Good job!"; done(true); }, "good"),
          btn("🔁 Not yet", () => { fb.className = "fb bad"; fb.textContent = "Listen again and read it out loud."; }, "alt"));
      }
      card.append(pictureStrip(item), box, row, fb);
    },

    quiz(item, card, done, act) {
      if (act.passage) card.append(passageBlock(act.passage, false));
      card.append(h("h2", {}, item.q));
      const row = h("div", { class: "row" });
      if (item.say) row.append(btn("🔊 Listen", () => speak(item.say, 0.8), "listen"));
      if (!item.say || item.q.length > 40) row.append(btn("🔊 Read question", () => speak(item.q, 0.9), "listen"));
      const fb = h("div", { class: "fb" });
      const opts = h("div", { class: "opts" });
      const buttons = item.options.map((o, k) => {
        const b = h("button", { class: "opt", type: "button" }, o);
        b.addEventListener("click", () => {
          buttons.forEach(x => x.disabled = true);
          if (k === item.a) {
            b.classList.add("right"); fb.className = "fb good"; fb.textContent = cheer(); win(); done(true);
          } else {
            b.classList.add("wrong"); lose(); buttons[item.a].classList.add("right");
            fb.className = "fb bad"; fb.textContent = "The answer is: " + item.options[item.a]; done(false);
          }
        });
        opts.append(b);
        return b;
      });
      card.append(row, opts, fb);
    }
  };

  /* ---------- printable sheets ---------- */
  function sheetHeader(title) {
    return [
      h("button", { class: "back noprint", onclick: home }, "⬅ Back"),
      h("h1", {}, title)
    ];
  }

  // Filled in from this device's stars: for one pupil
  function sheetScreen() {
    app.innerHTML = "";
    const p = store.get();
    const body = h("tbody");
    let t = 0, max = 0;
    LEVELS.forEach(l => l.activities.forEach(a => {
      const s = p[a.id] || 0;
      t += s; max += 3;
      body.append(h("tr", {},
        h("td", {}, l.title.split(":")[0]),
        h("td", {}, a.title),
        h("td", { class: "c" }, s ? starText(s) : "—"),
        h("td", {}, "☐ Excellent  ☐ Good  ☐ Needs practice")));
    }));
    app.append(
      ...sheetHeader(SITE.title + " – Score Sheet"),
      h("p", {}, "Teacher: " + SITE.owner),
      h("p", {}, "Name: " + (store.name() || "______________________") + "      Date: " + new Date().toLocaleDateString()),
      h("table", { class: "sheet" },
        h("thead", {}, h("tr", {},
          h("th", {}, "Level"), h("th", {}, "Activity"), h("th", { class: "c" }, "Stars"), h("th", {}, "Teacher's pronunciation rating"))),
        body),
      h("p", {}, "Total stars: " + t + " / " + max),
      h("div", { class: "row noprint" }, btn("🖨️ Print", () => window.print())));
  }

  // Blank grid for the teacher to fill in by hand
  function classSheet() {
    app.innerHTML = "";
    const secIn = h("input", { type: "text", class: "line", placeholder: "Section / class", "aria-label": "Section" });
    const countIn = h("input", { type: "number", min: "1", max: "80", value: "41", style: "width:90px", "aria-label": "Number of pupils" });
    const holder = h("div");
    function draw() {
      const n = Math.max(1, Math.min(80, parseInt(countIn.value, 10) || 41));
      const head = h("tr", {},
        h("th", { class: "c" }, "#"), h("th", {}, "Pupil name"),
        LEVELS.map((l, i) => h("th", { class: "c" }, "L" + (i + 1))),
        h("th", { class: "c" }, "Pron."), h("th", {}, "Remarks"));
      const body = h("tbody");
      for (let k = 1; k <= n; k++) {
        body.append(h("tr", {},
          h("td", { class: "c" }, String(k)), h("td", { class: "name" }),
          LEVELS.map(() => h("td", {})), h("td", {}), h("td", { class: "rem" })));
      }
      holder.innerHTML = "";
      holder.append(h("table", { class: "sheet tall" }, h("thead", {}, head), body));
    }
    countIn.addEventListener("input", draw);
    app.append(
      ...sheetHeader(SITE.title + " – Class Reading Record"),
      h("p", {}, "Teacher: " + SITE.owner),
      h("div", { class: "row noprint" }, h("label", {}, "Number of pupils: "), countIn),
      h("p", {}, "Section: ", secIn, "      Date: " + new Date().toLocaleDateString()),
      holder,
      h("p", { class: "muted" }, "L1–L8 = Levels (write stars or score). Pron. = teacher's pronunciation rating: E Excellent, G Good, N Needs practice."),
      h("div", { class: "row noprint" }, btn("🖨️ Print", () => window.print())));
    draw();
  }

  document.title = SITE.title;
  const credit = document.getElementById("credit");
  if (credit) credit.textContent = "👩‍🏫 Made with ❤️ by " + SITE.owner;
  document.getElementById("homeBtn").textContent = "📚 " + SITE.title;
  document.getElementById("homeBtn").addEventListener("click", home);
  home();
})();
