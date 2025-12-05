const {SlashCommandBuilder} = require("@discordjs/builders");
const {EmbedBuilder} = require("discord.js");
const EMOJIS = require("../config/emojis.js");
module.exports = {
    data: new SlashCommandBuilder()
    .setName("skullo")
    .setDescription(`${EMOJIS.TA} **Comando secreto pra pegar a badge**`),

    async execute(interaction, client) {
   await interaction.reply({files: [
    "https://github.com/marrcelolimaa/marrcelolimaa/blob/main/42a6e30101100610496991bbfa9dca03.jpg?raw=true"
   ]})
    },
};