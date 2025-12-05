const{EmbedBuilder} = require("discord.js")
const{SlashCommandBuilder} = require("@discordjs/builders");
const EMOJIS = require("../config/emojis.js");
module.exports = {
    category: "Info",
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
            .setTitle(`${EMOJIS.DC}  **${guild.name}**`)
            .setThumbnail(guild.iconURL({dynamic: true}))
            .addFields(
                {name: `${EMOJIS.COROA} **Dono do Servidor**`, value: `<@${guild.ownerId}>`, inline: false},
                {name: `${EMOJIS.CONFIG} **ID do Servidor**`, value: `\`${guild.id}\``, inline: false},
                {name: `${EMOJIS.RELOGIO} **Criado em**`, value: `\`${creationDate}\``, inline: false},
                {name: `**Membros (${memberCount})**`, value: `${EMOJIS.USER} **Usuários:** \`${userCount}\`\n${EMOJIS.CHAVE} **Bots:** \`${botCount}\``, inline: true},
                {name: `**Canais (${textChannels + voiceChannels})**`,
                 value: `${EMOJIS.ARTIGO} **Texto: \`${textChannels}\`\n${EMOJIS.FONE} Voz: \`${voiceChannels}\`**`,
                 inline: true},
            )
            .setFooter({text: "PearBot", iconURL: context.client.user.displayAvatarURL({dynamic: true, size:64})})
            .setTimestamp();
            await sendReply({embeds: [serverEmbed]});
    },
};