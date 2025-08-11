// Sakura petals generator
(function generateSakura() {
  const container = document.getElementById('sakura');
  if (!container) return;
  const PETALS = 26;
  for (let i = 0; i < PETALS; i++) {
    const p = document.createElement('div');
    p.className = 'petal';
    const startX = Math.random() * 100; // vw
    const delay = Math.random() * 8; // s
    const duration = 8 + Math.random() * 10; // s
    const size = 0.7 + Math.random() * 1.3;
    p.style.left = startX + 'vw';
    p.style.top = (-10 - Math.random() * 40) + 'vh';
    p.style.opacity = (0.6 + Math.random() * 0.4).toFixed(2);
    p.style.transform = `scale(${size}) rotate(${Math.random()*180}deg)`;
    p.style.animationDuration = `${duration}s, ${3 + Math.random()*3}s`;
    p.style.animationDelay = `${delay}s, ${delay/2}s`;
    container.appendChild(p);
  }
})();

// Konami code easter egg → show chibi popup for a while
(function konami() {
  const target = ["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a"];
  const buf = [];
  const chibi = document.getElementById('chibi');
  window.addEventListener('keydown', (e) => {
    buf.push(e.key);
    if (buf.length > target.length) buf.shift();
    if (target.every((k, i) => buf[i] && buf[i].toLowerCase() === k.toLowerCase())) {
      if (chibi) {
        chibi.hidden = false;
        chibi.textContent = Math.random() > 0.5 ? '(≧◡≦) ♡' : '(づ｡◕‿‿◕｡)づ';
        setTimeout(() => { chibi.hidden = true; }, 3000);
      }
    }
  });
})();

// Static image background — no motion handling needed

// Simple i18n: RU/EN/JA
(function i18n() {
  const labels = {
    ru: { nicknames: 'никнеймы', name: 'имя', age: 'возраст', telegramId: 'Telegram ID', country: 'страна', humanLangs: 'языки', languages: 'языки программирования', hobbies: 'хобби', userbot: 'userbot' },
    en: { nicknames: 'nicknames', name: 'name', age: 'age', telegramId: 'telegram id', country: 'country', humanLangs: 'languages', languages: 'programming languages', hobbies: 'hobbies', userbot: 'userbot' },
    ja: { nicknames: 'ニックネーム', name: '名前', age: '年齢', telegramId: 'テレグラムID', country: '国', humanLangs: '言語', languages: 'プログラミング言語', hobbies: '趣味', userbot: 'userbot' },
  };
  const values = {
    ru: { nicknames: 'cuteness', name: 'даня', age: '16 (29.07.2009)', telegramId: '6748174500', country: 'США', humanLangs: 'русский, украинский, английский, японский (учу)', languages: 'python', hobbies: 'программирование, аниме, OSINT', userbot: 'I am using userbot of Heroku' },
    en: { nicknames: 'cuteness', name: 'Danya', age: '16 (2009-07-29)', telegramId: '6748174500', country: 'USA', humanLangs: 'russian, ukrainian, english, japanese (learning)', languages: 'python', hobbies: 'coding, anime, OSINT', userbot: 'I am using userbot of Heroku' },
    ja: { nicknames: 'cuteness', name: 'ダニャ', age: '16 (2009-07-29)', telegramId: '6748174500', country: 'アメリカ', humanLangs: 'ロシア語、ウクライナ語、英語、日本語（勉強中）', languages: 'python', hobbies: 'コーディング、アニメ、OSINT', userbot: 'I am using userbot of Heroku' },
  };

  const infoTable = document.getElementById('infoTable');
  const select = document.getElementById('langSelectBio');
  if (!infoTable) return;

  let current = localStorage.getItem('bio_lang') || localStorage.getItem('cuteness_lang') || 'en';
  if (!labels[current]) current = 'ru';
  render(current);
  if (select) {
    select.value = current;
    select.addEventListener('change', () => {
      const lang = select.value in labels ? select.value : 'ru';
      localStorage.setItem('bio_lang', lang);
      render(lang);
    });
  }

  function render(lang) {
    const l = labels[lang];
    const v = values[lang];
    // Localize support button
    const supportBtn = document.getElementById('supportBtn');
    if (supportBtn) {
      supportBtn.textContent = lang === 'ru' ? 'Поддержать' : lang === 'ja' ? '支援' : 'Support';
    }
    const rows = [
      ['nicknames','nicknames'],
      ['name', 'name'],
      ['age', 'age'],
      ['telegramId', 'telegramId'],
      ['country', 'country'],
      ['humanLangs', 'humanLangs'],
      ['languages', 'languages'],
      ['hobbies', 'hobbies'],
      ['userbot','userbot'],
    ];
    infoTable.innerHTML = rows.map(([k]) => `
      <div class="info-row">
        <div class="cell key">${l[k]}</div>
        <div class="cell val ${k === 'telegramId' ? 'copyable' : ''}">${v[k]}</div>
      </div>
    `).join('');
  }
})();

// Brand link: reload page
(function brandReload(){
  const link = document.getElementById('brandLink');
  if (!link) return;
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.reload();
  });
})();

// Support modal open/close and copy buttons
(function supportModal(){
  const modal = document.getElementById('supportModal');
  const openBtn = document.getElementById('supportBtn');
  if (!modal || !openBtn) return;

  const open = () => { modal.hidden = false; requestAnimationFrame(() => modal.classList.add('show')); };
  const close = () => { modal.classList.remove('show'); setTimeout(()=>{ modal.hidden = true; }, 220); };

  openBtn.addEventListener('click', open);
  modal.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) close();
  });

  // Copy handlers
  modal.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-copy]');
    if (!btn) return;
    const sel = btn.getAttribute('data-copy');
    const el = sel ? document.querySelector(sel) : null;
    if (!el) return;
    const text = el.textContent.trim();
    if (!text) return;
    (navigator.clipboard?.writeText(text) || Promise.reject()).then(() => {
      const prev = btn.textContent;
      btn.textContent = 'Copied';
      setTimeout(() => { btn.textContent = prev; }, 1200);
    }).catch(() => {
      // Fallback
      try {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select(); document.execCommand('copy'); document.body.removeChild(ta);
        const prev = btn.textContent; btn.textContent = 'Copied'; setTimeout(() => { btn.textContent = prev; }, 1200);
      } catch(_){}
    });
  });
})();

// Make any value cell copyable (e.g., Telegram ID)
(function copyValueCells(){
  document.addEventListener('click', (e) => {
    const cell = e.target.closest('.val');
    if (!cell) return;
    const text = cell.textContent.trim();
    if (!text) return;
    navigator.clipboard?.writeText(text).then(() => {
      cell.style.opacity = '0.6';
      setTimeout(() => { cell.style.opacity = '0.9'; }, 300);
    });
  });
})();


