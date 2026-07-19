export function renderExportTools(data) {
    const exportContainer = document.getElementById('export-actions');
    if (!exportContainer) return;

    exportContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px;">
            <button id="export-json" class="btn" style="padding: 12px; background: var(--bg-primary); border: 1px solid var(--border); border-radius: 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-primary);">
                <span class="material-icons" style="font-size: 2rem; color: #f59e0b; margin-bottom: 8px;">data_object</span>
                <strong>Export JSON</strong>
            </button>
            <button id="export-csv" class="btn" style="padding: 12px; background: var(--bg-primary); border: 1px solid var(--border); border-radius: 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-primary);">
                <span class="material-icons" style="font-size: 2rem; color: #10b981; margin-bottom: 8px;">table_chart</span>
                <strong>Export CSV</strong>
            </button>
            <button id="export-txt" class="btn" style="padding: 12px; background: var(--bg-primary); border: 1px solid var(--border); border-radius: 8px; cursor: pointer; display: flex; flex-direction: column; align-items: center; justify-content: center; color: var(--text-primary);">
                <span class="material-icons" style="font-size: 2rem; color: #3b82f6; margin-bottom: 8px;">description</span>
                <strong>Export TXT</strong>
            </button>
        </div>
    `;

    document.getElementById('export-json').addEventListener('click', () => {
        downloadFile(JSON.stringify(data, null, 2), `yt-monk-${data.videoId}.json`, 'application/json');
    });

    document.getElementById('export-csv').addEventListener('click', () => {
        const csvContent = "Key,Value\n" + 
            `Video ID,${data.videoId}\n` +
            `Title,"${data.title.replace(/"/g, '""')}"\n` +
            `Channel,"${data.channel.replace(/"/g, '""')}"\n` +
            `Views,${data.views}\n` +
            `Likes,${data.likes}\n` +
            `Comments,${data.comments}\n` +
            `Upload Date,${data.uploadDate}\n` +
            `Duration,${data.duration}\n` +
            `Category,${data.category}\n` +
            `Tags,"${data.tags.join(', ')}"\n`;
        downloadFile(csvContent, `yt-monk-${data.videoId}.csv`, 'text/csv');
    });

    document.getElementById('export-txt').addEventListener('click', () => {
        const txtContent = `YouTube Monk Report\n\nTitle: ${data.title}\nChannel: ${data.channel}\nViews: ${data.views}\nLikes: ${data.likes}\nComments: ${data.comments}\n\nDescription:\n${data.description}\n\nTags:\n${data.tags.join(', ')}`;
        downloadFile(txtContent, `yt-monk-${data.videoId}.txt`, 'text/plain');
    });
}

function downloadFile(content, fileName, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    chrome.runtime.sendMessage({
        action: 'downloadFile', 
        url: url, 
        filename: fileName
    });
}
