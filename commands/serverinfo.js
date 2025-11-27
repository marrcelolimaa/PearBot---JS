const{EmbedBuilder} = require("discord.js")
const{SlashCommandBuilder} = require("@discordjs/builders");
const EMOJIS = require("../config/emojis.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("serverinfo")
    .setDescription(`${EMOJIS.ARTIGO} **Exibe as informações detalhadas sobre este servidor.**`),

    async execute(context, argsOrClient) {
        const isInteraction = context.type !== undefined;
        const guild = context.guild;
        const sendReply = async(payload) => {
            if(isInteraction) {
                await context.reply(payload);
            } else {
                await context.channel.send(payload);
            }
        };
        if (!guild) {
            await sendReply({content: `${EMOJIS.NEGADO} **Use este comando em um servidor.**`});
            return;
        }
        const memberCount = guild.memberCount;
        const botCount = guild.members.cache.filter(member => member.user.bot).size;
        const userCount = memberCount - botCount;
        const textChannels = guild.channels.cache.filter(c => c.type === 0).size;
        const voiceChannels = guild.channels.cache.filter(c => c.type === 2).size;
        const creationDate = guild.createdAt.toLocaleDateString("pt-BR");

        const serverEmbed = new EmbedBuilder()
            .setColor(0x9ACD32)
            .setTitle(`${EMOJIS.PERA} **Informações do Servidor: ${guild.name}**`)
            .setThumbnail(guild.iconURL({dynamic: true}))
            .addFields(
                {name: `${EMOJIS.CONFIG} **ID do Servidor**`, value: guild.id, inline: true},
                {name: `${EMOJIS.USER} **Proprietário**`, value: `<@${guild.ownerId}>`, inline: true},
                {name: `${EMOJIS.RELOGIO} **Criado em**`, value: creationDate, inline: true},
                {name: `**Membros (${memberCount})**`, value: `${EMOJIS.USER} **Usuários:** ${userCount}\n${EMOJIS.CHAVE} **Bots:** ${botCount}`, inline: true},
                {name: `**Canais (${textChannels + voiceChannels})**`,
                 value: `${EMOJIS.ARTIGO} **Texto: ${textChannels}\n${EMOJIS.FONE} Voz: ${voiceChannels}**`,
                 inline: true},
            )
            .setTimestamp();
            await sendReply({embeds: [serverEmbed]});
    },
};