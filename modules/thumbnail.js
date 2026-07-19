export function renderThumbnail(data) {
    const thumbResults = document.getElementById('thumb-results');
    if (!thumbResults) return;

    const hqThumb = `https://img.youtube.com/vi/${data.videoId}/hqdefault.jpg`;
    const maxThumb = `https://img.youtube.com/vi/${data.videoId}/maxresdefault.jpg`;

    thumbResults.innerHTML = `
        <div class="card">
            <img src="${maxThumb}" style="width: 100%; border-radius: 8px; margin-bottom: 12px; object-fit: cover;" onerror="this.src='${hqThumb}'">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                <button class="btn" style="padding: 8px 12px; background: var(--accent); color: white; border: none; border-radius: 6px; cursor: pointer;" onclick="window.open('${maxThumb}', '_blank')">Open MaxRes</button>
                <button class="btn" style="padding: 8px 12px; background: var(--bg-primary); border: 1px solid var(--border); border-radius: 6px; cursor: pointer;" onclick="window.open('https://images.google.com/searchbyimage?image_url=${maxThumb}', '_blank')">Reverse Image Search</button>
            </div>
            <div style="margin-top: 16px;">
                <h4 style="margin-bottom: 8px;">Download resolutions</h4>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 6px;"><a href="#" class="download-trigger" data-url="${maxThumb}" style="color: var(--accent); text-decoration: none;">HD (MaxRes)</a></li>
                    <li style="margin-bottom: 6px;"><a href="#" class="download-trigger" data-url="${hqThumb}" style="color: var(--accent); text-decoration: none;">SD (HQ)</a></li>
                    <li style="margin-bottom: 6px;"><a href="#" class="download-trigger" data-url="https://img.youtube.com/vi/${data.videoId}/mqdefault.jpg" style="color: var(--accent); text-decoration: none;">MQ (Medium)</a></li>
                    <li style="margin-bottom: 6px;"><a href="#" class="download-trigger" data-url="https://img.youtube.com/vi/${data.videoId}/default.jpg" style="color: var(--accent); text-decoration: none;">Default</a></li>
                </ul>
            </div>
        </div>
    `;

    // Attach download listeners
    document.querySelectorAll('.download-trigger').forEach(el => {
        el.addEventListener('click', (e) => {
            e.preventDefault();
            chrome.runtime.sendMessage({
                action: 'downloadFile', 
                url: e.target.dataset.url, 
                filename: `thumbnail-${data.videoId}.jpg`
            });
        });
    });
}
