//commands/userinfo.js
const {EmbedBuilder} = require("discord.js");
const emojinegado ="<a:negado:1442611204978905190>"
module.exports = {
    data:{
        name: "userinfo",
        description: "Exibe as informações de um usuário."
    },
   async execute(message, args, client) {
        if (!message.guildId) { /* ... */ } 

        const member = message.mentions.members.first() || message.member;
        let user = member.user; 

        if (!user.createdAt) {
            try {
                const fetchedUser = await client.users.fetch(user.id, { force: true }); 
                user = fetchedUser; 
            } catch (e) {
                console.error("Falha fatal ao buscar dados do usuário:", e);
                return message.reply(`**${emojinegado}  Não foi possível obter os dados da conta. Verifique o console.**`);
            }
        }

        const joinedDate = member.joinedAt ? new Date(member.joinedAt).toLocaleDateString('pt-BR') : 'Indisponível (Cache)';
        const createdDate = new Date(user.createdAt).toLocaleDateString('pt-BR');
        const roles = member.roles.cache
          .filter(role => role.id !== message.guild.id)
          .map(role => role.toString())
          .join(', ');
        const infoEmbed = new EmbedBuilder()
        .setColor(member.displayHexColor || 0x00BFFF)
        .setTitle(`**📜 | Informações sobre ${user.tag}**`)
        .setThumbnail(user.displayAvatarURL({dynamic:true}))
        .addFields(
            {name: "**🗓 | Conta Criada em:**", value: createdDate, inline:true},
            {name: "**📆 | Entrou no servidor em:**", value:joinedDate, inline:true},
            {name: "**ID do Usuário:**", value:user.id, inline:false},
            {name: `**Cargos** (${member.roles.cache.size - 1})`,
                                value:roles || "Nenhum Cargo adicional.", inline:false}
        ) .setTimestamp();

    message.channel.send({embeds: [infoEmbed]});    
    }
}