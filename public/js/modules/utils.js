// Utility functions for the application

export const showNotification = (message, type = 'success') => {
    const notificationDiv = document.getElementById('notification');
    notificationDiv.textContent = message;
    notificationDiv.style.backgroundColor = type === 'success' ? '#4CAF50' : '#f44336';
    notificationDiv.classList.add('show');
    setTimeout(() => {
        notificationDiv.classList.remove('show');
    }, 3000);
};

export const copyToClipboard = (text) => {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showNotification('Copied to clipboard!', 'success');
    } catch (err) {
        console.error('Failed to copy text: ', err);
        showNotification('Failed to copy text.', 'error');
    }
    document.body.removeChild(textarea);
};

export const validateInput = (input, type = 'text') => {
    if (!input) return false;
    
    switch (type) {
        case 'email':
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input);
        case 'url':
            return /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(input);
        default:
            return input.trim().length > 0;
    }
};

export const debounce = (func, wait) => {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}; 