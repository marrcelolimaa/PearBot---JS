const {SlashCommandBuilder} = require("@discordjs/builders");
const {EmbedBuilder} = require("discord.js");
const EMOJIS = require("../config/emojis.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("skullo")
    .setDescription(`${EMOJIS.TA} **Comando secreto pra pegar a badge**`),

    async execute(interaction, client) {
        const sucessEmbed = new EmbedBuilder()
        .setColor(0x6400FF)
        .setImage("https://images-ext-1.discordapp.net/external/sPOEB57vnv4wJH9IeFvsxHhOJgRkC2xipRrf3mtVS0g/https/media.tenor.com/J1SADqKplW8AAAPo/baldis-basic-baldi.mp4")
        .setFooter({text: "cavera"})
   await interaction.reply({
    embeds: [sucessEmbed],
   });
    },
};