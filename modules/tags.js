export function renderTags(data) {
    const tagsContainer = document.getElementById('tags-container');
    if (!tagsContainer) return;

    if (!data.tags || data.tags.length === 0) {
        tagsContainer.innerHTML = '<p>No tags found.</p>';
        return;
    }

    let html = `<div style="margin-bottom: 12px; display: flex; justify-content: space-between; align-items: center;">
        <span>Total Tags: <strong>${data.tags.length}</strong></span>
        <button id="copy-all-tags" style="padding: 6px 12px; background: var(--bg-primary); border: 1px solid var(--border); border-radius: 6px; cursor: pointer;">Copy All</button>
    </div>
    <div style="display: flex; flex-wrap: wrap; gap: 8px;">`;

    data.tags.forEach(tag => {
        html += `<span class="chip" style="background: var(--bg-primary); border: 1px solid var(--border); padding: 4px 10px; border-radius: 16px; font-size: 0.85rem;">${tag}</span>`;
    });
    
    html += `</div>`;
    tagsContainer.innerHTML = html;

    document.getElementById('copy-all-tags').addEventListener('click', () => {
        navigator.clipboard.writeText(data.tags.join(', '));
        alert('Tags copied to clipboard!');
    });
}
