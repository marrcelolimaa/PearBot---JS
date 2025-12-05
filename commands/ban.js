//commands/ban.js
const {EmbedBuilder, PermissionsFlagsBits } = require("discord.js");
const EMOJIS = require("../config/emojis");
const{SlashCommandBuilder} = require("@discordjs/builders");
module.exports = {
    category: "Mod",
    data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription(`${EMOJIS.CHAVE} **Bane um usuário permanentemente do servidor.**`),

    async execute(message, args) {
        if(!message.guildId) {
            return message.reply("**❌ | Esse comando só pode ser usado em um servidor.**")
        }
        const CARGOPROTEGIDO = "1332202964710068285";
        const member = message.mentions.members.first();
        const reason = args.slice(1).join("") || "**Nenhum motivo fornecido.**";

        if (!member) {
            return message.reply(`${EMOJIS.SIRENE} **Mencione um membro válido para banir. \n${EMOJIS.CHECK} Ex: !ban @usuário**`)
        }
        if(CARGOPROTEGIDO && member.roles.cache.has(CARGOPROTEGIDO)) {
            return message.reply("🍐 | **Você não pode banir os CODATES, tente novamente mais tarde.**")
        }
        if(!member.bannable) {
            return message.reply(`${EMOJIS.NEGADO} **Não consigo banir este usuário. Meu cargo está abaixo do dele.**`);
        }
        try {
            await member.ban({reason: reason});
            const banEmbed = new EmbedBuilder()
                 .setColor(0x9ACD32)
                 .setTitle(`${EMOJIS.CHAVE} **Usuário Banido.**`)
                 .setDescription(`**${EMOJIS.CHECK} \`${member.user.tag}\` foi banido permanentemente.**`)
                 .addFields(
                    {name: "Moderador", value: `\`${message.author.tag}\``, inline:true},
                    {name: "Razão", value: `\`${reason}\``, inline:true}
                 )
                 .setTimestamp();
            message.channel.send({embeds: [banEmbed]});
        } catch(error) {
            console.error("Erro ao banir membro", error);
            message.channel.send(`${EMOJIS.NEGADO}**Ocorreu um erro ao processar o banimento.`);
        }
    }
}