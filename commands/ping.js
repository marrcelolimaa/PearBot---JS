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

        const apiLatency = client.ws.ping;

        const pingEmbed = new EmbedBuilder()
            .setColor(0x9ACD32) // Verde claro
            .setTitle('**Latência do Sistema**')
            .setDescription(`**Aqui estão as Latências atuais do Bot:**`)
            .setThumbnail(client.user.displayAvatarURL()) // Foto do bot
            .addFields(
                { 
                    name: '**Conexão (API)**', 
                    value: `**${apiLatency}ms**`, 
                    inline: true 
                },
                { 
                    name: '**Processamento**', 
                    value: `**${messageLatency}ms**`, 
                    inline: true 
                }
            )
            .setTimestamp(); 

        await message.channel.send({ embeds: [pingEmbed] });
    },
};