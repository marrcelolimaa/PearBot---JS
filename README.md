# 🍐 PearBot

DESCRIÇAO TEMPORARIA!!!!!!!!!!!!!!

<div align="center">

![Logo](https://i.imgur.com/zAeVlt9.png)

[![Discord](https://img.shields.io/discord/1331778739838783509?color=7289da&label=Discord&logo=discord&logoColor=ffffff)](https://discord.gg/WGTAaPFDkD)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/JvictorDevx/Abacode)
[![Status](https://img.shields.io/badge/status-production-success.svg)](https://github.com/JvictorDevx/Abacode)

*Um bot de Discord para gerenciamento inteligente de threads (em breve muito mais...)*

[Features](CurrentFeatures.md) •
[Documentação](CHEATSHEET.md) •
[Contribuir](#contribuindo) •
[Suporte](#suporte)

</div>

## 📋 Sobre
PearBot é um bot de Discord especializado em gerenciamento de threads, oferecendo controle granular sobre discussões e colaboração em canais de texto.
(novas funções para o bot irão surgir em atualizações futuras)

## ⭐ Destaques
- 🛠️ **Sistema de Threads**: Gerenciamento completo de threads
- 🔒 **Controle de Acesso**: Sistema robusto de permissões
- 📊 **Auditoria**: Logs detalhados de todas as ações
- 🔄 **Automação**: Backup e limpeza automática
- 💫 **QoL**: Auto-delete e cache inteligente

## 🚀 Começando

### Pré-requisitos
```bash
Python 3.8+
pip (gerenciador de pacotes Python)
Discord Bot Token
```

### Instalação
```bash
# Clone o repositório
git clone https://github.com/seu-usuario/Abacode.git

# Entre no diretório
cd Abacode

# Instale as dependências
pip install -r requirements.txt

# Configure o arquivo .env
echo DISCORD_TOKEN=seu_token_aqui > .env
```

## 📖 Uso

### Comandos Básicos
```
/c <nome>           - Cria uma nova thread
/add_c <thread> <@> - Adiciona colaborador
/del_c <thread> <@> - Remove colaborador
/ajuda              - Lista todos os comandos
```

### Comandos Admin
```
/config add <canal> - Adiciona canal permitido
/config del <canal> - Remove canal permitido
/config ad <canal>  - Define canal de auditoria
```

## 🛠️ Desenvolvimento

### Estrutura
```
Abacode/
├── Bot Main/
│   ├── Main/
│   │   ├── main.py
│   │   └── .env
│   └── Launcher/
│       └── launcher.py
├── docs/
│   ├── CHEATSHEET.md
│   └── CurrentFeatures.md
└── README.md
```

### Features
Veja [CurrentFeatures.md](CurrentFeatures.md) para uma lista completa.

## 📝 Notas de Versão
- **v1.0.0** (22/02/2025)
  - Lançamento inicial
  - Sistema completo de threads
  - Backup automático
  - Logging detalhado

## 🤝 Suporte
- Discord: [Servidor PearCode](https://discord.gg/WGTAaPFDkD)
- Issues: [GitHub Issues](https://github.com/JvictorDevx/Abacode/issues)

## 🙏 Agradecimentos
- [Discord.py](https://github.com/Rapptz/discord.py)
- [Python-dotenv](https://github.com/theskumar/python-dotenv)
- Todos os contribuidores e usuários

---
<div align="center">
Feito com 🍐 pela PearCode
</div>