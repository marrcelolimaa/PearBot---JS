const { EmbedBuilder, PermissionsBitField } = require('discord.js');
const { SlashCommandBuilder } = require('@discordjs/builders');
const EMOJIS = require("../config/emojis"); 
const PREFIX = "!";

module.exports = {
    category: "Info",
    data: new SlashCommandBuilder()
        .setName('serverinvite')
        .setDescription(`🔗 **Gera e envia um link de convite para este servidor.**`),
    
    async execute(interactionOrMessage, args, client) {
        
        const isSlashCommand = interactionOrMessage.deferred || interactionOrMessage.replied || interactionOrMessage.commandName === 'serverinvite';
        
        const channel = interactionOrMessage.channel;
        const guild = interactionOrMessage.guild;
        const member = interactionOrMessage.member;
        
        let replyFunction;
        if (isSlashCommand) {
            await interactionOrMessage.deferReply({ ephemeral: false }); 
            replyFunction = interactionOrMessage.editReply.bind(interactionOrMessage);
        } else {
            replyFunction = interactionOrMessage.reply.bind(interactionOrMessage);
        }

        if (!guild) {
            return replyFunction({ content: `${EMOJIS.NEGADO} Este comando só pode ser usado em um servidor.`, ephemeral: true });
        }

        if (!guild.members.me.permissions.has(PermissionsBitField.Flags.CreateInstantInvite)) {
            return replyFunction({ content: `${EMOJIS.NEGADO} O bot não tem permissão para **Criar Convite Imediato** neste servidor.`, ephemeral: true });
        }
        
        try {
            const invite = await channel.createInvite({
                maxAge: 86400, // 24 horas (em segundos)
                maxUses: 50,    // 50 usos
                unique: true,
                reason: `Comando ${isSlashCommand ? '/serverinvite' : PREFIX + 'serverinvite'} executado por ${member.user.tag}`
            });

            const inviteEmbed = new EmbedBuilder()
                .setColor(0x32CD32) 
                .setTitle(`🔗  ${guild.name}`)
                .setDescription(`${EMOJIS.CHECK} **Seu convite foi gerado com sucesso!**`)
                .addFields(
                    { name: `**${EMOJIS.DC} Link de Convite**`, value: invite.url, inline: false },
                    { name: `**${EMOJIS.PONTO} Expiração**`, value: `\`24 Horas\``, inline: true },
                    { name: `${EMOJIS.CONFIG} **Usos Máximos**`, value: `\`50 Usos\``, inline: true }
                )
                .setThumbnail(guild.iconURL({ dynamic: true }))
                .setFooter({text: "PearBot", iconURL: client.user.displayAvatarURL()})
                .setTimestamp();
            
            // 5. Envio da Resposta
            await replyFunction({ embeds: [inviteEmbed], ephemeral: false });

        } catch (error) {
            console.error('Erro ao criar convite:', error);
            replyFunction({ content: `${EMOJIS.NEGADO} Ocorreu um erro ao criar o convite.`, ephemeral: true });
        }
    },
};