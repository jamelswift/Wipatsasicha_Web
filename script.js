

const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const menuIcon = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');
const mobileNavLinks = document.querySelectorAll('.nav-link-mobile');

function toggleMobileMenu() {
    if (!mobileMenu || !menuIcon || !closeIcon || !mobileMenuBtn) {
        return;
    }

    const isOpen = !mobileMenu.classList.contains('hidden');
    
    if (isOpen) {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'false');
    } else {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
        mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
}


function closeMobileMenu() {
    if (!mobileMenu || !menuIcon || !closeIcon || !mobileMenuBtn) {
        return;
    }

    mobileMenu.classList.add('hidden');
    menuIcon.classList.remove('hidden');
    closeIcon.classList.add('hidden');
    mobileMenuBtn.setAttribute('aria-expanded', 'false');
}

if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', toggleMobileMenu);
}

mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

document.addEventListener('click', (e) => {
    if (!mobileMenuBtn || !mobileMenu) {
        return;
    }

    if (!mobileMenuBtn.contains(e.target) && !mobileMenu.contains(e.target)) {
        closeMobileMenu();
    }
});


document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');

        if (href === '#') {
            e.preventDefault();
            return;
        }

        const target = document.querySelector(href);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.timeline-item, .experience-item, .activity-item, .hobby-card').forEach(el => {
    observer.observe(el);
});


if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            }
        });
    });

    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}


document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', function(e) {
    
    });
});


document.addEventListener('keydown', (e) => {
    if (!mobileMenu) {
        return;
    }

    if (e.key === 'Escape' && !mobileMenu.classList.contains('hidden')) {
        closeMobileMenu();
    }
});


function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}


function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href^="http"]');
    if (link) {
        const href = link.getAttribute('href');
        
        console.log('External link clicked:', href);
    }
});


