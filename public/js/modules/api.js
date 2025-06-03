// API service for handling all API calls

const API_BASE_URL = '/api';

export const generateReadme = async (projectDetails) => {
    try {
        const response = await fetch(`${API_BASE_URL}/generate-readme`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ projectDetails })
        });

        if (!response.ok) {
            throw new Error('Failed to generate README');
        }

        return await response.json();
    } catch (error) {
        console.error('Error generating README:', error);
        throw error;
    }
};

export const submitContactForm = async (formData) => {
    try {
        const response = await fetch(`${API_BASE_URL}/contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        if (!response.ok) {
            throw new Error('Failed to submit contact form');
        }

        return await response.json();
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

export const fetchTemplates = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/templates`);
        if (!response.ok) {
            throw new Error('Failed to fetch templates');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching templates:', error);
        throw error;
    }
}; 