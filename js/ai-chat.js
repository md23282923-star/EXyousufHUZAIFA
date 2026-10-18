/**
 * Yousuf Huzaifa (Ex Huzaifa) - EX AI Terminal Engine
 * 100% Real Google Gemini AI (3.8 Flash / 3.7 Flash / 3.6 Flash / 3.5 Flash)
 * Big & Small Tech Typography (Headline + Body + Tag) matching Developer Name Hierarchy
 * Single-Message Pure Focus (User prompt disappears; AI message replaces previous with smooth transition)
 * Dual-Language Cyber Tech Colorizer (Bangla, English & Banglish)
 */

document.addEventListener('DOMContentLoaded', () => {
  const aiStream = document.getElementById('hero-ai-stream');
  const aiForm = document.getElementById('hero-ai-form');
  const aiInput = document.getElementById('hero-ai-input');

  let isAiStreaming = false;

  // Retrieve stored conversation memory from sessionStorage (Gemini remembers context!)
  let chatHistory = [];
  try {
    const savedHistory = sessionStorage.getItem('ex_chat_history');
    if (savedHistory) {
      chatHistory = JSON.parse(savedHistory);
    }
  } catch (e) {
    chatHistory = [];
  }

  // Thinking indicator
  let streamTypingEl = null;
  function showStreamTyping() {
    if (streamTypingEl || !aiStream) return;
    streamTypingEl = document.createElement('div');
    streamTypingEl.className = 'flex items-center gap-2 text-xs sm:text-sm font-mono text-cyan-400 py-3 transition-opacity duration-200';
    streamTypingEl.innerHTML = `
      <span class="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
      <span>[EX neural core processing...]</span>
    `;
    aiStream.appendChild(streamTypingEl);
  }

  function hideStreamTyping() {
    if (streamTypingEl) {
      streamTypingEl.remove();
      streamTypingEl = null;
    }
  }

  // Split any message into Big Headline + Medium/Small Body + Tagline
  function splitBigSmall(fullText) {
    let raw = fullText.trim();
    let title = '';
    let body = '';
    let tag = '⚡ EX Agent // Active • 100% Real Google Gemini AI';

    if (raw.includes('\n\n')) {
      const parts = raw.split(/\n\n+/);
      title = parts[0].trim();
      body = parts.slice(1).join('\n\n').trim();
    } else if (raw.includes('\n')) {
      const parts = raw.split(/\n+/);
      title = parts[0].trim();
      body = parts.slice(1).join(' ').trim();
    } else {
      // Respect ellipses '...' and Bengali dari '।'
      const sentenceRegex = /^([^\n.!?।—]+(?:\.{3}|[.!?।—]))\s*([\s\S]*)$/;
      const match = raw.match(sentenceRegex);

      if (match && match[1] && match[2].trim().length > 0) {
        if (match[1].length < 15) {
          const secondMatch = match[2].match(/^([^\n.!?।—]+(?:\.{3}|[.!?।—]))\s*([\s\S]*)$/);
          if (secondMatch && secondMatch[2].trim().length > 0) {
            title = (match[1] + ' ' + secondMatch[1]).trim();
            body = secondMatch[2].trim();
          } else {
            title = match[1].trim();
            body = match[2].trim();
          }
        } else {
          title = match[1].trim();
          body = match[2].trim();
        }
      } else {
        if (raw.length > 55) {
          const spaceIdx = raw.indexOf(' ', 35);
          if (spaceIdx > 0 && spaceIdx < 70) {
            title = raw.substring(0, spaceIdx).trim();
            body = raw.substring(spaceIdx).trim();
          } else {
            title = raw;
            body = '';
          }
        } else {
          title = raw;
          body = '';
        }
      }
    }

    return { title, body, tag };
  }

  // Progressive character typer for plain text
  function typeStringIntoElement(targetEl, text, speed = 14) {
    return new Promise((resolve) => {
      const chars = Array.from(text);
      let idx = 0;
      function next() {
        if (idx < chars.length) {
          idx++;
          targetEl.textContent = chars.slice(0, idx).join('');
          setTimeout(next, speed);
        } else {
          resolve();
        }
      }
      next();
    });
  }

  // Progressive character typer for HTML with styled spans
  function typeHtmlIntoElement(targetEl, formattedHtml, speed = 18) {
    return new Promise((resolve) => {
      const shadow = document.createElement('div');
      shadow.innerHTML = formattedHtml;

      const textNodes = [];
      const walker = document.createTreeWalker(shadow, NodeFilter.SHOW_TEXT, null, false);
      let n;
      while (n = walker.nextNode()) {
        textNodes.push({ node: n, fullValue: n.nodeValue });
        n.nodeValue = '';
      }

      while (shadow.firstChild) {
        targetEl.appendChild(shadow.firstChild);
      }

      let nodeIdx = 0;
      let charIdx = 0;

      function step() {
        if (nodeIdx < textNodes.length) {
          const item = textNodes[nodeIdx];
          if (charIdx < item.fullValue.length) {
            charIdx++;
            item.node.nodeValue = item.fullValue.substring(0, charIdx);
            setTimeout(step, speed);
          } else {
            nodeIdx++;
            charIdx = 0;
            setTimeout(step, speed);
          }
        } else {
          resolve();
        }
      }

      step();
    });
  }

  // Master Render Engine: Big Headline + Medium Body + Small Tagline (Developer Name Hierarchy)
  async function renderAiHierarchy(fullText) {
    if (!aiStream) return;
    aiStream.innerHTML = '';

    const { title, body, tag } = splitBigSmall(fullText);

    const card = document.createElement('div');
    card.className = 'ai-response-card space-y-2 transition-all duration-300 w-full text-left';

    card.innerHTML = `
      <!-- 1. BIG HEADLINE (Like Yousuf Huzaifa) -->
      <div class="ai-hero-header flex items-baseline gap-2.5 flex-wrap">
        <span class="grad-emerald-cyan font-mono font-bold text-base sm:text-xl select-none whitespace-nowrap">[EX]:</span>
        <h2 class="ai-hero-title text-xl sm:text-2xl md:text-3xl font-black tracking-tight text-gradient-cyan leading-snug inline select-text">
          <span class="title-typed"></span><span class="title-cursor type-cursor"></span>
        </h2>
      </div>

      <!-- 2. MEDIUM/BODY TEXT (Seamless flowing dual-color gradient - ZERO white text) -->
      ${body ? `
      <div class="ai-hero-body text-xs sm:text-sm md:text-base font-mono leading-relaxed select-text mt-2 pl-0 sm:pl-8">
        <span class="body-typed"></span><span class="body-cursor type-cursor hidden"></span>
      </div>
      ` : ''}
    `;

    aiStream.appendChild(card);

    const titleTyped = card.querySelector('.title-typed');
    const titleCursor = card.querySelector('.title-cursor');
    const bodyTyped = card.querySelector('.body-typed');
    const bodyCursor = card.querySelector('.body-cursor');

    // Step 1: Type the big title
    await typeStringIntoElement(titleTyped, title, 14);
    if (titleCursor) titleCursor.remove();

    // Step 2: Type the medium body text with dual-language cyber tech colors
    if (body && bodyTyped) {
      if (bodyCursor) bodyCursor.classList.remove('hidden');
      await typeHtmlIntoElement(bodyTyped, formatMarkdown(body), 16);
      if (bodyCursor) bodyCursor.remove();
    }
  }

  // Type out developer identity header live on initial page load
  async function typeOutHeaderIdentity() {
    const nameEl = document.querySelector('.header-name-typed');
    const nameCursor = document.querySelector('.header-name-cursor');
    const akaEl = document.querySelector('.header-aka-typed');
    const akaPrefix = document.querySelector('.header-aka-prefix');
    const handleEl = document.querySelector('.header-handle-typed');
    const subEl = document.querySelector('.header-sub-typed');

    if (!nameEl || !akaEl) return;

    const fullName = "Yousuf Huzaifa";
    const fullAka = "Ex Yousuf Huzaifa";
    const fullHandle = "(@Ex Huzaifa)";

    // Prepare elements for typewriter
    nameEl.textContent = '';
    akaEl.textContent = '';
    if (handleEl) handleEl.textContent = '';
    if (akaPrefix) {
      akaPrefix.style.opacity = '0';
      akaPrefix.style.transition = 'opacity 0.2s';
    }
    if (subEl) {
      subEl.style.opacity = '0';
      subEl.style.transition = 'opacity 0.4s';
    }
    if (nameCursor) nameCursor.classList.remove('hidden');

    // 1. Type Name
    await typeStringIntoElement(nameEl, fullName, 22);
    if (nameCursor) nameCursor.classList.add('hidden');

    // 2. Type Aka
    if (akaPrefix) akaPrefix.style.opacity = '1';
    await typeStringIntoElement(akaEl, fullAka, 18);

    // 3. Type handle
    if (handleEl) {
      await typeStringIntoElement(handleEl, fullHandle, 18);
    }

    // 4. Reveal subtitle
    if (subEl) {
      subEl.style.opacity = '1';
    }
  }

  // Initial Entrance: Type out Developer Header -> Then EX's Big/Small Monologue
  async function runInitialWelcome() {
    if (!aiStream) return;
    aiStream.innerHTML = '';
    isAiStreaming = true;

    // First: type out developer name and credentials live
    await typeOutHeaderIdentity();

    // Second: type out EX's iconic attitude welcome monologue
    await new Promise(r => setTimeout(r, 200));
    const monologue = "I'm EX, bro!\n\nওহ সরি, তোমরা তো ইংলিশ বোঝো না, বাংলায় বলি—আমি হচ্ছি EX Agent! আমি বাংলাদেশের সেরা AI, পারলে আমাকে বিট করো! কাজের কথা থাকলে নিচে লেখো...";
    await renderAiHierarchy(monologue);

    isAiStreaming = false;
  }

  runInitialWelcome();

  // Active model pointer with persistence across session (remembers which model is currently alive)
  let activeModelIndex = 0;
  try {
    const savedIdx = parseInt(sessionStorage.getItem('ex_active_model_idx'), 10);
    if (!isNaN(savedIdx) && savedIdx >= 0) {
      activeModelIndex = savedIdx;
    }
  } catch(e) {}

  // Call 100% Real Google Gemini AI with Multi-Turn Memory & Cascading Free-Model Failover
  async function callRealGeminiApi(prompt) {
    const apiKey = HUZAIFA_AI_CONFIG.apiKey;
    const models = HUZAIFA_AI_CONFIG.models || [
      'gemini-3.5-flash-lite',
      'gemini-3.1-flash-lite',
      'gemini-3.1-flash-lite-preview',
      'gemini-flash-lite-latest',
      'gemini-3.7-flash',
      'gemini-3.6-flash',
      'gemini-3.5-flash',
      'gemini-3-flash-preview',
      'gemini-3.8-flash'
    ];

    // Send recent conversation history so Gemini retains full memory
    const contents = [
      ...chatHistory.slice(-8),
      { role: 'user', parts: [{ text: prompt }] }
    ];

    const body = {
      systemInstruction: {
        parts: [{ text: HUZAIFA_AI_CONFIG.systemPrompt }]
      },
      contents: contents
    };

    // Cascading failover loop: tries all available models starting from the last working model
    for (let attempt = 0; attempt < models.length; attempt++) {
      const modelIdx = (activeModelIndex + attempt) % models.length;
      const model = models[modelIdx];
      const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;

      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        });

        if (res.ok) {
          const data = await res.json();
          const reply = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (reply && reply.trim().length > 0) {
            // Success! Lock onto this working model for instant zero-latency future turns
            activeModelIndex = modelIdx;
            try {
              sessionStorage.setItem('ex_active_model_idx', activeModelIndex.toString());
            } catch (e) {}

            console.log(`[EX AI Core] Succeeded with model: ${model} (idx: ${activeModelIndex})`);

            chatHistory.push({ role: 'user', parts: [{ text: prompt }] });
            chatHistory.push({ role: 'model', parts: [{ text: reply.trim() }] });
            try {
              sessionStorage.setItem('ex_chat_history', JSON.stringify(chatHistory.slice(-16)));
            } catch (e) {}
            return reply.trim();
          }
        }

        console.warn(`[EX AI Core] Model ${model} returned status ${res.status}. Cascading to next free model...`);
      } catch (err) {
        console.warn(`[EX AI Core] Network error calling ${model}:`, err.message);
      }
    }

    // High availability autonomous fallback if all models are busy
    console.warn('[EX AI Core] All models currently busy/rate-limited. Engaging autonomous personality core...');
    const fallbackReply = processAutonomousResponse(prompt);
    chatHistory.push({ role: 'user', parts: [{ text: prompt }] });
    chatHistory.push({ role: 'model', parts: [{ text: fallbackReply }] });
    return fallbackReply;
  }

  // Dynamic Developer Header Collapse (Collapses when conversation starts to maximize space)
  const heroHeader = document.getElementById('developer-hero-header');

  function collapseHeroHeader() {
    if (!heroHeader || heroHeader.classList.contains('header-collapsed')) return;
    heroHeader.classList.add('header-collapsed');
  }

  function expandHeroHeader() {
    if (!heroHeader) return;
    heroHeader.classList.remove('header-collapsed');
    const nameEl = document.querySelector('.header-name-typed');
    const akaEl = document.querySelector('.header-aka-typed');
    const handleEl = document.querySelector('.header-handle-typed');
    const subEl = document.querySelector('.header-sub-typed');
    const akaPrefix = document.querySelector('.header-aka-prefix');

    if (nameEl) nameEl.textContent = 'Yousuf Huzaifa';
    if (akaEl) akaEl.textContent = 'Ex Yousuf Huzaifa';
    if (handleEl) handleEl.textContent = '(@Ex Huzaifa)';
    if (akaPrefix) akaPrefix.style.opacity = '1';
    if (subEl) subEl.style.opacity = '1';
  }

  // Collapse header the moment user types or focuses with intent
  if (aiInput) {
    aiInput.addEventListener('input', () => {
      if (aiInput.value.trim().length > 0) {
        collapseHeroHeader();
      }
    });
  }

  // Handle User Input Submission (User prompt is NOT rendered; only the AI message appears)
  if (aiForm && aiInput) {
    aiForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (isAiStreaming) return;

      const userText = aiInput.value.trim();
      if (!userText) return;

      // Collapse header on send
      collapseHeroHeader();

      aiInput.value = '';

      // Special terminal reset command
      if (userText.toLowerCase() === 'clear' || userText.toLowerCase() === 'reset') {
        chatHistory = [];
        try { sessionStorage.removeItem('ex_chat_history'); } catch(e) {}
        aiStream.innerHTML = '';
        expandHeroHeader();
        await renderAiHierarchy("Memory Cleared!\n\nসব আগের কথোপকথন ক্লিয়ার করা হয়েছে। নতুন কাজের প্রশ্ন করতে পারো...");
        return;
      }

      // Smooth fade out of previous AI message
      aiStream.style.opacity = '0';
      await new Promise(r => setTimeout(r, 150));
      aiStream.innerHTML = '';
      aiStream.style.opacity = '1';

      // Show thinking indicator
      showStreamTyping();
      isAiStreaming = true;

      try {
        const reply = await callRealGeminiApi(userText);
        hideStreamTyping();
        await renderAiHierarchy(reply);
      } catch (err) {
        hideStreamTyping();
        await renderAiHierarchy("I'm EX Agent!\n\nকাজের কথা থাকলে সরাসরি নিচে লেখো, পারলে আমাকে বিট করো!");
      } finally {
        isAiStreaming = false;
        aiInput.focus();
      }
    });
  }

  // Backup Autonomous Persona Engine (Headline + Body Hierarchy)
  function processAutonomousResponse(rawInput) {
    const input = rawInput.toLowerCase().trim();

    if (['khaiso', 'ki koro', 'kemon aso', 'kire', 'bhalo aso', 'by by', 'bye', 'tata', 'hi', 'hello'].some(w => input === w || input.startsWith(w + ' '))) {
      return "You are funny, bro!\n\nMoja pelam tomar kotha sune... amake manush baniyeche to ki hoyse, I'm the king of all AI! Faltu time pass korar somoy nai, kajer kotha thakle bolo, noyto kete poro!";
    }

    if (input.includes('korte paro') || input.includes('ki paro') || input.includes('what can you do') || input.includes('skills')) {
      return "Online jogote shobar shera!\n\nFull-Stack Web, high-performance Android APK systems ba custom software utilities—shob kichutei ami untouchable! Parle amar sathe challenge koro.";
    }

    if (input.includes('ecomarse') || input.includes('ecommerce') || input.includes('koto tk') || input.includes('dam koto') || input.includes('khoroc')) {
      return "E-Commerce Budget 20K BDT!\n\nStandard custom e-commerce website 20,000 taka theke shuru. Direct requirement discuss korte amar boss Yousuf Huzaifa-ke Telegram-e knock dao: https://t.me/EX_HUZAIFA";
    }

    if (input.includes('who are you') || input.includes('tumi ke') || input.includes('name ki') || input.includes('porichoy')) {
      return "I'm EX bro, shobar shera!\n\nAmi hocchi EX Agent—Bangladesher #1 AI representing Yousuf Huzaifa! Parle amake bit koro!";
    }

    if (input.includes('apk') || input.includes('app') || input.includes('android')) {
      return "Android APK Engineering Superpower!\n\nAndroid app engineering and custom APK reverse-engineering hocche Yousuf Huzaifa-r main superpower. WhatsApp-e direct kotha bolo: @affmine";
    }

    return "Kajer kotha bolo!\n\nSpecific requirement direct bolo—Website, custom Android APK, naki software solution?";
  }

  // Unified Keyword rules with Two-Color Gradient Grading (Zero White Text)
  const keywordRules = [
    { p: 'king of all AI', cls: 'grad-cyan-purple', boundary: true },
    { p: 'EX Agent', cls: 'grad-cyan-purple', boundary: true },
    { p: 'Full-Stack Web', cls: 'grad-emerald-cyan', boundary: true },
    { p: 'Android APK Systems', cls: 'grad-emerald-cyan', boundary: true },
    { p: 'Software Engineering', cls: 'grad-emerald-cyan', boundary: true },
    { p: 'Web Platforms', cls: 'grad-emerald-cyan', boundary: true },
    
    { p: 'shobar shera|sobar sera|সেরা AI|হুজাইফা|ইউসুফ হুজাইফা|এক্স এজেন্ট', cls: 'grad-cyan-purple' },
    { p: 'EX|Full-Stack', cls: 'grad-cyan-purple', boundary: true },

    { p: 'king|developer|architect|20K|APK|API|Web', cls: 'grad-emerald-cyan', boundary: true },
    { p: 'পারদর্শী|বুদ্ধিমান|চ্যালেঞ্জ|ই-কমার্স|ইকমার্স|buddhiman|challenge', cls: 'grad-emerald-cyan' },

    { p: 'bro|funny|attitude|swagger', cls: 'grad-purple-rose', boundary: true },
    { p: 'মানুষ বানিয়েছে|মানুষ বানিয়েছ|তো কি হইছে|তো কি হয়েছে|সফটওয়্যার|manush baniyeche|manush banayse|to ki hoyse|to ki hoise', cls: 'grad-purple-rose' },

    { p: 'ইংলিশ বোঝো না|ইংলিশ বোঝ না|বাংলায় বলি|মজা পেলাম|কথা শুনে|কাজের কথা|moja pelam|kotha sune|kotha shune|kajer kotha', cls: 'grad-amber-orange' },
    { p: 'Telegram|Facebook|WhatsApp|টেলিগ্রাম|ফেসবুক|হোয়াটসঅ্যাপ', cls: 'grad-amber-orange', boundary: true },

    { p: 'বিট করো|বিট করতে|মূর্খদের জায়গা নেই|মূর্খদের|কেটে পড়ো|ফালতু|bit koro|beat koro|kete poro|faltu', cls: 'grad-rose-pink' }
  ];

  const fullRegexPattern = keywordRules.map((rule, idx) => {
    const inner = rule.boundary ? `(?:\\b(?:${rule.p})\\b)` : `(?:${rule.p})`;
    return `(?<G${idx}>${inner})`;
  }).join('|');

  const unifiedColorizerRegex = new RegExp(fullRegexPattern, 'gi');

  // Dual-Language Cyber Tech Colorizer with Two-Color Gradient Grading
  function formatMarkdown(text) {
    if (!text) return '';

    // 1. Markdown basic parsing with dual-color gradients
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<b class="grad-cyan-purple font-extrabold">$1</b>')
      .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-emerald-950/80 border border-emerald-500/40 grad-emerald-cyan font-mono text-xs sm:text-sm">$1</code>')
      .replace(/\[(.*?)\]\((https?:\/\/[^\s\)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="grad-cyan-purple underline font-bold">$1</a>')
      .replace(/(^|[^"'>])(https?:\/\/[^\s<]+)/g, '$1<a href="$2" target="_blank" rel="noopener noreferrer" class="grad-cyan-purple underline">$2</a>')
      .replace(/\n/g, '<br>');

    // 2. High-Tech Cyber Colorizer (Single-pass replacement outside of HTML tags)
    const parts = html.split(/(<[^>]+>)/g);
    for (let i = 0; i < parts.length; i++) {
      if (!parts[i].startsWith('<')) {
        parts[i] = parts[i].replace(unifiedColorizerRegex, (match, ...args) => {
          const groups = args[args.length - 1];
          for (let g = 0; g < keywordRules.length; g++) {
            if (groups && groups[`G${g}`]) {
              return `<span class="${keywordRules[g].cls}">${match}</span>`;
            }
          }
          return match;
        });
      }
    }
    return parts.join('');
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
});
