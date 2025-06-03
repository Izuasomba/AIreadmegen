module.exports = {
    // Server configuration
    server: {
        port: process.env.PORT || 3000,
        env: process.env.NODE_ENV || 'development'
    },

    // OpenAI configuration
    openai: {
        model: 'gpt-4o-mini',
        temperature: 0.7,
        maxTokens: 1500
    },

    // Application settings
    app: {
        name: 'AI README Generator',
        version: '1.0.0',
        description: 'Generate professional README files using AI',
        contact: {
            email: 'support@aireadmegen.com',
            location: 'San Francisco, CA'
        }
    },

    // Security settings
    security: {
        cors: {
            origin: '*',
            methods: ['GET', 'POST'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }
    }
}; 
