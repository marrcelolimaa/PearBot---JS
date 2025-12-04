const { Client, GatewayIntentBits, Collection, EmbedBuilder } = require('discord.js');
const fs = require('fs');
const CHAVEEMOJI = "<a:chave:1442696753571827803>";
const PEAREMOJI = "<:pearbot:1443238269252014192>";
const ARTIGO = "<a:artigo:1442696700580855929>";
const CONFIG = "<a:config:1442923666684907530>"
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
    ]
});

client.on('clientReady', () => {
    console.log(`Bot Online! ${client.user.tag}`);
    client.user.setActivity('📜 | !help para ajuda!', { type: 2});
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
        client.commands.set(command.data.name, command)
}

client.on('messageCreate', async message => {
    const prefix = '!';
   if (message.author.bot || !message.guild) return;
   if (message.mentions.has(client.user) && !message.content.startsWith(prefix)) {
    const content = message.content.replace(/@!?[0-9]+>/g, "").trim();
    const mentionEmbed = new EmbedBuilder()
      .setColor(0x9ACD32)
      .setTitle(`**Olá, ${message.author.username}! Eu sou o PearBot! ${PEAREMOJI}**`)
      .setDescription(`**${CHAVEEMOJI} Estou aqui para ajuda-lo.**`)
      .addFields(
        {
            name: `${CONFIG} **Como usar os comandos:**`,
            value: `Use o Prefixo **"!"** ou **/** `,
            inline: false
        },
        {
            name: `**${ARTIGO} Comando de ajuda.**`,
            value: "Digite **!help** para ver a lista completa de comandos.",
            inline: false
        }
      ) 
      .setFooter({text: "PearBot", iconURL: client.user.avatarURL()})
      .setTimestamp();
      return message.channel.send({embeds: [mentionEmbed]});
   }
   if (!message.content.startsWith(prefix)) return;
   
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

client.on("interactionCreate", async interaction => {
    if(!interaction.isCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if(!command) return

    try {
        await command.execute(interaction, client);
    } catch(error) {
        console.error(error);
        await interaction.reply({content: "Ocorreu um erro inusitado, tente novamente mais tarde"})
    }
});

require('dotenv').config();
const TOKEN = process.env.TOKEN;

if (!TOKEN) {
    console.error('Erro: TOKEN NÃO ENCONTRADO! Verifique o arquivo .env');
} else {
    client.login(TOKEN);
}
