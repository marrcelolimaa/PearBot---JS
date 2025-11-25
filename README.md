
# 🍐 PearBot

<div align="center">

![Logo](https://i.imgur.com/zAeVlt9.png)

[![Discord](https://img.shields.io/discord/1331778739838783509?color=7289da&label=Discord&logo=discord&logoColor=ffffff)](https://discord.gg/WGTAaPFDkD)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/seu-usuario/GreenBot)
[![Status](https://img.shields.io/badge/status-production-success.svg)](https://github.com/seu-usuario/GreenBot)

*Um bot de Discord para moderação e gestão de servidores (em breve muito mais...)*

[Features](CurrentFeatures.md) •
[Documentação](CHEATSHEET.md) •
[Contribuir](#contribuindo) •
[Suporte](#suporte)

</div>

## 📋 Sobre
PearBot é um bot de Discord focado em **moderação** e **gestão de servidores**, oferecendo funcionalidades que ate o momento são: banimento, kick, limpeza de mensagens, consultas de informações de usuários e ping.

## ⭐ Destaques
- 🛠️ **Comandos de Moderação**: Banir, kickar e desbanir usuários
- 🔧 **Limpeza de Mensagens**: Apagar mensagens com facilidade
- 📊 **Informações de Servidor**: Comando de ping para verificar latência
- 👤 **Informações de Usuário**: Consultar dados sobre usuários específicos



## 📖 Uso

### Comandos Básicos
```
!ban <@usuario>            - Banir um usuário do servidor
!kick <@usuario>           - Kickar um usuário do servidor
!clear <quantidade>        - Limpar um número de mensagens
!ping                      - Verificar a latência do bot
!unban <@usuario>          - Desbanir um usuário
!userinfo <@usuario>       - Obter informações detalhadas sobre um usuário
```

### Exemplo de Uso:
- **!ban @usuario**: Banir o usuário mencionado do servidor.
- **!clear 10**: Limpar as últimas 10 mensagens do canal.
- **!userinfo @usuario**: Exibir informações sobre o usuário mencionado, como ID, data de entrada no servidor, etc.

## 🛠️ Desenvolvimento

### Estrutura
```
Pearbot/
├── Main/
│   ├── commands/
│   │   ├── ban.js
│   │   ├── clear.js
│   │   ├── kick.js
│   │   ├── ping.js
│   │   ├── unban.js
│   │   └── userinfo.js
│   ├── main.js
│   └── .env
├── Version logs
└── README.md
```

### Features
Veja [CurrentFeatures.md](CurrentFeatures.md) para uma lista completa.

## 📝 Notas de Versão
- **v1.0.0** (22/02/2025)
  - Lançamento inicial
  - Comandos de moderação (ban, kick, unban)
  - Limpeza de mensagens
  - Informações sobre ping e usuário

## 🤝 Suporte
- Discord: [Servidor Pearcode](https://discord.gg/WGTAaPFDkD)
- Issues: [GitHub Issues](https://github.com/seu-usuario/GreenBot/issues)

## 🙏 Agradecimentos
- [discord.js](https://github.com/discordjs/discord.js)
- [dotenv](https://github.com/motdotla/dotenv)

---
<div align="center">
Feito com 🍐 pela Pearcode
</div>