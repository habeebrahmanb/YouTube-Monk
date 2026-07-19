export function renderDescription(data) {
    const descResults = document.getElementById('desc-results');
    if (!descResults) return;

    if (!data.description) {
        descResults.innerHTML = '<p>No description found.</p>';
        return;
    }

    const descText = data.description || '';
    const charCount = descText.length;
    const wordCount = descText.split(/\s+/).filter(w => w.length > 0).length;
    
    // Extract Links
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = descText.match(urlRegex) || [];

    // Extract Emails
    const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9_-]+)/g;
    const emails = descText.match(emailRegex) || [];

    // Extract Hashtags
    const hashRegex = /(#[a-zA-Z0-9_]+)/g;
    const hashtags = descText.match(hashRegex) || [];

    descResults.innerHTML = `
        <div class="card" style="margin-bottom: 16px;">
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; text-align: center;">
                <div>
                    <span class="text-secondary" style="font-size: 0.8rem; text-transform: uppercase;">Characters</span>
                    <strong style="display: block; font-size: 1.2rem;">${charCount}</strong>
                </div>
                <div>
                    <span class="text-secondary" style="font-size: 0.8rem; text-transform: uppercase;">Words</span>
                    <strong style="display: block; font-size: 1.2rem;">${wordCount}</strong>
                </div>
            </div>
        </div>

        <div class="card" style="margin-bottom: 16px;">
            <h4 style="margin-bottom: 12px;">Extracted Data</h4>
            <p><strong>Links:</strong> ${urls.length}</p>
            <p><strong>Emails:</strong> ${emails.length}</p>
            <p><strong>Hashtags:</strong> ${hashtags.length}</p>
        </div>

        <div class="card">
            <h4 style="margin-bottom: 12px;">Full Text</h4>
            <div style="max-height: 150px; overflow-y: auto; background: var(--bg-primary); padding: 12px; border-radius: 8px; font-size: 0.85rem; border: 1px solid var(--border); white-space: pre-wrap;">${data.description}</div>
            <button id="copy-desc" style="margin-top: 12px; width: 100%; padding: 8px; background: var(--bg-primary); border: 1px solid var(--border); border-radius: 6px; cursor: pointer;">Copy Description</button>
        </div>
    `;

    document.getElementById('copy-desc').addEventListener('click', () => {
        navigator.clipboard.writeText(data.description);
        alert('Description copied!');
    });
}