function initMusicPlayer() {
    const searchForm = document.getElementById('music-search-form');
    const searchInput = document.getElementById('music-search-input');
    const statusText = document.getElementById('music-status');
    const resultsList = document.getElementById('music-results');
    const audio = document.getElementById('music-audio');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const openTrackLink = document.getElementById('open-track-link');
    const titleEl = document.getElementById('track-title');
    const artistEl = document.getElementById('track-artist');
    const progressEl = document.getElementById('track-progress');
    const recordEl = document.getElementById('vinyl-record');
    const armEl = document.getElementById('record-arm');
    const artworkEl = document.getElementById('record-artwork');

    if (!searchForm || !searchInput || !statusText || !resultsList || !audio || !playPauseBtn || !openTrackLink || !titleEl || !artistEl || !progressEl || !recordEl || !armEl || !artworkEl) {
        return;
    }

    let tracks = [];
    let currentIndex = -1;

    const setStatus = (message) => {
        statusText.textContent = message;
    };

    const setVisualState = (isPlaying) => {
        recordEl.classList.toggle('is-spinning', isPlaying);
        armEl.classList.toggle('is-playing', isPlaying);
        playPauseBtn.textContent = isPlaying ? 'Pause' : 'Play';
    };

    const markSelectedTrack = () => {
        resultsList.querySelectorAll('.music-result-item').forEach((item, index) => {
            item.classList.toggle('active', index === currentIndex);
        });
    };

    const loadTrack = async (index, autoPlay) => {
        const track = tracks[index];
        if (!track || !track.previewUrl) {
            setStatus('No preview is available for this track.');
            return;
        }

        currentIndex = index;
        audio.src = track.previewUrl;
        titleEl.textContent = track.trackName || 'Unknown Track';
        artistEl.textContent = track.artistName || 'Unknown Artist';
        openTrackLink.href = track.trackViewUrl || '#';
        artworkEl.src = track.artworkUrl100 || artworkEl.src;
        markSelectedTrack();
        progressEl.style.width = '0%';

        if (autoPlay) {
            try {
                await audio.play();
                setVisualState(true);
                setStatus(`Now playing: ${titleEl.textContent} - ${artistEl.textContent}`);
            } catch (err) {
                setVisualState(false);
                setStatus('Track is ready. Press Play to start listening.');
            }
        } else {
            setVisualState(false);
            setStatus('Track loaded. Press Play to start listening.');
        }
    };

    const renderResults = (list) => {
        resultsList.innerHTML = '';

        if (!list.length) {
            const li = document.createElement('li');
            li.className = 'music-empty';
            li.textContent = 'No tracks found. Try another keyword.';
            resultsList.appendChild(li);
            return;
        }

        const fragment = document.createDocumentFragment();

        list.forEach((track, index) => {
            const li = document.createElement('li');
            li.className = 'music-result-item';

            const durationMs = Number(track.trackTimeMillis) || 0;
            const mins = Math.floor(durationMs / 60000);
            const secs = Math.floor((durationMs % 60000) / 1000);
            const durationText = `${mins}:${String(secs).padStart(2, '0')}`;

            li.innerHTML = `
                <button type="button" class="music-result-btn" data-index="${index}">
                    <img src="${track.artworkUrl60 || 'public/images/profile.jpg'}" alt="${track.trackName || 'Track'} cover" loading="lazy">
                    <span class="music-result-copy">
                        <strong>${track.trackName || 'Unknown Track'}</strong>
                        <span>${track.artistName || 'Unknown Artist'} · ${durationText}</span>
                    </span>
                </button>
            `;

            fragment.appendChild(li);
        });

        resultsList.appendChild(fragment);

        resultsList.querySelectorAll('.music-result-btn').forEach((btn) => {
            btn.addEventListener('click', () => {
                const index = Number(btn.dataset.index);
                loadTrack(index, true);
            });
        });
    };

    const searchSongs = async (query) => {
        setStatus('Searching for tracks...');
        resultsList.innerHTML = '';

        const params = new URLSearchParams({
            term: query,
            media: 'music',
            entity: 'song',
            limit: '24'
        });

        try {
            const response = await fetch(`https://itunes.apple.com/search?${params.toString()}`);
            if (!response.ok) {
                throw new Error(`HTTP ${response.status}`);
            }

            const data = await response.json();
            tracks = Array.isArray(data.results) ? data.results.filter((item) => item.previewUrl) : [];

            renderResults(tracks);

            if (tracks.length > 0) {
                setStatus(`Found ${tracks.length} track(s).`);
                loadTrack(0, false);
            } else {
                setStatus('No playable tracks found for this search.');
            }
        } catch (err) {
            tracks = [];
            renderResults([]);
            setStatus('Search failed. Please try again in a moment.');
        }
    };

    searchForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const query = searchInput.value.trim();
        if (!query) {
            setStatus('Please enter a search term first.');
            return;
        }
        searchSongs(query);
    });

    playPauseBtn.addEventListener('click', async () => {
        if (currentIndex < 0 && tracks.length > 0) {
            await loadTrack(0, true);
            return;
        }

        if (!audio.src) {
            setStatus('Search and select a track before playing.');
            return;
        }

        if (audio.paused) {
            try {
                await audio.play();
                setVisualState(true);
            } catch (err) {
                setStatus('Autoplay was blocked by the browser. Please press Play again.');
            }
            return;
        }

        audio.pause();
        setVisualState(false);
    });

    audio.addEventListener('play', () => setVisualState(true));
    audio.addEventListener('pause', () => setVisualState(false));
    audio.addEventListener('ended', () => {
        setVisualState(false);
        setStatus('Preview finished. Select another track.');
    });

    audio.addEventListener('timeupdate', () => {
        const current = audio.currentTime || 0;
        const duration = audio.duration || 0;
        const pct = duration > 0 ? (current / duration) * 100 : 0;
        progressEl.style.width = `${pct}%`;
    });

    searchSongs('thai pop');
}


function init() {
    
    console.log('Portfolio initialized');
    const images = document.querySelectorAll('img');
    let loadedImages = 0;
    
    images.forEach(img => {
        if (img.complete) {
            loadedImages++;
        } else {
            img.addEventListener('load', () => {
                loadedImages++;
            });
            img.addEventListener('error', () => {
                loadedImages++;
            });
        }
    });

    initBoneTrailGame();
    initMusicPlayer();
}


