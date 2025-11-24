//commands/unban.js
const{EmbedBuilder, PermissionFlagsBits} = require("discord.js");
module.exports = {
    data:{
        name: "unban",
        description: "Desbane um usuário do servidor."
    },
    async execute(message, args) {
        if(!message.guildId) {
            return message.reply("❌ | **Este comando só pode ser executado em um servidor.**")
        }
        if(!message.member.permissions.has(PermissionFlagsBits.BanMembers)) {
            return message.reply("❌ | **Você não tem permissão para executar este comando.**")
        }
        const userId = args[0];
        const reason = (args || []).slice(1).join(' ') || "**Nenhuma razão fornecida.**";

        if(!userId) {
            return message.reply("**Forneça o id do usuário que você deseja retirar o banimento.**")
        }
        try {
            const user = await message.guild.bans.remove(userId, reason);
            const unbanEmbed = new EmbedBuilder()
            .setColor(0x00FF7F)
            .setTitle("✅ **Banimento Removido.**")
            .setDescription(`**${user.tag}** (ID: ${user.id})** foi desbanido**.`)
            .addFields(
                {name: "Moderador", value: message.author.tag, inline:true},
                {name: "Razão", value: reason, inline:true}
            )
            .setTimestamp();

        message.channel.send({embeds: [unbanEmbed]});
        } catch(error) {
            if(error.code === 10026 || error.message.includes("Ban Desconhecido")) {
                return message.reply(`❌ | **O usuário com ID ${userId} não está banido do servidor.**`);
            }
            console.error("Erro ao desbanir usuário", error);
            message.channel.send("❌ | **Ocorreu um erro ao processar o desbanimento.**")
        }
    }
}
