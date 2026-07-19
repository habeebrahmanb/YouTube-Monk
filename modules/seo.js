export function analyzeSEO(data) {
    let score = 100;
    let issuesHTML = '';

    // Description Length
    if (!data.description || data.description.length < 200) {
        score -= 15;
        issuesHTML += createIssueHTML('critical', 'Missing Description', 'Description is under 200 characters.', 'Expand description to 200+ words with target keywords.');
    } else {
        issuesHTML += createIssueHTML('passed', 'Description Length', 'Description length is adequate.', '');
    }

    // Tags
    if (!data.tags || data.tags.length === 0) {
        score -= 20;
        issuesHTML += createIssueHTML('critical', 'No Tags', 'Video has no tags.', 'Add at least 15-20 relevant tags to improve searchability.');
    } else if (data.tags.length < 10) {
        score -= 5;
        issuesHTML += createIssueHTML('warning', 'Low Tag Count', `Found only ${data.tags.length} tags.`, 'Add more tags to maximize search potential.');
    } else {
        issuesHTML += createIssueHTML('passed', 'Tags Present', `Found ${data.tags.length} tags.`, '');
    }

    // Title Length
    if (data.title.length < 30) {
        score -= 10;
        issuesHTML += createIssueHTML('warning', 'Short Title', 'Title is less than 30 characters.', 'Expand title to include more keywords.');
    } else if (data.title.length > 70) {
        score -= 10;
        issuesHTML += createIssueHTML('warning', 'Long Title', 'Title is more than 70 characters.', 'Keep title under 70 characters for best display on mobile.');
    } else {
        issuesHTML += createIssueHTML('passed', 'Title Length', 'Optimal title length.', '');
    }

    // Links in description
    const descText = data.description || '';
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    const urls = descText.match(urlRegex) || [];
    if (urls.length === 0) {
        score -= 5;
        issuesHTML += createIssueHTML('warning', 'No Links', 'No external links found in description.', 'Add links to your social media, website, or related videos.');
    } else {
        issuesHTML += createIssueHTML('passed', 'Links Present', `Found ${urls.length} links in description.`, '');
    }

    // Hashtags
    const hashRegex = /(#[a-zA-Z0-9_]+)/g;
    const hashtags = descText.match(hashRegex) || [];
    if (hashtags.length === 0) {
        score -= 5;
        issuesHTML += createIssueHTML('warning', 'No Hashtags', 'No hashtags found in description.', 'Add up to 3 relevant hashtags to the bottom of your description.');
    } else {
        issuesHTML += createIssueHTML('passed', 'Hashtags Present', `Found ${hashtags.length} hashtags.`, '');
    }
    
    // Category
    if (!data.category) {
        score -= 5;
    } else {
        issuesHTML += createIssueHTML('passed', 'Category Selected', `Video is categorized under ${data.category}.`, '');
    }

    score = Math.max(0, score);
    
    // Update Score Circle
    const circle = document.getElementById('dash-score-circle');
    const text = document.getElementById('dash-score-text');
    const health = document.getElementById('dash-health');

    circle.style.strokeDasharray = `${score}, 100`;
    text.textContent = score;

    if (score >= 80) {
        circle.style.stroke = '#10b981';
        health.textContent = 'Excellent';
        health.style.background = '#10b981';
    } else if (score >= 50) {
        circle.style.stroke = '#f59e0b';
        health.textContent = 'Average';
        health.style.background = '#f59e0b';
    } else {
        circle.style.stroke = '#ef4444';
        health.textContent = 'Poor';
        health.style.background = '#ef4444';
    }

    // Populate SEO Section
    const seoResults = document.getElementById('seo-results');
    if (seoResults) {
        seoResults.innerHTML = issuesHTML;
    }
}

function createIssueHTML(type, problem, reason, rec) {
    let icon = '';
    let color = '';
    let label = '';
    
    if (type === 'critical') {
        icon = 'cancel';
        color = '#ef4444';
        label = 'Critical';
    } else if (type === 'warning') {
        icon = 'warning';
        color = '#f59e0b';
        label = 'Warning';
    } else {
        icon = 'check_circle';
        color = '#10b981';
        label = 'Passed';
    }

    return `
        <div class="card" style="border-left: 4px solid ${color}; padding-left: 16px; margin-bottom: 16px;">
            <div style="display: flex; align-items: center; margin-bottom: 8px;">
                <span class="material-icons" style="color: ${color}; margin-right: 8px; font-size: 1.2rem;">${icon}</span>
                <strong style="font-size: 1.05rem;">${problem}</strong>
                <span style="margin-left: auto; font-size: 0.75rem; text-transform: uppercase; font-weight: bold; color: ${color}; background: ${color}20; padding: 2px 8px; border-radius: 12px;">${label}</span>
            </div>
            <div style="margin-left: 28px;">
                <p class="text-secondary" style="font-size: 0.9rem; margin-bottom: 4px;"><strong>Reason:</strong> ${reason}</p>
                ${rec ? `<p style="font-size: 0.9rem; margin-top: 4px; color: var(--text-primary);"><strong>💡 Fix:</strong> ${rec}</p>` : ''}
            </div>
        </div>
    `;
}
