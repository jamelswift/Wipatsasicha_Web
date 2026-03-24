(function renderSharedLayout() {
    const headerClass = 'site-header';

    const headerHtml = `
    <header class="${headerClass}" role="banner">
        <div class="header-container">
            <a href="#home" class="logo" aria-label="Go to homepage">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" class="animate-sparkle" aria-hidden="true">
                    <path d="M12 0L14.59 8.41L23 12L14.59 15.59L12 24L9.41 15.59L1 12L9.41 8.41L12 0Z" />
                </svg>
                <span class="logo-text">Wipatsasicha</span>
            </a>

            <nav class="nav-desktop" aria-label="Main navigation">
                <ul class="nav-list">
                    <li><a href="#home" class="nav-link">Home page</a></li>
                    <li><a href="#cv" class="nav-link">Resume</a></li>
                    <li><a href="#game" class="nav-link">Game</a></li>
                </ul>
                <a href="mailto:66030281@kmitl.ac.th" class="cta-button">Get in touch!</a>
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
                <li><a href="#home" class="nav-link-mobile">Home page</a></li>
                <li><a href="#cv" class="nav-link-mobile">Resume</a></li>
                <li><a href="#game" class="nav-link-mobile">Game</a></li>
                <li><a href="mailto:66030281@kmitl.ac.th" class="cta-button-mobile">Get in touch!</a></li>
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
})();
