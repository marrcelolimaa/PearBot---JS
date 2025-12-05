const {EmbedBuilder} = require("discord.js");
const {SlashCommandBuilder} = require("@discordjs/builders");
const EMOJIS = require("../config/emojis.js");
module.exports = {
    category: "Misc",
    data: new SlashCommandBuilder()
          .setName("avatar")
          .setDescription("🖼 **Exibe o avatar o seu avatar ou o do usuário mencionado.**")
          .addUserOption(option => 
            option.setName("usuario")
                  .setDescription("**O usuário que você deseja ver o avatar.**")
                  .setRequired(false)),

    async execute(interactionOrMessage, args, client) {
        const isSlashCommand = interactionOrMessage.deferred || interactionOrMessage.replied || interactionOrMessage.replied === "avatar";
        let targetUser;
        let replyFunction;
        
        if(isSlashCommand) {
            targetUser = interactionOrMessage.options.getUser("usuario") || interactionOrMessage.user;
        } else { targetUser = interactionOrMessage.mentions.users.first() || client.users.cache.get(args[0]) || interactionOrMessage.author;
        }
        if(isSlashCommand) {
            replyFunction = interactionOrMessage.reply.bind(interactionOrMessage);
        } else (
            replyFunction = interactionOrMessage.reply.bind(interactionOrMessage)
        )
        const avatarURL = targetUser.displayAvatarURL({dynamic: true, size: 512});
        const iconEmbed = new EmbedBuilder()
        .setColor(0xFF8C00)
        .setTitle(`🖼 Avatar do usuário ${targetUser.tag}`)
        .setDescription(`[**Clique aqui para abrir o avatar em tamanho original**](${avatarURL})`)
        .setImage(avatarURL)
        .setFooter({text: `PearBot  |  Solicitado por ${interactionOrMessage.user ? interactionOrMessage.user.tag : interactionOrMessage.author.tag}`, iconURL: client.user.displayAvatarURL()})
        .setTimestamp();

        await replyFunction({embeds: [iconEmbed], ephemeral: true});
    },
};
