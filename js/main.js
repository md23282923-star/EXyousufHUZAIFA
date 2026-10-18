/**
 * Yousuf Huzaifa (Ex Yousuf Huzaifa / Ex Huzaifa)
 * High-End Cybernetic Developer OS & Interactive Experience
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // 2. Synthesized Web Audio Engine (Zero External Files, 100% Browser Native)
  let audioCtx = null;
  let audioEnabled = localStorage.getItem('huzaifa_audio_enabled') === 'true';

  function initAudio() {
    if (!audioCtx) {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        audioCtx = new AudioContextClass();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  function playSynthSound(freqStart, freqEnd, type, duration, gainLevel = 0.04) {
    if (!audioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = type; // 'sine', 'triangle', 'sawtooth'
      const now = audioCtx.currentTime;

      osc.frequency.setValueAtTime(freqStart, now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(freqEnd, 20), now + duration);

      gain.gain.setValueAtTime(gainLevel, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      osc.start(now);
      osc.stop(now + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  const soundFx = {
    click: () => playSynthSound(800, 300, 'sine', 0.06, 0.05),
    hover: () => playSynthSound(450, 600, 'sine', 0.04, 0.015),
    success: () => {
      playSynthSound(440, 880, 'triangle', 0.12, 0.05);
      setTimeout(() => playSynthSound(880, 1320, 'sine', 0.15, 0.05), 80);
    },
    terminal: () => playSynthSound(1200, 400, 'sawtooth', 0.05, 0.02),
    openModal: () => playSynthSound(300, 750, 'sine', 0.1, 0.04)
  };

  // Sound Toggle UI
  const soundToggleBtn = document.getElementById('sound-toggle-btn');
  const soundStatusText = document.getElementById('sound-status-text');
  const soundWave = document.getElementById('sound-wave');

  function updateAudioUI() {
    if (audioEnabled) {
      if (soundStatusText) soundStatusText.textContent = 'Audio: ON';
      if (soundWave) soundWave.classList.remove('opacity-30');
    } else {
      if (soundStatusText) soundStatusText.textContent = 'Audio: OFF';
      if (soundWave) soundWave.classList.add('opacity-30');
    }
  }
  updateAudioUI();

  if (soundToggleBtn) {
    soundToggleBtn.addEventListener('click', () => {
      initAudio();
      audioEnabled = !audioEnabled;
      localStorage.setItem('huzaifa_audio_enabled', audioEnabled);
      updateAudioUI();
      if (audioEnabled) soundFx.success();
    });
  }

  // Bind audio to clickable buttons and interactive items
  document.querySelectorAll('a, button, .interactive-click').forEach(el => {
    el.addEventListener('mouseenter', () => soundFx.hover());
    el.addEventListener('click', () => soundFx.click());
  });

  // 3. Live System Telemetry HUD (Dhaka Time & Ping)
  const telemetryTime = document.getElementById('telemetry-time');
  const telemetryPing = document.getElementById('telemetry-ping');

  function updateTelemetryClock() {
    if (telemetryTime) {
      const now = new Date();
      // Format time in Dhaka (GMT+6)
      const options = { timeZone: 'Asia/Dhaka', hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' };
      telemetryTime.textContent = now.toLocaleTimeString('en-GB', options) + ' BST';
    }
  }
  updateTelemetryClock();
  setInterval(updateTelemetryClock, 1000);

  // Fluctuating real ping
  if (telemetryPing) {
    setInterval(() => {
      const randPing = Math.floor(Math.random() * 6) + 12; // 12ms - 17ms
      telemetryPing.textContent = randPing + 'ms';
    }, 3000);
  }

  // 4. Typing Effect for Hero Title
  const typedTarget = document.getElementById('typing-text');
  if (typedTarget) {
    const roles = [
      'Full-Stack Web Architect',
      'Android APK & Systems Engineer',
      'Custom Software & POS Developer',
      'Bot & Workflow Automation Specialist',
      'High-Speed API & Database Designer'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
      const currentRole = roles[roleIndex];
      if (isDeleting) {
        typedTarget.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 45;
      } else {
        typedTarget.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
      }

      if (!isDeleting && charIndex === currentRole.length) {
        typingSpeed = 2200;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        typingSpeed = 350;
      }

      setTimeout(typeLoop, typingSpeed);
    }
    typeLoop();
  }

  // 5. 3D Holographic Perspective Tilt Engine
  const tiltCards = document.querySelectorAll('.tilt-card');
  tiltCards.forEach(card => {
    // Add specular glare overlay if not present
    if (!card.querySelector('.holo-glare')) {
      const glare = document.createElement('div');
      glare.className = 'holo-glare';
      card.appendChild(glare);
    }

    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;
      card.style.setProperty('--mouse-x', `${percentX}%`);
      card.style.setProperty('--mouse-y', `${percentY}%`);

      // 3D rotation limits (-8deg to 8deg)
      const rotateX = ((centerY - y) / centerY) * 7;
      const rotateY = ((x - centerX) / centerX) * 7;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  });

  // 6. Global Command Palette (Ctrl + K / Cmd + K)
  const cmdModal = document.getElementById('command-palette-modal');
  const cmdInput = document.getElementById('command-palette-input');
  const cmdList = document.getElementById('command-palette-list');
  const cmdTriggerBtns = document.querySelectorAll('.trigger-command-palette');

  const paletteCommands = [
    { title: 'Chat with Huzaifa AI Clone (Gemini)', icon: 'bot', category: 'AI', action: () => { document.getElementById('hero-ai-stream')?.scrollIntoView({ behavior: 'smooth' }); document.getElementById('hero-ai-input')?.focus(); } },
    { title: 'Facebook Profile (Ex Huzaifa • 3.4K)', icon: 'facebook', category: 'Social', action: () => window.open('https://www.facebook.com/exgangx11', '_blank') },
    { title: 'Telegram Direct Chat (@EX_HUZAIFA)', icon: 'send', category: 'Social', action: () => window.open('https://t.me/EX_HUZAIFA', '_blank') },
    { title: 'Copy WhatsApp Handle (@affmine)', icon: 'message-circle', category: 'Contact', action: () => window.copyText('@affmine', 'copy-wa-btn-2') },
    { title: 'GitHub Profile (@exyousufhuzaifa)', icon: 'github', category: 'Social', action: () => window.open('https://github.com/exyousufhuzaifa', '_blank') },
    { title: 'Jump to Web & Project Ecosystem', icon: 'network', category: 'Navigation', action: () => location.href = '#ecosystem' },
    { title: 'Open Interactive CLI Terminal', icon: 'terminal', category: 'Feature', action: () => { location.href = '#terminal'; document.getElementById('terminal-input')?.focus(); } },
    { title: 'Toggle Cyber Audio Effects', icon: 'volume-2', category: 'System', action: () => soundToggleBtn?.click() },
    { title: 'Direct Email (contact.yousufhuzaifa@gmail.com)', icon: 'mail', category: 'Contact', action: () => location.href = 'mailto:contact.yousufhuzaifa@gmail.com' }
  ];

  function renderPaletteCommands(query = '') {
    if (!cmdList) return;
    cmdList.innerHTML = '';

    const filtered = paletteCommands.filter(c => 
      c.title.toLowerCase().includes(query.toLowerCase()) || 
      c.category.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      cmdList.innerHTML = `<div class="p-4 text-center text-xs font-mono text-slate-500">No matching command found.</div>`;
      return;
    }

    filtered.forEach((cmd, idx) => {
      const item = document.createElement('div');
      item.className = `command-item flex items-center justify-between p-3 rounded-xl border border-transparent cursor-pointer font-mono text-xs ${idx === 0 ? 'active' : ''}`;
      item.innerHTML = `
        <div class="flex items-center gap-3">
          <i data-lucide="${cmd.icon}" class="w-4 h-4 text-cyan-400"></i>
          <span class="text-slate-200">${cmd.title}</span>
        </div>
        <span class="text-[10px] text-slate-500 uppercase px-2 py-0.5 rounded bg-slate-800/80">${cmd.category}</span>
      `;
      item.addEventListener('click', () => {
        soundFx.click();
        closeCommandPalette();
        cmd.action();
      });
      cmdList.appendChild(item);
    });

    if (window.lucide) window.lucide.createIcons();
  }

  function openCommandPalette() {
    if (!cmdModal) return;
    cmdModal.classList.remove('hidden');
    soundFx.openModal();
    renderPaletteCommands('');
    setTimeout(() => cmdInput?.focus(), 50);
  }

  function closeCommandPalette() {
    if (!cmdModal) return;
    cmdModal.classList.add('hidden');
    if (cmdInput) cmdInput.value = '';
  }

  cmdTriggerBtns.forEach(btn => btn.addEventListener('click', openCommandPalette));

  // Global Key Listener: Ctrl+K or Cmd+K
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      if (cmdModal && !cmdModal.classList.contains('hidden')) {
        closeCommandPalette();
      } else {
        openCommandPalette();
      }
    } else if (e.key === 'Escape' && cmdModal && !cmdModal.classList.contains('hidden')) {
      closeCommandPalette();
    }
  });

  cmdInput?.addEventListener('input', (e) => {
    renderPaletteCommands(e.target.value);
  });

  cmdModal?.addEventListener('click', (e) => {
    if (e.target === cmdModal || e.target.id === 'command-palette-backdrop') {
      closeCommandPalette();
    }
  });

  // 7. Interactive APK Architecture & Bytecode Inspector
  const btnInspectApk = document.getElementById('btn-inspect-apk');
  const apkOutputLog = document.getElementById('apk-output-log');
  const apkProgress = document.getElementById('apk-progress-bar');

  if (btnInspectApk && apkOutputLog) {
    btnInspectApk.addEventListener('click', () => {
      soundFx.click();
      btnInspectApk.disabled = true;
      btnInspectApk.classList.add('opacity-50');
      apkOutputLog.innerHTML = '<span class="text-cyan-400">[INIT]</span> Target: production-release.apk (Signature: V2/V3 Scheme)...\n';
      
      const steps = [
        { text: '[+] Unpacking APK archive container...', delay: 350 },
        { text: '[+] Parsing AndroidManifest.xml (Permissions: INTERNET, FOREGROUND_SERVICE)', delay: 750 },
        { text: '[+] Inspecting DEX bytecode (classes.dex) with ProGuard optimization...', delay: 1200 },
        { text: '[+] Verifying Native binaries: ARM64-v8a libcore.so [PASS]', delay: 1700 },
        { text: '[+] Security Audit: 0 telemetry trackers, 100% clean verified architecture.', delay: 2200 },
        { text: '<b class="text-emerald-400">[READY] APK Architecture Integrity: 100% Optimal (Production Ready)</b>', delay: 2700 }
      ];

      steps.forEach((step, i) => {
        setTimeout(() => {
          apkOutputLog.innerHTML += step.text + '\n';
          apkOutputLog.scrollTop = apkOutputLog.scrollHeight;
          soundFx.terminal();
          if (apkProgress) {
            apkProgress.style.width = `${Math.floor(((i + 1) / steps.length) * 100)}%`;
          }
          if (i === steps.length - 1) {
            btnInspectApk.disabled = false;
            btnInspectApk.classList.remove('opacity-50');
            soundFx.success();
          }
        }, step.delay);
      });
    });
  }

  // 8. Living Node Mesh Animation (ওয়েবসাইটের জালের লাইভ কানেক্টিভিটি)
  const meshCanvas = document.getElementById('ecosystem-mesh-canvas');
  if (meshCanvas) {
    const ctx = meshCanvas.getContext('2d');
    let cw, ch;

    function resizeMeshCanvas() {
      cw = meshCanvas.width = meshCanvas.parentElement.clientWidth;
      ch = meshCanvas.height = 240;
    }
    resizeMeshCanvas();
    window.addEventListener('resize', resizeMeshCanvas);

    const nodes = [
      { name: 'Core Hub (Yousuf Huzaifa)', xPercent: 0.5, yPercent: 0.5, isCenter: true, color: '#06b6d4' },
      { name: 'Web Node 01', xPercent: 0.15, yPercent: 0.35, color: '#38bdf8' },
      { name: 'Android APK', xPercent: 0.85, yPercent: 0.35, color: '#10b981' },
      { name: 'Software / POS', xPercent: 0.25, yPercent: 0.8, color: '#a855f7' },
      { name: 'Bot Engine', xPercent: 0.75, yPercent: 0.8, color: '#f59e0b' }
    ];

    let packets = [
      { from: 0, to: 1, progress: 0.1, speed: 0.008 },
      { from: 0, to: 2, progress: 0.4, speed: 0.01 },
      { from: 0, to: 3, progress: 0.7, speed: 0.009 },
      { from: 0, to: 4, progress: 0.2, speed: 0.012 }
    ];

    function drawMesh() {
      ctx.clearRect(0, 0, cw, ch);

      const computedNodes = nodes.map(n => ({
        ...n,
        x: n.xPercent * cw,
        y: n.yPercent * ch
      }));

      const center = computedNodes[0];

      // Draw connecting circuit lines
      for (let i = 1; i < computedNodes.length; i++) {
        const target = computedNodes[i];
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(center.x, center.y);
        ctx.lineTo(target.x, target.y);
        ctx.stroke();
      }

      // Draw animated energy data packets along lines
      packets.forEach(p => {
        p.progress += p.speed;
        if (p.progress >= 1) p.progress = 0;

        const start = computedNodes[p.from];
        const end = computedNodes[p.to];

        const px = start.x + (end.x - start.x) * p.progress;
        const py = start.y + (end.y - start.y) * p.progress;

        ctx.fillStyle = end.color;
        ctx.shadowColor = end.color;
        ctx.shadowBlur = 8;
        ctx.beginPath();
        ctx.arc(px, py, 3.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Draw Nodes
      computedNodes.forEach(n => {
        // Node outer ring
        ctx.strokeStyle = n.color;
        ctx.lineWidth = n.isCenter ? 2 : 1;
        ctx.fillStyle = '#0b0f19';
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.isCenter ? 14 : 9, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();

        // Node center dot
        ctx.fillStyle = n.color;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.isCenter ? 6 : 3.5, 0, Math.PI * 2);
        ctx.fill();

        // Node label
        ctx.font = '10px JetBrains Mono, monospace';
        ctx.fillStyle = '#94a3b8';
        ctx.textAlign = 'center';
        ctx.fillText(n.name, n.x, n.y + (n.isCenter ? 26 : 20));
      });

      requestAnimationFrame(drawMesh);
    }
    drawMesh();
  }

  // 9. Interactive Terminal Emulator
  const terminalInput = document.getElementById('terminal-input');
  const terminalHistory = document.getElementById('terminal-history');

  if (terminalInput && terminalHistory) {
    const commands = {
      help: `Available CLI commands:
  • <span class="text-cyan-400">whoami</span>    : Developer identity and verified handles
  • <span class="text-cyan-400">ai</span>        : Launch Huzaifa AI Clone (Gemini engine)
  • <span class="text-cyan-400">ecosystem</span> : Overview of active web, APK, and software network nodes
  • <span class="text-cyan-400">skills</span>    : Technical stack across Web, Android, Software
  • <span class="text-cyan-400">links</span>     : Verified Facebook, Telegram, WhatsApp & GitHub
  • <span class="text-cyan-400">inspect</span>   : Run APK architecture bytecode check
  • <span class="text-cyan-400">contact</span>   : Direct communication channels
  • <span class="text-cyan-400">clear</span>     : Clear terminal history`,
      
      ai: `Accessing Huzaifa AI Clone... <span class="text-cyan-400 cursor-pointer underline font-bold" onclick="document.getElementById('hero-ai-stream')?.scrollIntoView({behavior:'smooth'}); document.getElementById('hero-ai-input')?.focus();">[Jump to Hero AI Stream]</span>`,
      
      whoami: `Name    : <b class="text-cyan-300">Yousuf Huzaifa</b>
Aliases : <b class="text-purple-300">Ex Yousuf Huzaifa</b> | <b class="text-emerald-300">Ex Huzaifa</b>
Role    : Full-Stack Web & Android APK Systems Engineer
Reach   : Facebook <span class="text-blue-400 font-semibold">@exgangx11</span> (3.4K+ Followers • #1 on Google)
Base    : Bangladesh (Operating Worldwide Remote)`,

      ecosystem: `Digital Ecosystem Architecture:
• <b class="text-cyan-400">Node #01 [Web Network]</b>   : Next.js/React platforms, custom web portals & APIs
• <b class="text-emerald-400">Node #02 [Android APK]</b>   : Native & Flutter mobile APK builds & distribution
• <b class="text-purple-400">Node #03 [Desktop]</b>       : Electron & Python GUI desktop business tools
• <b class="text-amber-400">Node #04 [Automation]</b>    : Python crawlers, scrapers & automated Telegram bots`,

      skills: `Technical Arsenal:
• <b class="text-cyan-400">Web</b>: React, Next.js, Node.js, Express, JavaScript/TypeScript, PHP/Laravel, Tailwind CSS
• <b class="text-emerald-400">Android APK</b>: Android Native (Java/Kotlin), Flutter/Dart, APK Packaging, Reverse Analysis
• <b class="text-purple-400">Software & Bots</b>: Python 3, Electron Desktop, Telegram Bot API, Web Scraping
• <b class="text-sky-400">Systems & Data</b>: PostgreSQL, MongoDB, MySQL, Linux VPS, Docker, SEO Architecture`,

      inspect: `Run the interactive APK Inspector widget located in the Ecosystem section! Or click: <span class="text-emerald-400 cursor-pointer underline" onclick="document.getElementById('btn-inspect-apk')?.click(); location.href='#apk-sandbox';">Execute APK Analysis</span>`,

      links: `Verified Digital Footprint:
• <b class="text-blue-400">Facebook</b> : <a href="https://www.facebook.com/exgangx11" target="_blank" class="underline">facebook.com/exgangx11</a> (Ex Huzaifa • 3.4k community)
• <b class="text-sky-400">Telegram</b> : <a href="https://t.me/EX_HUZAIFA" target="_blank" class="underline">t.me/EX_HUZAIFA</a> (@EX_HUZAIFA)
• <b class="text-emerald-400">WhatsApp</b> : <span class="font-bold font-mono">@affmine</span>
• <b class="text-purple-400">GitHub</b>   : <a href="https://github.com/exyousufhuzaifa" target="_blank" class="underline">github.com/exyousufhuzaifa</a>`,

      contact: `Direct Communication Lines:
• Telegram : <a href="https://t.me/EX_HUZAIFA" target="_blank" class="text-sky-400 underline">https://t.me/EX_HUZAIFA</a>
• Facebook : <a href="https://www.facebook.com/exgangx11" target="_blank" class="text-blue-400 underline">https://www.facebook.com/exgangx11</a>
• WhatsApp : <span class="text-emerald-400 font-mono font-bold">@affmine</span>
• Email    : <a href="mailto:contact.yousufhuzaifa@gmail.com" class="text-cyan-400 underline">contact.yousufhuzaifa@gmail.com</a>`
    };

    terminalInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        const inputVal = terminalInput.value.trim().toLowerCase();
        terminalInput.value = '';

        if (!inputVal) return;

        soundFx.terminal();

        const commandLine = document.createElement('div');
        commandLine.className = 'flex items-center gap-2 text-slate-300';
        commandLine.innerHTML = `<span class="text-emerald-400 font-bold">visitor@yousuf-huzaifa:~$</span> <span>${escapeHtml(inputVal)}</span>`;
        terminalHistory.appendChild(commandLine);

        if (inputVal === 'clear') {
          terminalHistory.innerHTML = '';
          return;
        }

        const responseLine = document.createElement('div');
        responseLine.className = 'text-slate-300 pl-4 py-1 text-xs sm:text-sm leading-relaxed';

        if (commands[inputVal]) {
          responseLine.innerHTML = commands[inputVal];
        } else {
          responseLine.innerHTML = `<span class="text-red-400">Command not found: '${escapeHtml(inputVal)}'.</span> Type <span class="text-cyan-400 cursor-pointer underline" onclick="runCommand('help')">help</span> to view commands.`;
        }

        terminalHistory.appendChild(responseLine);
        terminalHistory.scrollTop = terminalHistory.scrollHeight;

        if (window.lucide) window.lucide.createIcons();
      }
    });

    window.runCommand = function(cmd) {
      terminalInput.value = cmd;
      const event = new KeyboardEvent('keydown', { key: 'Enter' });
      terminalInput.dispatchEvent(event);
    };
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  // 10. Background Constellation Canvas
  const canvas = document.getElementById('particle-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let particlesArray = [];
    let w, h;

    function resizeCanvas() {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.size = Math.random() * 1.8 + 0.6;
        this.speedX = (Math.random() - 0.5) * 0.7;
        this.speedY = (Math.random() - 0.5) * 0.7;
        this.color = Math.random() > 0.5 ? 'rgba(6, 182, 212, ' : 'rgba(139, 92, 246, ';
        this.alpha = Math.random() * 0.4 + 0.2;
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x < 0 || this.x > w) this.speedX *= -1;
        if (this.y < 0 || this.y > h) this.speedY *= -1;
      }
      draw() {
        ctx.fillStyle = this.color + this.alpha + ')';
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const count = Math.min(Math.floor(window.innerWidth / 20), 60);
    for (let i = 0; i < count; i++) {
      particlesArray.push(new Particle());
    }

    function animateParticles() {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();

        for (let j = i + 1; j < particlesArray.length; j++) {
          const dx = particlesArray[i].x - particlesArray[j].x;
          const dy = particlesArray[i].y - particlesArray[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 100) {
            ctx.strokeStyle = `rgba(6, 182, 212, ${0.12 * (1 - dist / 100)})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particlesArray[i].x, particlesArray[i].y);
            ctx.lineTo(particlesArray[j].x, particlesArray[j].y);
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
  }

  // 11. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 12. Copy to Clipboard Feature
  window.copyText = function(text, elementId) {
    navigator.clipboard.writeText(text).then(() => {
      soundFx.success();
      const el = document.getElementById(elementId);
      if (el) {
        const originalText = el.innerText;
        el.innerText = 'Copied! ✓';
        el.classList.add('text-emerald-400');
        setTimeout(() => {
          el.innerText = originalText;
          el.classList.remove('text-emerald-400');
        }, 2000);
      }
    });
  };
});
