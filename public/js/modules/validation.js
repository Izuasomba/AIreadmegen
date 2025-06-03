// Validation rules and helpers

export const validationRules = {
    required: (value) => ({
        isValid: value.trim().length > 0,
        message: 'This field is required'
    }),
    
    email: (value) => ({
        isValid: /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Please enter a valid email address'
    }),
    
    minLength: (min) => (value) => ({
        isValid: value.length >= min,
        message: `Must be at least ${min} characters long`
    }),
    
    maxLength: (max) => (value) => ({
        isValid: value.length <= max,
        message: `Must be no more than ${max} characters long`
    }),
    
    url: (value) => ({
        isValid: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/.test(value),
        message: 'Please enter a valid URL'
    }),
    
    projectDetails: (value) => ({
        isValid: value.trim().length >= 50,
        message: 'Project details must be at least 50 characters long'
    })
};

export class Validator {
    constructor(rules) {
        this.rules = rules;
    }

    validate(value) {
        for (const rule of this.rules) {
            const result = rule(value);
            if (!result.isValid) {
                return result;
            }
        }
        return { isValid: true };
    }
}

export const createValidator = (fieldRules) => {
    const rules = fieldRules.map(ruleName => {
        if (typeof validationRules[ruleName] === 'function') {
            return validationRules[ruleName];
        }
        if (typeof ruleName === 'function') {
            return ruleName;
        }
        return () => ({ isValid: true });
    });
    
    return new Validator(rules);
}; 