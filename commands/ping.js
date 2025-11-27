// commands/ping.js

const { EmbedBuilder } = require('discord.js');
const  EMOJIS = require("../config/emojis");
const{SlashCommandBuilder} = require("@discordjs/builders");
module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription(`${EMOJIS.WIFI} **Retorna a latência da API e do sistema do bot**.`),
    
    async execute(message, args, client) {
        
        const messageLatency = Date.now() - message.createdTimestamp;
        const apiLatency = client.ws.ping;

        const pingEmbed = new EmbedBuilder()
            .setColor(0x9ACD32) // Verde claro
            .setTitle(`**${EMOJIS.CHECK}  Latência do Sistema**`)
            .setDescription(`**Aqui estão as Latências atuais do Bot:**`)
            .setThumbnail(client.user.displayAvatarURL()) // Foto do bot
            .addFields(
                { 
                    name: `**${EMOJIS.WIFI}  Conexão (API)**`, 
                    value: `**${apiLatency}ms**`, 
                    inline: true 
                },
                { 
                    name: `**${EMOJIS.PONTO}  Processamento**`, 
                    value: `**${messageLatency}ms**`, 
                    inline: false 
                }
            )
            .setTimestamp(); 

        await message.channel.send({ embeds: [pingEmbed] });
    },
};