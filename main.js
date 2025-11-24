const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`Bot Online! ${client.user.tag}`);
    client.user.setActivity('Insane ABACATE CODING DOG', { type: 3});
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command)
}

client.on('messageCreate', async message => {
    const prefix = '!';
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();;

    if (!client.commands.has(commandName)) return;
    const command = client.commands.get(commandName);

    try {
        await command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply("**OOPS! Houve um erro ao executar esse comando, tente novamente!**");
    }
})

require('dotenv').config();
const TOKEN = process.env.TOKEN;

if (!TOKEN) {
    console.error('Erro: TOKEN NÃO ENCONTRADO! Verifique o arquivo .env');
} else {
    client.login(TOKEN);
}
