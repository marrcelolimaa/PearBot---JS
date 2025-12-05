// commands/clear.js
const EMOJIS = require("../config/emojis")
const{SlashCommandBuilder} = require("@discordjs/builders")
module.exports = {
    category: "Mod",
    data: new SlashCommandBuilder()
        .setName("clear")
        .setDescription(`${EMOJIS.LIXO} **Limpa um número específico de mensagens do canal. (1-100)**`),

    async execute(message, args) {
        if(!message.member.permissions.has("ManageMessages")) {
            return message.reply(`**${EMOJIS.NEGADO} Você não tem permissão para usar este comando!**`);
        }
        const amount = parseInt(args[0]);
        if(isNaN(amount) || amount < 1 || amount > 100) {
            return message.reply(`** ${EMOJIS.NEGADO} Por favor, insira um número entre 1 e 100 para o número de mensagens a serem apagadas.**`)          
        }

        try {
            await message.channel.bulkDelete(amount, true);
            message.channel.send(`**${EMOJIS.CHECK} ${amount} mensagens foram apagadas com sucesso!**`);
        }
         catch(error) {
            console.error(error);
            message.reply(`**${EMOJIS.NEGADO} Ocorreu um erro ao tentar apagar as mensagens no canal.**`);
        }


    }
}