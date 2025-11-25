// commands/kick.js
const {EmbedBuilder, PermissionFlagsBits} = require("discord.js");
const emojinegado = "<a:negado:1442611204978905190>"
const emojisirene = "<a:sireneverde:1442611275543609384>"
const emojicerto = "<a:check:1442611532159782912>"
module.exports = {
    data: {
         name: "kick",
         description: "Expulsar um membro do servidor"
    },
   async execute(message, args) {
      if(!message.guild) {
        return message.reply("**⚠ | Este comando só pode ser usado em um servidor!**")
      }
      let memberAuthor = message.member;

      if (!memberAuthor) {
            try {
                // Tenta buscar o objeto Member completo (permissões, cargos)
                memberAuthor = await message.guild.members.fetch(message.author.id);
            } catch (error) {
                // Se a busca falhar (por exemplo, problema de conexão)
                return message.reply(`**${emojinegado} Erro ao verificar permissões: Não foi possível carregar seus dados.**`);
            }
        }

      if(!memberAuthor.permissions.has(PermissionFlagsBits.KickMembers)) {
        return message.reply(`**${emojinegado} Você não tem permissão para executar esse comando.**`)
      }

    const member = message.mentions.members.first();
    const CARGOPROTEGIDO = "1332202964710068285"
    const reason = args.slice(1).join("") || "**Nenhum motivo fornecido.**";

    if (!member) {
        return message.reply("**⚠ | Mencione um usuário válido para expulsar. Ex: !kick @usuário**");
    }
    if (member.roles.cache.has(CARGOPROTEGIDO)) {
        return message.reply("🍐 **Você não pode expulsar os CODATES, tente novamente mais tarde.**")
    }
    if (!member.kickable) {
        return message.reply(`**${emojinegado} Não consigo expulsar este membro! Meu cargo está abaixo do dele.**`)
    }
    try {
        await member.kick(reason);
        const kickEmbed = new EmbedBuilder()
            .setColor(0xFF8C00)
            .setTitle(`${emojisirene}   **Usuário Expulso.**`)
            .setDescription(`**${emojicerto}   ${member.user.tag} foi expulso do servidor!**`)
            .addFields(
                {name: "Moderador", value: message.author.tag, inline:true},
                {name: "Razão", value: reason, inline:true}
            )
            .setTimestamp();

    message.channel.send({embeds: [kickEmbed]});
    } catch(error) {
        console.error("**❌ | Erro ao expulsar o usuário.**", error);
        message.channel.send(`**${emojinegado} Ocorreu um erro ao processar a expulsão.**`)
    }
   }

}