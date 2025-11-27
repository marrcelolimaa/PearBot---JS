//commands/userinfo.js
const {EmbedBuilder} = require("discord.js");
const EMOJIS = require("../config/emojis.js");
const{SlashCommandBuilder} = require("@discordjs/builders")
module.exports = {
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
        const createdDate = new Date(user.createdAt).toLocaleDateString('pt-BR');
        const roles = member.roles.cache
          .filter(role => role.id !== message.guild.id)
          .map(role => role.toString())
          .join(', ');
        const infoEmbed = new EmbedBuilder()
        .setColor(member.displayHexColor || 0x9ACD32)
        .setTitle(`**${EMOJIS.USER}  Informações sobre ${user.tag}**`)
        .setThumbnail(user.displayAvatarURL({dynamic:true}))
        .addFields(
            {name: `**${EMOJIS.DATA} Conta Criada em:**`, value: createdDate, inline:true},
            {name: `**${EMOJIS.RELOGIO} Entrou no servidor em:**`, value:joinedDate, inline:true},
            {name: `${EMOJIS.CHAVE} **ID do Usuário:**`, value:user.id, inline:false},
            {name: `**${EMOJIS.CONFIG} Cargos** (${member.roles.cache.size - 1})`,
                                value:roles || "Nenhum Cargo adicional.", inline:false}
        ) .setTimestamp();

    message.channel.send({embeds: [infoEmbed]});    
    }
}