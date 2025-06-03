// UI components and handlers

export class LoadingSpinner {
    constructor(elementId) {
        this.element = document.getElementById(elementId);
    }

    show() {
        this.element.classList.remove('hidden');
    }

    hide() {
        this.element.classList.add('hidden');
    }
}

export class FormHandler {
    constructor(formId) {
        this.form = document.getElementById(formId);
        this.inputs = this.form.querySelectorAll('input, textarea');
    }

    getFormData() {
        const formData = {};
        this.inputs.forEach(input => {
            formData[input.name] = input.value;
        });
        return formData;
    }

    reset() {
        this.form.reset();
    }

    setError(inputName, message) {
        const input = this.form.querySelector(`[name="${inputName}"]`);
        const errorDiv = input.nextElementSibling;
        if (errorDiv && errorDiv.classList.contains('error-message')) {
            errorDiv.textContent = message;
        }
    }

    clearErrors() {
        this.form.querySelectorAll('.error-message').forEach(el => {
            el.textContent = '';
        });
    }
}

export class Modal {
    constructor(modalId) {
        this.modal = document.getElementById(modalId);
        this.closeBtn = this.modal.querySelector('.close-modal');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.closeBtn.addEventListener('click', () => this.close());
        window.addEventListener('click', (e) => {
            if (e.target === this.modal) {
                this.close();
            }
        });
    }

    open() {
        this.modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.modal.classList.add('hidden');
        document.body.style.overflow = 'auto';
    }
}

export class TabManager {
    constructor(tabContainerId) {
        this.container = document.getElementById(tabContainerId);
        this.tabs = this.container.querySelectorAll('[data-tab]');
        this.setupEventListeners();
    }

    setupEventListeners() {
        this.tabs.forEach(tab => {
            tab.addEventListener('click', () => this.switchTab(tab.dataset.tab));
        });
    }

    switchTab(tabId) {
        this.tabs.forEach(tab => {
            const content = document.getElementById(tab.dataset.tab);
            if (tab.dataset.tab === tabId) {
                tab.classList.add('active');
                content.classList.remove('hidden');
            } else {
                tab.classList.remove('active');
                content.classList.add('hidden');
            }
        });
    }
} 