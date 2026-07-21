export function updateDashboard(data) {
    document.getElementById('dash-title').innerText = data.title;
    document.getElementById('dash-channel').innerText = data.channel;
    document.getElementById('dash-views').innerText = formatNumber(data.views);
    document.getElementById('dash-likes').innerText = formatNumber(data.likes);
    document.getElementById('dash-thumbnail').src = data.thumbnailUrl;

    const statsResults = document.getElementById('stats-results');
    if (statsResults) {
        let engagement = "0%";
        const numLikes = parseInt((data.likes || "0").toString().replace(/[^0-9]/g, ''));
        const numViews = parseInt((data.views || "0").toString().replace(/[^0-9]/g, ''));
        if (numViews > 0 && numLikes > 0) {
            engagement = ((numLikes / numViews) * 100).toFixed(2) + "%";
        }
        
        statsResults.innerHTML = `
            <div class="metrics-grid" style="margin-bottom: 20px;">
                <div class="metric-card">
                    <span class="material-icons" style="color: #3b82f6;">visibility</span>
                    <div class="metric-info">
                        <span class="metric-label">Total Views</span>
                        <strong style="font-size: 1.2rem;">${formatNumber(data.views)}</strong>
                    </div>
                </div>
                <div class="metric-card">
                    <span class="material-icons" style="color: #ef4444;">thumb_up</span>
                    <div class="metric-info">
                        <span class="metric-label">Total Likes</span>
                        <strong style="font-size: 1.2rem;">${formatNumber(data.likes)}</strong>
                    </div>
                </div>
                <div class="metric-card">
                    <span class="material-icons" style="color: #10b981;">forum</span>
                    <div class="metric-info">
                        <span class="metric-label">Comments</span>
                        <strong style="font-size: 1.2rem;">${formatNumber(data.comments || '0')}</strong>
                    </div>
                </div>
                <div class="metric-card">
                    <span class="material-icons" style="color: #f59e0b;">trending_up</span>
                    <div class="metric-info">
                        <span class="metric-label">Engagement</span>
                        <strong style="font-size: 1.2rem;">${engagement}</strong>
                    </div>
                </div>
            </div>
            
            <div class="card" style="border-left: 4px solid var(--accent);">
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border);">
                    <span class="text-secondary" style="display: flex; align-items: center;"><span class="material-icons" style="font-size: 1.2rem; margin-right: 8px;">calendar_today</span>Upload Date</span>
                    <strong>${formatDate(data.uploadDate) || 'Unknown'}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0; border-bottom: 1px solid var(--border);">
                    <span class="text-secondary" style="display: flex; align-items: center;"><span class="material-icons" style="font-size: 1.2rem; margin-right: 8px;">schedule</span>Duration</span>
                    <strong>${data.duration || 'Unknown'}</strong>
                </div>
                <div style="display: flex; justify-content: space-between; padding: 12px 0;">
                    <span class="text-secondary" style="display: flex; align-items: center;"><span class="material-icons" style="font-size: 1.2rem; margin-right: 8px;">category</span>Category</span>
                    <strong>${data.category || 'Unknown'}</strong>
                </div>
            </div>
        `;
    }
}

function formatNumber(numStr) {
    const num = parseInt(numStr.replace(/,/g, ''), 10);
    if (isNaN(num)) return numStr;
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function formatDate(dateString) {
    if (!dateString || dateString === 'Unknown') return 'Unknown';
    try {
        const d = new Date(dateString);
        if (isNaN(d.getTime())) return dateString;
        return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) {
        return dateString;
    }
}