if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}


window.portfolio = {
    toggleMobileMenu,
    closeMobileMenu,
    isInViewport,
    debounce,
    throttle
};


function initBoneTrailGame() {
    const canvas = document.getElementById('bone-trail-canvas');
    const scoreEl = document.getElementById('bone-score');
    const levelEl = document.getElementById('bone-level');
    const comboEl = document.getElementById('bone-combo');
    const timeEl = document.getElementById('bone-time');
    const boostLabelEl = document.getElementById('bone-boost-label');
    const restartBtn = document.getElementById('bone-restart');

    if (!canvas || !scoreEl || !timeEl || !restartBtn || !levelEl || !comboEl || !boostLabelEl) {
        return;
    }

    const ctx = canvas.getContext('2d');
    const mouse = { x: 0, y: 0 };
    const points = [];
    const hazards = [];
    const particles = [];

    const config = {
        startTime: 45,
        basePoints: 24,
        maxPoints: 56,
        followStrength: 0.34,
        comboWindow: 2.5,
        scorePerLevel: 10,
        maxHazards: 6
    };

    const state = {
        score: 0,
        level: 1,
        combo: 1,
        comboTimer: 0,
        timeLeft: config.startTime,
        boostEnergy: 100,
        boostActiveUntil: 0,
        running: true,
        width: 0,
        height: 0,
        lastFrameTime: performance.now()
    };

    const pickup = {
        x: 0,
        y: 0,
        radius: 10,
        type: 'star'
    };

    function randomInRange(min, max) {
        return min + Math.random() * (max - min);
    }

    function setHudValues() {
        scoreEl.textContent = String(state.score);
        levelEl.textContent = String(state.level);
        comboEl.textContent = String(state.combo);
        timeEl.textContent = String(Math.ceil(state.timeLeft));
        if (isBoostActive()) {
            boostLabelEl.textContent = 'Boost: Active';
        } else if (state.boostEnergy >= 100) {
            boostLabelEl.textContent = 'Boost: Ready';
        } else {
            boostLabelEl.textContent = `Boost: ${Math.floor(state.boostEnergy)}%`;
        }
    }

    function spawnPickup() {
        const pad = 28;
        pickup.x = randomInRange(pad, state.width - pad);
        pickup.y = randomInRange(pad, state.height - pad);

        const roll = Math.random();
        if (roll < 0.12) {
            pickup.type = 'clock';
            pickup.radius = 11;
        } else if (roll < 0.28) {
            pickup.type = 'gem';
            pickup.radius = 9;
        } else {
            pickup.type = 'star';
            pickup.radius = 10;
        }
    }

    function makeHazard(speedScale = 1) {
        const pad = 40;
        const speed = randomInRange(88, 136) * speedScale;
        return {
            x: randomInRange(pad, state.width - pad),
            y: randomInRange(pad, state.height - pad),
            radius: randomInRange(11, 16),
            vx: (Math.random() > 0.5 ? 1 : -1) * speed,
            vy: (Math.random() > 0.5 ? 1 : -1) * speed * randomInRange(0.65, 1.05)
        };
    }

    function syncHazardCount() {
        const wanted = Math.min(config.maxHazards, 1 + Math.floor((state.level - 1) / 2));
        while (hazards.length < wanted) {
            hazards.push(makeHazard(1 + state.level * 0.08));
        }
        while (hazards.length > wanted) {
            hazards.pop();
        }
    }

    function isBoostActive() {
        return performance.now() < state.boostActiveUntil;
    }

    function activateBoost() {
        if (!state.running || state.boostEnergy < 100) {
            return;
        }
        state.boostEnergy = 0;
        state.boostActiveUntil = performance.now() + 2200;
    }

    function resizeCanvas() {
        const ratio = window.devicePixelRatio || 1;
        const rect = canvas.getBoundingClientRect();

        state.width = Math.max(320, Math.floor(rect.width));
        state.height = Math.max(240, Math.floor(rect.height));

        canvas.width = Math.floor(state.width * ratio);
        canvas.height = Math.floor(state.height * ratio);
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

        if (points.length === 0) {
            mouse.x = state.width * 0.5;
            mouse.y = state.height * 0.5;
            for (let i = 0; i < config.basePoints; i++) {
                points.push({ x: mouse.x, y: mouse.y });
            }
            spawnPickup();
            syncHazardCount();
        }
    }

    function clampPointer(x, y) {
        mouse.x = Math.max(0, Math.min(state.width, x));
        mouse.y = Math.max(0, Math.min(state.height, y));
    }

    function handlePointer(clientX, clientY) {
        const rect = canvas.getBoundingClientRect();
        clampPointer(clientX - rect.left, clientY - rect.top);
    }

    canvas.addEventListener('mousemove', (e) => {
        handlePointer(e.clientX, e.clientY);
    });

    canvas.addEventListener('touchstart', (e) => {
        if (e.touches[0]) {
            handlePointer(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: true });

    canvas.addEventListener('touchmove', (e) => {
        if (e.touches[0]) {
            e.preventDefault();
            handlePointer(e.touches[0].clientX, e.touches[0].clientY);
        }
    }, { passive: false });

    function distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    function drawStar(x, y, radius, spikes, innerRadius) {
        let rot = Math.PI / 2 * 3;
        const step = Math.PI / spikes;

        ctx.beginPath();
        ctx.moveTo(x, y - radius);

        for (let i = 0; i < spikes; i++) {
            ctx.lineTo(x + Math.cos(rot) * radius, y + Math.sin(rot) * radius);
            rot += step;
            ctx.lineTo(x + Math.cos(rot) * innerRadius, y + Math.sin(rot) * innerRadius);
            rot += step;
        }

        ctx.lineTo(x, y - radius);
        ctx.closePath();
    }

    function spawnBurst(x, y, color, count) {
        for (let i = 0; i < count; i++) {
            particles.push({
                x,
                y,
                vx: Math.cos((Math.PI * 2 * i) / count) * randomInRange(35, 120),
                vy: Math.sin((Math.PI * 2 * i) / count) * randomInRange(35, 120),
                life: randomInRange(0.35, 0.75),
                age: 0,
                color
            });
        }
    }

    function resetGame() {
        state.score = 0;
        state.level = 1;
        state.combo = 1;
        state.comboTimer = 0;
        state.timeLeft = config.startTime;
        state.boostEnergy = 100;
        state.boostActiveUntil = 0;
        state.running = true;
        state.lastFrameTime = performance.now();

        points.length = 0;
        hazards.length = 0;
        particles.length = 0;
        mouse.x = state.width * 0.5;
        mouse.y = state.height * 0.5;

        for (let i = 0; i < config.basePoints; i++) {
            points.push({ x: mouse.x, y: mouse.y });
        }

        spawnPickup();
        syncHazardCount();
        setHudValues();
    }

    function update(deltaSeconds) {
        const boostNow = isBoostActive();
        const followStrength = boostNow ? 0.52 : config.followStrength;

        points[0].x = mouse.x;
        points[0].y = mouse.y;

        for (let i = 1; i < points.length; i++) {
            points[i].x += (points[i - 1].x - points[i].x) * followStrength;
            points[i].y += (points[i - 1].y - points[i].y) * followStrength;
        }

        for (let i = particles.length - 1; i >= 0; i--) {
            const p = particles[i];
            p.age += deltaSeconds;
            p.x += p.vx * deltaSeconds;
            p.y += p.vy * deltaSeconds;
            p.vx *= 0.96;
            p.vy *= 0.96;

            if (p.age >= p.life) {
                particles.splice(i, 1);
            }
        }

        const speedScale = 1 + (state.level - 1) * 0.08;
        hazards.forEach((hazard) => {
            hazard.x += hazard.vx * deltaSeconds * speedScale;
            hazard.y += hazard.vy * deltaSeconds * speedScale;

            if (hazard.x < hazard.radius || hazard.x > state.width - hazard.radius) {
                hazard.vx *= -1;
            }

            if (hazard.y < hazard.radius || hazard.y > state.height - hazard.radius) {
                hazard.vy *= -1;
            }
        });

        if (state.comboTimer > 0) {
            state.comboTimer -= deltaSeconds;
            if (state.comboTimer <= 0) {
                state.combo = 1;
            }
        }

        if (distance(points[0], pickup) < pickup.radius + 9) {
            let scoreGain = 1;
            let timeGain = 1.6;
            let burstColor = '#f0bf35';

            if (pickup.type === 'gem') {
                scoreGain = 2;
                timeGain = 2.4;
                burstColor = '#6ed6ff';
            }

            if (pickup.type === 'clock') {
                scoreGain = 1;
                timeGain = 6;
                burstColor = '#90f7aa';
            }

            state.combo = Math.min(9, state.combo + 1);
            state.comboTimer = config.comboWindow;

            const totalScoreGain = scoreGain * state.combo;
            state.score += totalScoreGain;
            state.timeLeft = Math.min(80, state.timeLeft + timeGain);
            state.boostEnergy = Math.min(100, state.boostEnergy + 9 + state.combo);
            spawnBurst(pickup.x, pickup.y, burstColor, 9 + state.combo);

            if (points.length < config.maxPoints) {
                const tail = points[points.length - 1];
                points.push({ x: tail.x, y: tail.y });
            }

            state.level = 1 + Math.floor(state.score / config.scorePerLevel);
            syncHazardCount();
            spawnPickup();
        }

        hazards.forEach((hazard) => {
            if (distance(points[0], hazard) < hazard.radius + 8) {
                if (!boostNow) {
                    state.timeLeft = Math.max(0, state.timeLeft - 5.5);
                    state.combo = 1;
                    state.comboTimer = 0;
                    state.boostEnergy = Math.max(0, state.boostEnergy - 24);
                    spawnBurst(hazard.x, hazard.y, '#ff7a7a', 12);
                }

                hazard.x = randomInRange(20, state.width - 20);
                hazard.y = randomInRange(20, state.height - 20);
            }
        });

        state.boostEnergy = Math.min(100, state.boostEnergy + (boostNow ? 4 : 8) * deltaSeconds);

        state.timeLeft = Math.max(0, state.timeLeft - deltaSeconds);
        setHudValues();

        if (state.timeLeft <= 0) {
            state.running = false;
        }
    }

    function draw() {
        ctx.clearRect(0, 0, state.width, state.height);

        ctx.save();
        ctx.globalAlpha = 0.12;
        ctx.strokeStyle = '#d8c98f';
        ctx.lineWidth = 1;
        for (let x = 0; x < state.width; x += 30) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, state.height);
            ctx.stroke();
        }
        for (let y = 0; y < state.height; y += 30) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(state.width, y);
            ctx.stroke();
        }
        ctx.restore();

        const boostNow = isBoostActive();
        if (boostNow) {
            ctx.save();
            ctx.fillStyle = 'rgba(133, 221, 255, 0.08)';
            ctx.fillRect(0, 0, state.width, state.height);
            ctx.restore();
        }

        ctx.strokeStyle = boostNow ? '#8de7ff' : '#f8f7f2';
        ctx.lineWidth = boostNow ? 1.5 : 1.1;

        ctx.beginPath();
        for (let i = 0; i < points.length; i++) {
            ctx.lineTo(points[i].x, points[i].y);
        }
        ctx.stroke();

        for (let i = 1; i < points.length; i++) {
            const p = points[i];
            const prev = points[i - 1];
            const angle = Math.atan2(p.y - prev.y, p.x - prev.x);
            const length = 8 + i * 0.45;

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(
                p.x + Math.cos(angle + Math.PI / 2) * length,
                p.y + Math.sin(angle + Math.PI / 2) * length
            );
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(
                p.x + Math.cos(angle - Math.PI / 2) * length,
                p.y + Math.sin(angle - Math.PI / 2) * length
            );
            ctx.stroke();
        }

        ctx.save();
        if (pickup.type === 'clock') {
            ctx.shadowColor = '#90f7aa';
            ctx.shadowBlur = 16;
            ctx.fillStyle = '#90f7aa';
            ctx.beginPath();
            ctx.arc(pickup.x, pickup.y, pickup.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.strokeStyle = '#0f1412';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(pickup.x, pickup.y);
            ctx.lineTo(pickup.x, pickup.y - 5);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(pickup.x, pickup.y);
            ctx.lineTo(pickup.x + 4, pickup.y + 2);
            ctx.stroke();
        } else {
            ctx.shadowColor = pickup.type === 'gem' ? '#6ed6ff' : '#f0bf35';
            ctx.shadowBlur = 16;
            ctx.fillStyle = pickup.type === 'gem' ? '#6ed6ff' : '#f0bf35';
            drawStar(pickup.x, pickup.y, pickup.radius, 5, pickup.radius * 0.52);
            ctx.fill();
        }
        ctx.restore();

        hazards.forEach((hazard) => {
            ctx.save();
            ctx.fillStyle = '#d44747';
            ctx.shadowColor = '#d44747';
            ctx.shadowBlur = 12;
            ctx.beginPath();
            ctx.arc(hazard.x, hazard.y, hazard.radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        particles.forEach((particle) => {
            const lifeRatio = 1 - particle.age / particle.life;
            ctx.save();
            ctx.globalAlpha = Math.max(0, lifeRatio);
            ctx.fillStyle = particle.color;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, 1.2 + lifeRatio * 2.2, 0, Math.PI * 2);
            ctx.fill();
            ctx.restore();
        });

        ctx.save();
        ctx.fillStyle = '#FFF8EC';
        ctx.font = '600 13px Segoe UI';
        ctx.textAlign = 'left';
        ctx.fillText(`Level ${state.level}  |  Combo x${state.combo}`, 12, 22);

        ctx.fillStyle = 'rgba(255, 248, 236, 0.28)';
        ctx.fillRect(12, 30, 140, 8);
        ctx.fillStyle = '#56d9ff';
        ctx.fillRect(12, 30, 1.4 * state.boostEnergy, 8);

        if (state.comboTimer > 0) {
            const comboRatio = state.comboTimer / config.comboWindow;
            ctx.fillStyle = 'rgba(240, 191, 53, 0.28)';
            ctx.fillRect(12, 44, 140, 6);
            ctx.fillStyle = '#f0bf35';
            ctx.fillRect(12, 44, 140 * comboRatio, 6);
        }
        ctx.fill();
        ctx.restore();

        if (!state.running) {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.55)';
            ctx.fillRect(0, 0, state.width, state.height);

            ctx.fillStyle = '#FFF8EC';
            ctx.font = '700 32px Georgia';
            ctx.textAlign = 'center';
            ctx.fillText('Time Up!', state.width / 2, state.height / 2 - 20);

            ctx.font = '500 18px Segoe UI';
            ctx.fillText(`Final Score: ${state.score}`, state.width / 2, state.height / 2 + 16);
            ctx.font = '500 14px Segoe UI';
            ctx.fillText('Press Restart to play again', state.width / 2, state.height / 2 + 44);
        }
    }

    function loop(now) {
        const deltaSeconds = Math.min(0.05, (now - state.lastFrameTime) / 1000);
        state.lastFrameTime = now;

        if (state.running) {
            update(deltaSeconds);
        }

        draw();
        requestAnimationFrame(loop);
    }

    restartBtn.addEventListener('click', resetGame);
    window.addEventListener('keydown', (e) => {
        if (e.code === 'Space') {
            e.preventDefault();
            activateBoost();
        }
    });
    window.addEventListener('resize', resizeCanvas);

    resizeCanvas();
    resetGame();
    requestAnimationFrame(loop);
}
