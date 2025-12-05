//commands/userinfo.js
const {EmbedBuilder} = require("discord.js");
const EMOJIS = require("../config/emojis.js");
const{SlashCommandBuilder} = require("@discordjs/builders")
module.exports = {
    category: "Info",
    data: new SlashCommandBuilder()
        .setName("userinfo")
        .setDescription(`${EMOJIS.ARTIGO} **Exibe as informações de um usuário.**`),
    
   async execute(message, args, client) {
        if (!message.guildId) { /* ... */ } 
        const member = message.mentions.members.first() || message.member;
        let user = member.user; 
    
        if (!user.createdAt) {
            try {
                const fetchedUser = await client.users.fetch(user.id, { force: true }); 
                user = fetchedUser; 
            } catch (error) {
                console.error("Falha fatal ao buscar dados do usuário:", error);
                return message.reply(`**${EMOJIS.NEGADO}  Não foi possível obter os dados da conta. Verifique o console.**`);
            }
        }

        const joinedDate = member.joinedAt ? new Date(member.joinedAt).toLocaleDateString('pt-BR') : 'Indisponível (Cache)';
        const guild = member.guild
        const createdDate = new Date(user.createdAt).toLocaleDateString('pt-BR');
        const isOwner = member.id === guild.ownerId;
        const ownerIndicator = isOwner ? "👑": " "
        const roles = member.roles.cache
          .filter(role => role.id !== message.guild.id)
          .map(role => role.toString())
          .join(', ');
        const infoEmbed = new EmbedBuilder()
        .setColor(member.displayHexColor || 0xFF8C00)
        .setTitle(`**${EMOJIS.ARTIGO}  Informações sobre o usuário**`)
        .setThumbnail(user.displayAvatarURL({dynamic:true}))
        .addFields(
            {name: `**${EMOJIS.DATA} Data de Criação da Conta:**`, value: `\`${createdDate}\``, inline: true},
            {name: `**${EMOJIS.RELOGIO} Entrou no servidor em:**`, value:`\`${joinedDate}\``, inline: true},
            {name: `**${EMOJIS.USER} Tag do Discord:**`, value: `\`${user.tag}\` ${ownerIndicator}`, inline: false},
            {name: `${EMOJIS.CHAVE} **ID do Discord:**`, value: `\`${user.id}\``, inline: false},
            {name: `**${EMOJIS.CONFIG} Cargos** (${member.roles.cache.size - 1})`,
                                value:roles || "Nenhum Cargo adicional.", inline:false}
        ) 
        .setFooter({text: "PearBot", iconURL: client.user.displayAvatarURL()})
        .setTimestamp();

    message.channel.send({embeds: [infoEmbed]});    
    }
}