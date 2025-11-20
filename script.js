/* ========= script.js for MindEase =========
   Handles tabs, media controls, meditation timer,
   journal system (save/edit/delete/filter), mood chart,
   Clara frontend, voice features, dark mode, PWA registration.
   ========================================== */

(() => {
  // --------- Helpers ----------
  const $ = (sel, parent=document) => parent.querySelector(sel);
  const $$ = (sel, parent=document) => Array.from(parent.querySelectorAll(sel));

  // ------- Tabs ----------
  function openTab(tabName) {
    const tabs = document.getElementsByClassName('tabcontent');
    for (let tab of tabs) tab.style.display = 'none';

    pauseAllMedia();
    resetMeditationTimer();

    const el = document.getElementById(tabName);
    if (el) el.style.display = 'block';

    // load journals only when journal tab active
    if (tabName === 'journal') loadJournals();
    // update chart when analytics opened
    if (tabName === 'analysis') renderChart();
  }

  // Setup tab buttons
  document.addEventListener('DOMContentLoaded', () => {
    // wire nav buttons
    $$('.tablink').forEach(btn => {
      btn.addEventListener('click', e => {
        const t = btn.dataset.tab || btn.getAttribute('data-tab');
        if (t) openTab(t);
      });
    });

    // hero CTA buttons
    $$('[data-tab-target]').forEach(b => {
      b.addEventListener('click', () => {
        const t = b.getAttribute('data-tab-target');
        if (t) openTab(t);
      });
    });

    // default
    openTab('home');

    // other setup
    setupMediaControls();
    setupMeditation();
    setupJournalControls();
    setupChat();
    setupDarkMode();
    registerServiceWorker();
  });

  // ------- Media controls --------
  function pauseAllMedia() {
    $$('audio, video').forEach(m => {
      try { m.pause(); if (m.currentTime) m.currentTime = 0; } catch(e){}
    });
  }

  function setupMediaControls() {
    const all = $$('audio, video');
    all.forEach(media => {
      media.addEventListener('play', () => {
        all.forEach(other => { if (other !== media) other.pause(); });
      });
    });
  }

  // ------- Meditation ----------
  let medInterval = null;
  let medSeconds = 300;
  function setupMeditation(){
    const startBtn = $('#startMeditation');
    const stopBtn = $('#stopMeditation');
    const voiceBtn = $('#startVoiceMeditation');

    if (startBtn) startBtn.addEventListener('click', startMeditation);
    if (stopBtn) stopBtn.addEventListener('click', resetMeditationTimer);

    // voice guided (simple)
    if (voiceBtn) voiceBtn.addEventListener('click', () => {
      speak("Close your eyes. Breathe in slowly for four counts. Hold for two. Exhale for four. Repeat.");
    });

    // reset on tab hidden
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) resetMeditationTimer();
    });
  }

  function startMeditation(){
    const display = $('#timerDisplay');
    clearInterval(medInterval);
    medSeconds = 300;
    display.textContent = formatTime(medSeconds);
    medInterval = setInterval(() => {
      medSeconds--;
      display.textContent = formatTime(medSeconds);
      if (medSeconds <= 0){
        clearInterval(medInterval);
        display.textContent = "✅ Time's up! Great job staying mindful!";
        speak("Well done. You completed your mindfulness session.");
      }
    },1000);
  }

  function resetMeditationTimer(){
    clearInterval(medInterval);
    medSeconds = 300;
    const display = $('#timerDisplay');
    if (display) display.textContent = "⏸️ Meditation stopped. Please start again.";
  }

  function formatTime(s){ const m=Math.floor(s/60); const sec=s%60; return `⏳ ${m}:${sec<10?'0':''}${sec}`; }

  // ------- Journal System ----------
  const JOURNAL_KEY = 'mindease_journals_v1';
  let autosaveTimer = null;

  function setupJournalControls(){
    const saveBtn = $('#saveJournal');
    const clearBtn = $('#clearJournals');
    const input = $('#journalInput');
    const search = $('#journalSearch');
    const moodSel = $('#journalMood');

    if (saveBtn) saveBtn.addEventListener('click', onSaveJournal);
    if (clearBtn) clearBtn.addEventListener('click', onClearJournals);
    if (search) search.addEventListener('input', () => loadJournals());
    if (moodSel) moodSel.addEventListener('change', () => loadJournals());

    // autosave draft
    if (input){
      input.addEventListener('input', () => {
        document.getElementById('autosaveNote').textContent = 'Autosave: saving...';
        clearTimeout(autosaveTimer);
        autosaveTimer = setTimeout(() => {
          localStorage.setItem('mindease_draft', input.value);
          document.getElementById('autosaveNote').textContent = 'Autosave: saved';
        }, 700);
      });

      // load draft if available
      const draft = localStorage.getItem('mindease_draft');
      if (draft) input.value = draft;
    }
  }

  function onSaveJournal(){
    const textEl = $('#journalInput');
    const mood = $('#journalMood') ? $('#journalMood').value : 'any';
    const text = textEl.value.trim();
    if (!text) { alert('Please write something first!'); return; }

    const journals = JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');
    const entry = {
      id: Date.now(),
      text,
      mood,
      created: new Date().toLocaleString()
    };
    journals.unshift(entry);
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(journals));
    // remove draft
    localStorage.removeItem('mindease_draft');
    $('#journalInput').value = '';
    document.getElementById('autosaveNote').textContent = 'Autosave: not saved';
    loadJournals();
    renderChart();
  }

  function onClearJournals(){
    if (!confirm('Delete all journal entries? This cannot be undone.')) return;
    localStorage.removeItem(JOURNAL_KEY);
    loadJournals();
    renderChart();
  }

  function loadJournals(){
    const list = $('#journalList');
    if (!list) return;
    const journals = JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');
    const search = $('#journalSearch') ? $('#journalSearch').value.toLowerCase() : '';
    const moodFilter = $('#journalMood') ? $('#journalMood').value : 'any';

    list.innerHTML = '';
    journals.forEach((entry, idx) => {
      const matchesSearch = entry.text.toLowerCase().includes(search) || entry.created.toLowerCase().includes(search);
      const matchesMood = (moodFilter === 'any') || (entry.mood === moodFilter);
      if (!matchesSearch || !matchesMood) return;

      const li = document.createElement('li');
      li.className = 'journal-item';

      const left = document.createElement('div');
      left.style.flex = '1';
      const content = document.createElement('div');
      content.innerText = entry.text;
      const meta = document.createElement('div');
      meta.className = 'meta';
      meta.innerText = `${entry.mood} • ${entry.created}`;

      left.appendChild(content);
      left.appendChild(meta);

      const actions = document.createElement('div');
      actions.className = 'actions';

      const editBtn = document.createElement('button');
      editBtn.className = 'edit-btn';
      editBtn.innerText = '✏️';
      editBtn.title = 'Edit entry';
      editBtn.addEventListener('click', () => editJournal(entry.id));

      const delBtn = document.createElement('button');
      delBtn.className = 'delete-btn';
      delBtn.innerText = '🗑️';
      delBtn.title = 'Delete entry';
      delBtn.addEventListener('click', () => deleteJournal(entry.id));

      actions.appendChild(editBtn);
      actions.appendChild(delBtn);

      li.appendChild(left);
      li.appendChild(actions);
      list.appendChild(li);
    });
  }

  function editJournal(id){
    const journals = JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');
    const idx = journals.findIndex(j => j.id === id);
    if (idx < 0) return;
    const entry = journals[idx];
    $('#journalInput').value = entry.text;
    $('#journalMood').value = entry.mood || 'any';
    // delete the old entry; user will save to update
    journals.splice(idx,1);
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(journals));
    loadJournals();
  }

  function deleteJournal(id){
    let journals = JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');
    journals = journals.filter(j => j.id !== id);
    localStorage.setItem(JOURNAL_KEY, JSON.stringify(journals));
    loadJournals();
    renderChart();
  }

  // ------- Chart / Analytics ----------
  let chartInstance = null;
  function renderChart(){
    const ctx = document.getElementById('moodChart');
    if (!ctx) return;
    const journals = JSON.parse(localStorage.getItem(JOURNAL_KEY) || '[]');

    // collect counts by mood for last 7 entries (or all)
    const moodCounts = {};
    journals.forEach(j => {
      const m = j.mood || 'unknown';
      moodCounts[m] = (moodCounts[m] || 0) + 1;
    });
    const labels = Object.keys(moodCounts).length ? Object.keys(moodCounts) : ['No data'];
    const data = labels.map(l => moodCounts[l] || 0);

    if (chartInstance) chartInstance.destroy();
    chartInstance = new Chart(ctx, {
      type:'bar',
      data:{labels, datasets:[{label:'Entries by Mood', data, backgroundColor:'rgba(70,33,26,0.6)'}]},
      options:{plugins:{legend:{display:false}},scales:{y:{beginAtZero:true}}}
    });

    const avg = computeAverageMood(journals);
    $('#insightBox').innerHTML = `💡 Entries: <b>${journals.length}</b> • ${avg ? 'Average mood: ' + avg : 'Add entries to see trends'}`;
  }

  // very simple mood average mapping
  function computeAverageMood(journals){
    if (!journals.length) return null;
    const map = {'😊':5,'😐':3,'😢':1,'😡':0,'😴':2};
    let total=0,count=0;
    journals.forEach(j=>{
      if (map[j.mood]!==undefined){ total += map[j.mood]; count++; }
    });
    return count ? (Math.round((total/count)*10)/10) : null;
  }

  // ------- Clara Chat (frontend rule-based with voice) ----------
  function setupChat(){
    const sendBtn = $('#sendBtn');
    const userMsg = $('#userMsg');
    const voiceBtn = $('#voiceBtn');
    const chatWindow = $('#chatWindow');

    if (sendBtn) sendBtn.addEventListener('click', sendToClara);
    if (userMsg) userMsg.addEventListener('keydown', e => { if (e.key==='Enter') sendToClara(); });

    // voice input
    if (voiceBtn){
      voiceBtn.addEventListener('click', () => {
        startSpeechRecognition().then(text => {
          if (text) {
            $('#userMsg').value = text;
            sendToClara();
          }
        }).catch(()=>{ alert('Speech recognition not available'); });
      });
    }

    // open chat button
    $('#openChatBtn')?.addEventListener('click', () => openTab('chat'));
  }

  function appendChat(who, text){
    const win = $('#chatWindow');
    if (!win) return;
    const div = document.createElement('div');
    div.className = 'chat-bubble ' + (who==='user' ? 'chat-user':'chat-clara');
    div.innerHTML = `<strong>${who==='user'?'You':'Clara'}:</strong> <div>${escapeHtml(text)}</div>`;
    win.appendChild(div);
    win.scrollTop = win.scrollHeight;
  }

  function sendToClara(){
    const input = $('#userMsg');
    if (!input) return;
    const text = input.value.trim();
    if (!text) return;
    appendChat('user', text);
    input.value = '';

    // simple rule-based replies (extend or replace with API call)
    const txt = text.toLowerCase();
    let reply = "I'm here to listen. Tell me how you're feeling.";
    if (txt.includes('hello') || txt.includes('hi')) reply = "Hello! How are you feeling today?";
    else if (txt.includes('sad') || txt.includes('depressed')) reply = "I'm sorry you're feeling sad. Take a slow breath with me.";
    else if (txt.includes('stress') || txt.includes('anx')) reply = "Let's try a quick breathing exercise — breathe in for 4, out for 4.";
    else if (txt.includes('help')) reply = "You can try journaling for a minute, or try the 5-minute meditation.";
    // speak reply
    appendChat('clara', reply);
    speak(reply);
  }

  // ------- Voice utilities (speech recognition + synth) ----------
  function startSpeechRecognition(){
    return new Promise((resolve, reject) => {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (!SpeechRecognition) return reject();
      const rec = new SpeechRecognition();
      rec.lang = 'en-US';
      rec.interimResults = false;
      rec.maxAlternatives = 1;
      rec.onresult = e => resolve(e.results[0][0].transcript);
      rec.onerror = () => reject();
      rec.start();
    });
  }

  function speak(text){
    if (!('speechSynthesis' in window)) return;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'en-US';
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(u);
  }

  // ------- Dark mode ----------
  function setupDarkMode(){
    const toggle = $('#darkToggle');
    const saved = localStorage.getItem('mindease_dark') === '1';
    if (saved) document.body.classList.add('dark');

    if (toggle){
      toggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        localStorage.setItem('mindease_dark', document.body.classList.contains('dark') ? '1' : '0');
      });
    }
  }

  // ------- PWA: register service worker ----------
  function registerServiceWorker(){
    if ('serviceWorker' in navigator){
      navigator.serviceWorker.register('sw.js').catch(()=>{ /* ignore */ });
    }
  }

  // ------- Utilities ----------
  function escapeHtml(str){
    return str.replace(/[&<>"']/g, (m) => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
  }

})();
