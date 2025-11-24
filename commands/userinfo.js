//commands/userinfo.js
const {EmbedBuilder} = require("discord.js");
const emojinegado ="<a:negado:1442611204978905190>"
const emojiuser = "<a:cabesa:1442614453039272138>"
const emojiseta = "<a:setapracima:1442628536006606848>"
const emojidata = "<a:dia:1442614569506701572>"
const emojirelogio = "<a:relogio:1442631689862905993>"
const emojichave = "<a:chave:1442631759228440587>"
const emojisettings = "<a:settings:1442631826911924284>"

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
        .setTitle(`**${emojiuser}  Informações sobre ${user.tag}**`)
        .setThumbnail(user.displayAvatarURL({dynamic:true}))
        .addFields(
            {name: `**${emojidata} Conta Criada em:**`, value: createdDate, inline:true},
            {name: `**${emojirelogio} Entrou no servidor em:**`, value:joinedDate, inline:true},
            {name: `${emojichave} **ID do Usuário:**`, value:user.id, inline:false},
            {name: `**${emojisettings} Cargos** (${member.roles.cache.size - 1})`,
                                value:roles || "Nenhum Cargo adicional.", inline:false}
        ) .setTimestamp();

    message.channel.send({embeds: [infoEmbed]});    
    }
}