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

        const yamlContent = `version: 1.1.2
cache: true
registration:
  socialLogins:
    - discord
    - facebook
    - github
    - google
    - openid
endpoints:
  custom:
    - name: Zanity
      apiKey: user_provided
      baseURL: https://api.zanity.xyz/v1
      models:
        default:
          ${models.map(id => `- ${id}`).join('\n          ')}
        fetch: true
      titleConvo: true
      titleModel: llama-3.1-8b-instruct
      summarize: false
      summaryModel: llama-3.1-8b-instruct
      forcePrompt: false
      dropParams: []
      iconURL: >-
        https://cdn.discordapp.com/icons/1268484294779736065/fb280e01dae7d8f210de2099b8cbd908.webp
      modelDisplayLabel: Zanity
`;

        fs.writeFileSync(FILE_PATH, yamlContent);
        console.log('Config file updated');
    } catch (error) {
        console.error('error updating models:', error);
        process.exit(1);
    }
}

updateModels();