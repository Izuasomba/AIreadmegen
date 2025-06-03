import { showNotification, copyToClipboard, validateInput } from './modules/utils.js';
import { generateReadme, submitContactForm } from './modules/api.js';
import { LoadingSpinner, FormHandler, Modal, TabManager } from './modules/ui.js';
import { createValidator, validationRules } from './modules/validation.js';

// Initialize UI components
const loadingSpinner = new LoadingSpinner('loadingSpinner');
const readmeForm = new FormHandler('readmeForm');
const contactForm = new FormHandler('contactForm');
const helpModal = new Modal('helpModal');
const tabManager = new TabManager('tabContainer');

// Create validators
const projectDetailsValidator = createValidator(['required', 'projectDetails']);
const contactFormValidator = createValidator(['required', 'email']);

// DOM Elements
const projectDetailsInput = document.getElementById('projectDetails');
const generateBtn = document.getElementById('generateBtn');
const copyBtn = document.getElementById('copyBtn');
const generatedReadmeOutput = document.getElementById('generatedReadme');
const generateText = document.getElementById('generateText');
const errorMessageDiv = document.getElementById('errorMessage');
const notificationDiv = document.getElementById('notification');

// Event Handlers
async function handleGenerateClick() {
    const projectDetails = projectDetailsInput.value.trim();
    
    // Validate input
    const validation = projectDetailsValidator.validate(projectDetails);
    if (!validation.isValid) {
        errorMessageDiv.textContent = validation.message;
        errorMessageDiv.classList.remove('hidden');
        return;
    }

    // Clear previous output and error
    generatedReadmeOutput.value = '';
    errorMessageDiv.classList.add('hidden');
    copyBtn.disabled = true;

    // Show loading indicator
    generateBtn.disabled = true;
    generateText.textContent = 'Generating...';
    loadingSpinner.show();

    try {
        const response = await generateReadme(projectDetails);
        generatedReadmeOutput.value = response.readme;
        copyBtn.disabled = false;
        showNotification('README generated successfully!');
    } catch (error) {
        console.error('Error generating README:', error);
        errorMessageDiv.textContent = 'Failed to generate README. Please try again.';
        errorMessageDiv.classList.remove('hidden');
        showNotification('Failed to generate README', 'error');
    } finally {
        generateBtn.disabled = false;
        generateText.textContent = 'Generate README';
        loadingSpinner.hide();
    }
}

async function handleContactSubmit(event) {
    event.preventDefault();
    const formData = contactForm.getFormData();
    
    // Validate form data
    const emailValidation = contactFormValidator.validate(formData.email);
    if (!emailValidation.isValid) {
        contactForm.setError('email', emailValidation.message);
        return;
    }

    try {
        await submitContactForm(formData);
        contactForm.reset();
        showNotification('Message sent successfully!');
    } catch (error) {
        console.error('Error submitting contact form:', error);
        showNotification('Failed to send message', 'error');
    }
}

// Event Listeners
generateBtn.addEventListener('click', handleGenerateClick);
copyBtn.addEventListener('click', () => copyToClipboard(generatedReadmeOutput.value));
contactForm.form.addEventListener('submit', handleContactSubmit);

// Initialize tabs
document.addEventListener('DOMContentLoaded', () => {
    tabManager.switchTab('basic-tab');
}); 