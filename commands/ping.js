// commands/ping.js

const { EmbedBuilder } = require('discord.js');

module.exports = {
    // dados
    data: {
        name: 'ping',
        description: 'Retorna a latência da API e do sistema do bot.',
    },
    
    async execute(message, args, client) {
        
        const messageLatency = Date.now() - message.createdTimestamp;
        const emojiwifi = "<a:gatonet:1442614687551328276>"
        const emojiponto = "<a:ponto:1442614730421440552>"
        const emojicerto = "<a:serto:1442614527018401936>"
        const apiLatency = client.ws.ping;

        const pingEmbed = new EmbedBuilder()
            .setColor(0x9ACD32) // Verde claro
            .setTitle(`**${emojicerto}  Latência do Sistema**`)
            .setDescription(`**Aqui estão as Latências atuais do Bot:**`)
            .setThumbnail(client.user.displayAvatarURL()) // Foto do bot
            .addFields(
                { 
                    name: `**${emojiwifi}  Conexão (API)**`, 
                    value: `**${apiLatency}ms**`, 
                    inline: true 
                },
                { 
                    name: `**${emojiponto}  Processamento**`, 
                    value: `**${messageLatency}ms**`, 
                    inline: false 
                }
            )
            .setTimestamp(); 

        await message.channel.send({ embeds: [pingEmbed] });
    },
};