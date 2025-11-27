//commands/help.js
const { EmbedBuilder } = require("discord.js");
const EMOJIS = require("../config/emojis");
const{SlashCommandBuilder} = require ("@discordjs/builders")
module.exports = {
    data: new SlashCommandBuilder()
        .setName("help")
        .setDescription(`**${EMOJIS.ARTIGO} Esse comando!**`),
    
    async execute(message, args, client) {
        if(!message.guildId) {
            return message.reply(`${EMOJIS.NEGADO} **Use esse comando em um servidor.**`);
        }
        const commandsMap = client.commands.map(command => {
            return `**!${command.data.name}**: ${command.data.description}`;
        });
        const helpEmbed = new EmbedBuilder()
        .setColor(0x3498DB)
        .setTitle(`${EMOJIS.ARTIGO} **LISTA DE COMANDOS - PEARBOT**`)
        .setDescription("**Use o prefixo ! antes de cada comando. \nVocê tem **" + client.commands.size + `** comandos carregados.** ${EMOJIS.CHECK}`)
        .addFields(
            {name: `**${EMOJIS.CONFIG}  Comandos de Moderação e utilidade**`,
                value: commandsMap.join('\n'),
                inline:false
            }
        ) .setTimestamp();
        message.channel.send({embeds: [helpEmbed]});
    }
}