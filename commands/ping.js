const { EmbedBuilder } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const EMOJIS = require("../config/emojis"); 

module.exports = {
    category: "Info",
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription(`${EMOJIS.WIFI} Retorna a latência da API e do sistema do bot.`),

    async execute(interactionOrMessage, args, client) {
        const isSlashCommand = interactionOrMessage.deferred || interactionOrMessage.replied || interactionOrMessage.commandName === 'ping';
        
        let initialTime, channel, userAvatarURL;

        if (isSlashCommand) {
            await interactionOrMessage.deferReply(); // Envia uma resposta de "pensando" (obrigatório para Slash)
            initialTime = interactionOrMessage.createdTimestamp;
            channel = interactionOrMessage.channel;
        } else {
            initialTime = interactionOrMessage.createdTimestamp;
            channel = interactionOrMessage.channel;
        }

        const messageLatency = Date.now() - initialTime; // Latência da Mensagem/Interação
        const apiLatency = client.ws.ping; // Latência do WebSocket da API

        // 2. Criação do Embed
        const pingEmbed = new EmbedBuilder()
            .setColor(0xFF8C00) 
            .setTitle(`**${EMOJIS.CHECK} Latência e Status do Bot**`)
            .setDescription(`**Detalhes da performance e latência em milissegundos** \`ms\`:`)
            .setThumbnail(client.user.displayAvatarURL())
            .addFields(
                // Latência da API (WebSocket)
                { 
                    name: `**${EMOJIS.WIFI} Conexão (API)**`, 
                    value: `\`${apiLatency}ms\``, // Latência em tempo real com o servidor Discord
                    inline: true 
                },
                // Latência de Processamento (Bot)
                { 
                    name: `**${EMOJIS.PONTO} Processamento Local**`, 
                    value: `\`${messageLatency}ms\``, // Tempo entre o envio e o início do processamento
                    inline: true 
                },
                // Uptime do Bot
                { 
                    name: `**${EMOJIS.RELOGIO} Uptime do Bot**`, 
                    value: `\`${formatUptime(client.uptime)}\``, // Usa uma função auxiliar
                    inline: false 
                },
                // Informações do Sistema (Exemplo: uso de memória)
                {
                    name: `**${EMOJIS.SETA} Uso de Memória**`,
                    value: `\`${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)} MB\``,
                    inline: true
                }
            )
            .setTimestamp()
            .setFooter({ text: `PearBot`, iconURL: client.user.displayAvatarURL() });


        // 3. Envio da resposta (diferente para Slash e Prefixo)
        if (isSlashCommand) {
            await interactionOrMessage.editReply({ embeds: [pingEmbed] });
        } else {
            await channel.send({ embeds: [pingEmbed] });
        }
    },
};

function formatUptime(ms) {
    const days = Math.floor(ms / (1000 * 60 * 60 * 24));
    ms -= days * (1000 * 60 * 60 * 24);
    const hours = Math.floor(ms / (1000 * 60 * 60));
    ms -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(ms / (1000 * 60));
    ms -= minutes * (1000 * 60);
    const seconds = Math.floor(ms / 1000);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
}