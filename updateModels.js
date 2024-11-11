const fs = require('fs');
const URL = 'https://api.zanity.xyz/v1/models';
const FILE_PATH = 'config.yaml';

async function updateModels() {
    try {
        const response = await fetch(URL);
        const result = await response.json();
        const models = result.data
            .filter(model => model.endpoint === '/v1/chat/completions')
            .map(model => model.id);

        const fileContents = fs.readFileSync(FILE_PATH, 'utf8');
        const updatedContent = fileContents.replace(
            /default:\n\s+([^\n]+\n)+/,
            `default:\n          ${models.map(id => `- ${id}`).join('\n          ')}\n`
        );

        fs.writeFileSync(FILE_PATH, updatedContent);
    } catch (error) {
        console.error('Error updating models:', error);
        process.exit(1);
    }
}

updateModels();
