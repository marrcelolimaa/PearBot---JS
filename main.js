const { Client, GatewayIntentBits } = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.on('ready', () => {
    console.log(`Bot Online! ${client.user.tag}`);
    client.user.setActivity('Insane ABACATE CODING DOG', { type: 3});
});

client.on('messageCreate', async (message) => {
    const prefix = "!";
    if (!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commands = args.shift().toLowerCase();

     if (commands === "ping") {
        const apiPing = client.ws.ping;
        message.channel.send(`**🔌 | Latência da API: ${apiPing}ms**`);
    }

    if (commands === "clear") {
        if (!message.member.permissions.has("ManageMessages")) {
            return message.reply("Você não tem permissão para usar este comando.");
        }

        const amount = parseInt(args[0]);
        if (isNaN(amount) || amount < 1 || amount > 1000) {
            return message.reply("Por favor, insira um número entre 1 e 100.");
        }

        try {
            await message.channel.bulkDelete(amount, true);
            message.channel.send(`🧹 ${amount} mensagens foram apagadas.`).then(msg => {
                setTimeout(() => msg.delete(), 15000);
            });
        } catch (err) {
            console.error(err);
            message.reply("ERRO! Não foi possível apagar as mensagens.");
        }
    }

    if (commands === "kick") {
        if (!message.member.permissions.has("KickMembers")) {
            return message.reply("Você não tem permissão para usar este comando.");
        }
        const member = message.mentions.members.first();
        const reason = args.slice(1).join("") || "nenhum motivo fornecido";
        const CARGOPROTEGIDO = "1332202964710068285";
        
        if (!member) {
            return message.reply("Por favor, mencione um membro válido para expulsar.");
        }

        if (member.roles.cache.has(CARGOPROTEGIDO)) {
            return message.reply("** ❌ VOCÊ NÃO PODE EXPULSAR OS PEARBROS 🍐**");
        }

        if (!member.kickable) {
            return message.reply("** ❌ Não posso expulsar este usuário! Ele pode ter um cargo mais alto ou eu nao tenho permissões.**");
        }

        try {
            await member.kick(reason);
            message.channel.send(`🍐 *${member.user.tag} foi expulso. por: ${reason}*`);
        } catch (err) {
            console.error(err); 
            message.reply("ERRO! Não foi possível expulsar esse membro.");
        }
    
    }

});


require('dotenv').config();
const TOKEN = process.env.TOKEN;

if (!TOKEN) {
    console.error('Erro: TOKEN NÃO ENCONTRADO! Verifique o arquivo .env');
} else {
    client.login(TOKEN);
}
