// commands/clear.js
module.exports = {
    data:{
        name: "clear",
        description: "Limpa um número específico de mensagens do canal. (1-100)",
    },

    async execute(message, args) {
        if(!message.member.permissions.has("ManageMessages")) {
            return message.reply("**❌ | Você não tem permissão para usar este comando!**");
        }
        const amount = parseInt(args[0]);
        if(isNaN(amount) || amount < 1 || amount > 100) {
            return message.reply("**❌ | Por favor, insira um número entre 1 e 100 para o número de mensagens a serem apagadas.**")          
        }

        try {
            await message.channel.bulkDelete(amount, true);
            message.channel.send(`**✅ | ${amount} mensagens foram apagadas com sucesso!**`);
        }
         catch(error) {
            console.error(error);
            message.reply("**❌ | Ocorreu um erro ao tentar apagar as mensagens no canal.**");
        }


    }
}