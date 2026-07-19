// content.js
// Responsible for extracting data from the YouTube DOM with robust fallbacks

function extractVideoData() {
    try {
        const videoId = new URLSearchParams(window.location.search).get("v");
        if (!videoId) return null;

        // Helper to extract meta content
        const getMeta = (selector) => {
            const el = document.querySelector(selector);
            return el ? (el.getAttribute('content') || el.getAttribute('value') || '') : '';
        };

        // Helper to parse numbers with K, M, B
        const parseYTNumber = (str) => {
            if (!str) return '0';
            let s = str.toString().toUpperCase().replace(/,/g, '');
            let multiplier = 1;
            if (s.includes('K')) multiplier = 1000;
            else if (s.includes('M')) multiplier = 1000000;
            else if (s.includes('B')) multiplier = 1000000000;
            
            let num = parseFloat(s.replace(/[^0-9.]/g, ''));
            if (isNaN(num)) return '0';
            return Math.floor(num * multiplier).toString();
        };

        // Title
        let title = getMeta('meta[name="title"]') || getMeta('meta[property="og:title"]');
        if (!title) {
            const titleNode = document.querySelector('h1.ytd-watch-metadata yt-formatted-string, h1.title');
            title = titleNode ? titleNode.innerText : '';
        }

        // Channel
        let channel = getMeta('link[itemprop="name"]');
        if (!channel) {
            const channelNode = document.querySelector('ytd-channel-name yt-formatted-string a, #upload-info a');
            channel = channelNode ? channelNode.innerText : '';
        }

        // Views
        let views = getMeta('meta[itemprop="interactionCount"]');
        if (!views) {
            const viewNode = document.querySelector('yt-formatted-string#info span:nth-child(1), #count .view-count');
            views = viewNode ? viewNode.innerText : '0';
        }
        views = parseYTNumber(views);

        // Likes
        let likes = '0';
        const likesNode = document.querySelector('like-button-view-model button div.yt-spec-button-shape-next__button-text-content, yt-button-view-model .yt-core-button-shape-next__button-text-content');
        if (likesNode && likesNode.innerText.trim()) {
            likes = likesNode.innerText.trim();
        }
        if (likes === '0' || !likes) {
            const likeButton = document.querySelector('like-button-view-model button, ytd-menu-renderer .yt-core-button-shape-next');
            if (likeButton) {
                const ariaLabel = likeButton.getAttribute('aria-label') || '';
                const match = ariaLabel.match(/\b(\d[\d,.]*[kKmMbB]?)\b/);
                if (match) likes = match[1];
            }
        }
        likes = parseYTNumber(likes);

        // Description (Priority to DOM to avoid meta tag truncation)
        let description = '';
        const descNodes = document.querySelectorAll('#description-inline-expander yt-attributed-string, ytd-text-inline-expander yt-attributed-string');
        for (let node of descNodes) {
            if (node.textContent && node.textContent.length > description.length) {
                description = node.textContent;
            }
        }
        
        // Try extracting from script tags if DOM fails
        if (!description || description.length < 50) {
            const scripts = document.querySelectorAll('script');
            for (let script of scripts) {
                if (script.innerText.includes('shortDescription":')) {
                    try {
                        const match = script.innerText.match(/"shortDescription":"(.*?)"/);
                        if (match) {
                            // The JSON response escapes newlines as \n, so we unescape them
                            description = match[1].replace(/\\n/g, '\n').replace(/\\"/g, '"');
                            break;
                        }
                    } catch (e) {}
                }
            }
        }
        
        // Fallback to meta tags
        if (!description || description.length < 50) {
            description = getMeta('meta[itemprop="description"]') || getMeta('meta[property="og:description"]');
        }

        // Tags
        const metaTags = document.querySelectorAll('meta[property="og:video:tag"]');
        const tags = Array.from(metaTags).map(tag => tag.content);

        // Upload Date
        let uploadDate = getMeta('meta[itemprop="datePublished"]') || getMeta('meta[itemprop="uploadDate"]');
        if (!uploadDate) {
            const dateNode = document.querySelector('yt-formatted-string#info span:nth-child(3), #info-strings yt-formatted-string');
            uploadDate = dateNode ? dateNode.innerText : '';
        }

        // Comments
        let comments = '0';
        const commentsNode = document.querySelector('ytd-comments-header-renderer yt-formatted-string.count-text span:nth-child(1), #comments yt-formatted-string.count-text');
        if (commentsNode) comments = commentsNode.innerText;
        comments = parseYTNumber(comments);

        // Duration
        let duration = getMeta('meta[itemprop="duration"]');
        if (duration) {
            // Convert PT1H2M3S to readable
            duration = duration.replace('PT', '').toLowerCase();
        } else {
            const durationNode = document.querySelector('span.ytp-time-duration');
            if (durationNode) duration = durationNode.innerText;
        }

        // Category
        let category = getMeta('meta[itemprop="genre"]');
        if (!category) {
            const catNode = document.querySelector('ytd-metadata-row-container-renderer yt-formatted-string#content');
            if (catNode) category = catNode.innerText;
        }

        return {
            videoId,
            title,
            channel,
            views,
            likes,
            description,
            tags,
            uploadDate,
            comments,
            duration,
            category,
            thumbnailUrl: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
        };
    } catch (e) {
        console.error("YouTube Monk Error:", e);
        return null;
    }
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "getVideoData") {
        const data = extractVideoData();
        sendResponse(data);
    }
    return true;
});
