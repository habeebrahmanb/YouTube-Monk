export function renderCopyTools(data) {
    const copyContainer = document.getElementById('copy-actions');
    if (!copyContainer) return;

    copyContainer.innerHTML = `
        <div style="display: grid; grid-template-columns: 1fr; gap: 12px;">
            <div class="card" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0;">
                <div>
                    <strong style="display: block;">Video Title</strong>
                    <span class="text-secondary" style="font-size: 0.8rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 250px; display: inline-block;">${data.title}</span>
                </div>
                <button id="copy-title" class="btn" style="background: var(--bg-primary); border: 1px solid var(--border); padding: 8px 12px; border-radius: 6px; cursor: pointer; color: var(--text-primary);">Copy</button>
            </div>
            
            <div class="card" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0;">
                <div>
                    <strong style="display: block;">Video URL</strong>
                    <span class="text-secondary" style="font-size: 0.8rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 250px; display: inline-block;">https://youtu.be/${data.videoId}</span>
                </div>
                <button id="copy-url" class="btn" style="background: var(--bg-primary); border: 1px solid var(--border); padding: 8px 12px; border-radius: 6px; cursor: pointer; color: var(--text-primary);">Copy</button>
            </div>

            <div class="card" style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0;">
                <div>
                    <strong style="display: block;">Thumbnail URL</strong>
                    <span class="text-secondary" style="font-size: 0.8rem; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; max-width: 250px; display: inline-block;">${data.thumbnailUrl}</span>
                </div>
                <button id="copy-thumb" class="btn" style="background: var(--bg-primary); border: 1px solid var(--border); padding: 8px 12px; border-radius: 6px; cursor: pointer; color: var(--text-primary);">Copy</button>
            </div>
        </div>
    `;

    document.getElementById('copy-title').addEventListener('click', () => copyToClipboard(data.title));
    document.getElementById('copy-url').addEventListener('click', () => copyToClipboard(`https://youtu.be/${data.videoId}`));
    document.getElementById('copy-thumb').addEventListener('click', () => copyToClipboard(data.thumbnailUrl));
}

function copyToClipboard(text) {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
}
