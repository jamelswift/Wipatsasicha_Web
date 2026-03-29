(function renderSharedLayout() {
    const headerClass = 'site-header';
    const currentPage = (window.location.pathname.split('/').pop() || 'index.html').toLowerCase();

    function getNavClass(fileName, baseClass) {
        return currentPage === fileName ? `${baseClass} active` : baseClass;
    }

    const headerHtml = `
    <header class="${headerClass}" role="banner">
        <div class="header-container">
            <a href="index.html" class="logo" aria-label="Go to homepage">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="animate-sparkle" aria-hidden="true">
                    <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
                </svg>
                <span class="logo-text">Wipatsasicha</span>
            </a>

            <nav class="nav-desktop" aria-label="Main navigation">
                <ul class="nav-list">
                    <li><a href="index.html" class="${getNavClass('index.html', 'nav-link')}">Home page</a></li>
                    <li><a href="cv.html" class="${getNavClass('cv.html', 'nav-link')}">CV</a></li>
                    <li><a href="music.html" class="${getNavClass('music.html', 'nav-link')}">Music</a></li>
                    <li><a href="game.html" class="${getNavClass('game.html', 'nav-link')}">Game</a></li>
                    <li><a href="sources.html" class="${getNavClass('sources.html', 'nav-link')}">Sources</a></li>
                </ul>
                <button class="cta-button" id="desktop-contact-btn" type="button">Get in touch!</button>
            </nav>

            <button class="mobile-menu-button" id="mobile-menu-btn" aria-label="Toggle mobile menu" aria-expanded="false">
                <svg class="menu-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <line x1="3" y1="6" x2="21" y2="6"></line>
                    <line x1="3" y1="12" x2="21" y2="12"></line>
                    <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
                <svg class="close-icon hidden" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>

        <nav class="nav-mobile hidden" id="mobile-menu" aria-label="Mobile navigation">
            <ul class="nav-list-mobile">
                <li><a href="index.html" class="${getNavClass('index.html', 'nav-link-mobile')}">Home page</a></li>
                <li><a href="cv.html" class="${getNavClass('cv.html', 'nav-link-mobile')}">CV</a></li>
                <li><a href="music.html" class="${getNavClass('music.html', 'nav-link-mobile')}">Music</a></li>
                <li><a href="game.html" class="${getNavClass('game.html', 'nav-link-mobile')}">Game</a></li>
                <li><a href="sources.html" class="${getNavClass('sources.html', 'nav-link-mobile')}">Sources</a></li>
                <li><button class="cta-button-mobile" id="mobile-contact-btn" type="button">Get in touch!</button></li>
            </ul>
        </nav>
    </header>`;

    const footerHtml = `
    <footer class="site-footer" role="contentinfo">
        <div class="footer-container">
            <div class="footer-brand">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
                </svg>
                <p>© 2026 Wipatsasicha. All rights reserved.</p>
            </div>

            <nav aria-label="Social links">
                <ul class="social-list">
                    <li><a href="sources.html" class="social-icon" aria-label="Media sources">SRC</a></li>
                    <li><a href="https://github.com/jamelswift" target="_blank" rel="noopener noreferrer" class="social-icon" aria-label="GitHub">GH</a></li>
                    <li><a href="mailto:66030281@kmitl.ac.th" class="social-icon" aria-label="Email">✉</a></li>
                </ul>
            </nav>
        </div>
    </footer>`;

    const headerSlot = document.getElementById('shared-header');
    const footerSlot = document.getElementById('shared-footer');

    if (headerSlot) {
        headerSlot.outerHTML = headerHtml;
    }

    if (footerSlot) {
        footerSlot.outerHTML = footerHtml;
    }

    const contactModalHtml = `
    <div class="contact-modal-overlay hidden" id="contact-modal-overlay" aria-hidden="true"></div>
    <div class="contact-modal hidden" id="contact-modal" role="dialog" aria-labelledby="contact-modal-title" aria-modal="true">
        <div class="contact-modal-header">
            <h2 id="contact-modal-title" class="contact-modal-title">Get in touch</h2>
            <button class="contact-modal-close" id="contact-modal-close" type="button" aria-label="Close contact modal">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
        </div>
        <div class="contact-modal-content">
            <div class="contact-item">
                <span class="contact-icon">✉</span>
                <div>
                    <p class="contact-label">Email</p>
                    <a href="mailto:66030281@kmitl.ac.th" class="contact-link">66030281@kmitl.ac.th</a>
                </div>
            </div>
            <div class="contact-item">
                <span class="contact-icon">📱</span>
                <div>
                    <p class="contact-label">Phone</p>
                    <a href="tel:+66656805890" class="contact-link">+66 65 680 5890</a>
                </div>
            </div>
            <div class="contact-item">
                <span class="contact-icon">📍</span>
                <div>
                    <p class="contact-label">Location</p>
                    <p class="contact-value">Bangkok, Thailand</p>
                </div>
            </div>
            <div class="contact-divider"></div>
            <div class="contact-social">
                <p class="contact-label">Follow</p>
                <div class="contact-social-links">
                    <a href="https://github.com/jamelswift" target="_blank" rel="noopener noreferrer" class="contact-social-link" aria-label="GitHub">GitHub</a>
                    <a href="https://www.instagram.com/wpch_/" target="_blank" rel="noopener noreferrer" class="contact-social-link" aria-label="Instagram">Instagram</a>
                </div>
            </div>
        </div>
    </div>`;

    const bodyElement = document.body;
    if (bodyElement) {
        bodyElement.insertAdjacentHTML('beforeend', contactModalHtml);
    }

    const contactButtons = document.querySelectorAll('#desktop-contact-btn, #mobile-contact-btn');
    const contactModal = document.getElementById('contact-modal');
    const contactModalOverlay = document.getElementById('contact-modal-overlay');
    const contactModalClose = document.getElementById('contact-modal-close');

    function openContactModal() {
        if (contactModal && contactModalOverlay) {
            contactModal.classList.remove('hidden');
            contactModalOverlay.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
        }
    }

    function closeContactModal() {
        if (contactModal && contactModalOverlay) {
            contactModal.classList.add('hidden');
            contactModalOverlay.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    contactButtons.forEach(btn => {
        btn.addEventListener('click', openContactModal);
    });

    if (contactModalClose) {
        contactModalClose.addEventListener('click', closeContactModal);
    }

    if (contactModalOverlay) {
        contactModalOverlay.addEventListener('click', closeContactModal);
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && contactModal && !contactModal.classList.contains('hidden')) {
            closeContactModal();
        }
    });
})();
