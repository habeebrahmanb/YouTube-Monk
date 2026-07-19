import { updateDashboard } from './modules/stats.js';
import { analyzeSEO } from './modules/seo.js';
import { renderThumbnail } from './modules/thumbnail.js';
import { renderTags } from './modules/tags.js';
import { renderDescription } from './modules/description.js';
import { renderExportTools } from './modules/export.js';
import { renderCopyTools } from './modules/copy.js';
import { initSettings, applyTheme } from './modules/settings.js';

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const sections = document.querySelectorAll('.view-section');
    const loader = document.getElementById('main-loader');
    const contentContainer = document.getElementById('content-container');

    // Initialize Theme
    initSettings();
    applyTheme();

    // Navigation Logic
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navItems.forEach(nav => nav.classList.remove('active'));
            sections.forEach(sec => sec.classList.remove('active'));
            
            item.classList.add('active');
            document.getElementById(item.dataset.target).classList.add('active');
        });
    });

    const fetchData = () => {
        loader.style.display = 'flex';
        contentContainer.style.display = 'none';
        
        // Demo Mode for Screenshots
        const urlParams = new URLSearchParams(window.location.search);
        const demoTab = urlParams.get('demo');
        if (demoTab) {
            const dummyData = {
                videoId: "dQw4w9WgXcQ",
                title: "Dhruv Rathee's latest YouTube video Malayalam Explanation | തകരുന്ന ഇന്ത്യൻ സമ്പത്ത് വ്യവസ്ഥ",
                channel: "Trendmojo by Shinu",
                views: "1300000",
                likes: "17200",
                description: "This is a detailed Malayalam explanation of Dhruv Rathee's latest video regarding the Indian economy.\n\nLinks:\nhttps://example.com\nhttps://example.com/2\nhttps://example.com/3\n\n#malayalam #dhruvrathee #economy",
                tags: [],
                uploadDate: "2026-07-16T05:26:06-07:00",
                comments: "1266000000",
                duration: "24m0s",
                category: "News & Politics",
                thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg"
            };

            setTimeout(() => {
                loader.style.display = 'none';
                contentContainer.style.display = 'block';
                updateDashboard(dummyData);
                analyzeSEO(dummyData);
                renderThumbnail(dummyData);
                renderTags(dummyData);
                renderDescription(dummyData);
                renderExportTools(dummyData);
                renderCopyTools(dummyData);

                // Switch to the requested tab
                if (demoTab !== 'dashboard') {
                    const targetBtn = document.querySelector(`[data-target="${demoTab}"]`);
                    if (targetBtn) targetBtn.click();
                }
            }, 100);
            return;
        }

        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            if (!tabs[0].url.includes("youtube.com/watch")) {
                loader.innerHTML = "<p>Please open a YouTube video to use YouTube Monk.</p>";
                return;
            }

            chrome.scripting.executeScript({
                target: {tabId: tabs[0].id},
                files: ['content.js']
            }, () => {
                setTimeout(() => {
                    chrome.tabs.sendMessage(tabs[0].id, {action: "getVideoData"}, function(response) {
                        if (chrome.runtime.lastError || !response) {
                            loader.innerHTML = "<p>Could not extract video data. Try refreshing the page.</p>";
                            return;
                        }

                        loader.style.display = 'none';
                        contentContainer.style.display = 'block';

                        // Populate UI
                        updateDashboard(response);
                        analyzeSEO(response);
                        renderThumbnail(response);
                        renderTags(response);
                        renderDescription(response);
                        renderExportTools(response);
                        renderCopyTools(response);
                    });
                }, 50);
            });
        });
    };

    // Initial fetch
    fetchData();

    // Attach to refresh button
    const refreshBtn = document.getElementById('refresh-btn');
    if (refreshBtn) {
        refreshBtn.addEventListener('click', fetchData);
    }
});
