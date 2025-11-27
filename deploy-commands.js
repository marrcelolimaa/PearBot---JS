//deploy-commands.js
// deploy-commands.js
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');
require('dotenv').config();

const commands = [];
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

// Itera sobre todos os arquivos de comando
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    // Adiciona a estrutura 'data' do Slash Command
    commands.push(command.data.toJSON()); 
}

// ⚠️ SUBSTITUA PELOS SEUS VALORES REAIS DO PORTAL DO DESENVOLVEDOR ⚠️
const CLIENT_ID = '1441870694823493642';  
const TOKEN = process.env.TOKEN; // Carregado do seu .env

const rest = new REST({ version: '9' }).setToken(TOKEN);

(async () => {
    try {
        console.log('Iniciando o registro de comandos de aplicação (/) no servidor...');

        await rest.put(
            Routes.applicationCommands(CLIENT_ID), 
            { body: commands },
        );

        console.log('Comandos de aplicação (/) registrados com sucesso!');
    } catch (error) {
        console.error('Erro ao registrar comandos:', error);
    }
})();