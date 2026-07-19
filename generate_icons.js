// This is a node script to just generate the icon placeholders.
const fs = require('fs');

const iconData = "iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAADkSURBVHhe7c9BDQAwEAOh+jedC6c23ICU7E/y11nnnGvOOdecc64551xzzrnmHACAhAAAJIQAIKEEAAklAEgoAUBCiQEAAiEACCEACCkACCEACCkEAEmEACCEAAklAEgoAUBCSQAQQgAQQgAQUgIQQgCAQEgAEEIAEEIAkFACAIRQAgCEEAIAhBIAhBAAIBRSAIAQAgCEEACEEAAklAAAQggAEEIACEUIABAIAUBCCABCCABCCABCCABCCAASSgCQQAgAQkgAEAIAhFIIABAIAUBCCAAQSgCQQEIJAJJn//u1l9/lK/7xT7jZAAAAAElFTkSuQmCC";

const buffer = Buffer.from(iconData, 'base64');
fs.mkdirSync('icons', { recursive: true });
fs.writeFileSync('icons/icon16.png', buffer);
fs.writeFileSync('icons/icon32.png', buffer);
fs.writeFileSync('icons/icon48.png', buffer);
fs.writeFileSync('icons/icon128.png', buffer);

console.log("Icons generated.");
