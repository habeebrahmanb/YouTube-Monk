export function initSettings() {
    const settingsContainer = document.getElementById('settings-results');
    if (!settingsContainer) return;

    settingsContainer.innerHTML = `
        <div class="card" style="margin-bottom: 20px;">
            <h4 style="margin-bottom: 16px;">Appearance</h4>
            <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px;">
                <span>Dark Mode</span>
                <label class="switch" style="position: relative; display: inline-block; width: 44px; height: 24px;">
                    <input type="checkbox" id="theme-toggle" style="opacity: 0; width: 0; height: 0;">
                    <span class="slider" style="position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: #ccc; transition: .4s; border-radius: 24px;">
                        <span style="position: absolute; content: ''; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; border-radius: 50%;" class="slider-dot"></span>
                    </span>
                </label>
            </div>
            <p class="text-secondary" style="font-size: 0.8rem; margin-top: 8px;">Switch between light and dark themes.</p>
        </div>

        <div class="card">
            <h4 style="margin-bottom: 16px;">About the Developer</h4>
            <div style="margin-bottom: 12px;">
                <strong style="display: block; font-size: 1.1rem; color: var(--text-primary);">HABEEB RAHMAN</strong>
                <a href="https://www.bestfreelanceseo.com/?utm_source=google&utm_medium=referral&utm_campaign=chrome" target="_blank" style="color: var(--accent); text-decoration: none; font-size: 0.9rem; display: block; margin-top: 4px; font-weight: 500;">Best Freelance SEO</a>
            </div>
            <div style="display: flex; gap: 12px; margin-top: 16px;">
                <a href="https://github.com/habeebrahmanb" target="_blank" class="btn" style="background: var(--bg-primary); border: 1px solid var(--border); padding: 8px 12px; border-radius: 6px; color: var(--text-primary); text-decoration: none; display: flex; align-items: center; font-size: 0.85rem; flex: 1; justify-content: center;">
                    <span class="material-icons" style="font-size: 1.1rem; margin-right: 6px;">code</span> GitHub
                </a>
                <a href="https://www.linkedin.com/in/habeebrahmanb" target="_blank" class="btn" style="background: var(--bg-primary); border: 1px solid var(--border); padding: 8px 12px; border-radius: 6px; color: var(--text-primary); text-decoration: none; display: flex; align-items: center; font-size: 0.85rem; flex: 1; justify-content: center;">
                    <span class="material-icons" style="font-size: 1.1rem; margin-right: 6px;">person</span> LinkedIn
                </a>
            </div>
        </div>
    `;

    // Inline CSS for the switch specifically, although normally it'd be in popup.css
    const style = document.createElement('style');
    style.innerHTML = `
        #theme-toggle:checked + .slider { background-color: var(--accent); }
        #theme-toggle:checked + .slider .slider-dot { transform: translateX(20px); }
    `;
    document.head.appendChild(style);

    const toggle = document.getElementById('theme-toggle');
    
    // Load saved theme
    chrome.storage.local.get(['theme'], (result) => {
        if (result.theme === 'dark') {
            toggle.checked = true;
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    });

    toggle.addEventListener('change', (e) => {
        if (e.target.checked) {
            document.documentElement.setAttribute('data-theme', 'dark');
            chrome.storage.local.set({ theme: 'dark' });
        } else {
            document.documentElement.removeAttribute('data-theme');
            chrome.storage.local.set({ theme: 'light' });
        }
    });
}

export function applyTheme() {
    chrome.storage.local.get(['theme'], (result) => {
        if (result.theme === 'dark') {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    });
}
