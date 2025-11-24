//commands/ban.js
const {EmbedBuilder, PermissionsFlagsBits } = require("discord.js");
module.exports = {
    data: {
        name:"ban",
        description: "Bane um usuário permanentemente do servidor."
    },
    async execute(message, args) {
        if(!message.guildId) {
            return message.reply("**❌ | Esse comando só pode ser usado em um servidor.**")
        }
        const CARGOPROTEGIDO = "1332202964710068285";
        const member = message.mentions.members.first();
        const reason = args.slice(1).join("") || "**Nenhum motivo fornecido.**";

        if (!member) {
            return message.reply("⚠ | **Mencione um membro válido para banir. Ex: !ban @usuário**")
        }
        if(CARGOPROTEGIDO && member.roles.cache.has(CARGOPROTEGIDO)) {
            return message.reply("🍐 | **Você não pode banir os CODATES, tente novamente mais tarde.**")
        }
        if(!member.bannable) {
            return message.reply("❌ | **Não consigo banir este usuário. Meu cargo está abaixo do dele.**");
        }
        try {
            await member.ban({reason: reason});
            const banEmbed = new EmbedBuilder()
                 .setColor(0xDC143C)
                 .setTitle("🔨  **Usuário Banido.**")
                 .setDescription(`**✅ | ${member.user.tag} foi banido permanentemente.**`)
                 .addFields(
                    {name: "Moderador", value: message.author.tag, inline:true},
                    {name: "Razão", value: reason, inline:true}
                 )
                 .setTimestamp();
            message.channel.send({embeds: [banEmbed]});
        } catch(error) {
            console.error("Erro ao banir membro", error);
            message.channel.send("❌ | **Ocorreu um erro ao processar o banimento.");
        }
    }
}