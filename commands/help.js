//commands/help.js
const { EmbedBuilder } = require("discord.js");
const EMOJIS = require("../config/emojis");
const{SlashCommandBuilder} = require ("@discordjs/builders");
const PREFIX = "!";
module.exports = {
    category: "Info",
    data: new SlashCommandBuilder()
    .setName('help')
    .setDescription("**Mostra a lista de comandos organizados por categoria.")
    .addStringOption(option => 
        option.setName("comando")
            .setDescription("O nome do comando para obter ajuda detalhada.")
            .setRequired(false)),

    async execute (interactionOrMessage, args, client) {
        const isSlashCommand = interactionOrMessage.deferred || interactionOrMessage.replied || interactionOrMessage.commandName === "help";
        const targetCommand = isSlashCommand ? interactionOrMessage.options.getString("comando"): args[0];

        const commands = client.commands;

        if(targetCommand) {
            const command = commands.get(targetCommand.toLowerCase()) || commands.find(cmd => cmd.aliases && cmd.aliases.includes(targetCommand.toLowerCase()));
            if(!command || command.category === "Desenvolvedor") {
                const response = `${EMOJIS.NEGADO} **Comando \`${targetCommand}\` não encontrado.**`;
                return isSlashCommand
                ? interactionOrMessage.reply({content: response, ephemeral: true})
                : interactionOrMessage.reply(response);
            }
            const helpEmbed = new EmbedBuilder()
            .setColor(0xFF8C00)
            .setTitle(`${EMOJIS.PONTO} **Comando** \`${command.data.name}\``)
            .setDescription(command.data.description || "Sem descrição.")
            .addFields(
                {name: "Categoria", value: `**${command.category}**` || "Nenhuma", inline: true},
                {name: "Uso", value: `\`${PREFIX}${command.data.name} <argumentos>\``, inline: false}
            ) .setFooter({text: "PearBot", iconURL: client.user.displayAvatarURL()})
              .setTimestamp();

              return isSlashCommand
              ? interactionOrMessage.reply({embeds: [helpEmbed], ephemeral: true})
              : interactionOrMessage.reply({embeds: [helpEmbed]});
        }
        const groupedCommands = new Map();
        commands.forEach(cmd => {
            if(!cmd.category || cmd.category === "Desenvolvedor") return;
            if(!groupedCommands.has(cmd.category)) {
                groupedCommands.set(cmd.category, []);
            }
            groupedCommands.get(cmd.category).push(cmd.data.name);
        });
        const helpEmbed = new EmbedBuilder()
        .setColor(0xFF8C00)
        .setTitle(`${EMOJIS.ARTIGO} **Comandos PearBot**`)
        .setDescription(`**Use \`${PREFIX}\`help [comando] para detalhes sobre um comando específico.**\n\n **Lista organizada por categoria:**`)
        .setThumbnail(client.user.displayAvatarURL());

        for (const[category, commandNames] of groupedCommands) {
            commandNames.sort()
            helpEmbed.addFields({
                name: `📁  ${category} (${commandNames.length})`,
                value: commandNames.map(name => `\`${name}\``).join(", "),
                inline: false,
            });
        }
        helpEmbed.setTimestamp()
                 .setFooter({text: `PearBot  |  Categorias listadas: ${groupedCommands.size}`, iconURL: client.user.displayAvatarURL()});

        if(isSlashCommand) {
            await interactionOrMessage.reply({embeds: [helpEmbed], ephemeral: true});
        } else {
            await interactionOrMessage.channel.send({embeds: [helpEmbed]})
        }
    },
};