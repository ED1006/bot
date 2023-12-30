import { Message, MessageEmbed } from 'discord.js';
import config from './config';

const { prefix } = config;

const commands: { [name: string]: { aliases?: string[]; description: string; format: string } } = {
  ':grey_question: help :grey_question:': {
   format: 'help',
     description: 'Te permettra de voir toutes les commandes réalisables',
    
  },
  ':satellite: Ping(Pong) :white_circle:': {
  format: 'ping',
    description: 'Prevu pour checker la connectivite avec le serveur, cette commande sert aussi a jouer au pingpong avec lui !',
    
  },
  ':game_die: d6 :game_die:': {
    format: 'd6',
    description: 'Lance un dé à 6 faces !',
  },
  ':card_index: Fiche personnage :card_index:': {
    format: 'perso',
    description: 'Te permet de générer automatiquement une fiche personnage !',
  },
  ':gun: La bataille :gun:': {
    format: 'bataille',
    description: 'Combat ! Le bot se charge de générer les combats en tour par tour !',
  },
  ':mega: say :mega:': {
    aliases: ['repeat'],
    description: 'Cette commande te permettra de faire répéter le bot.',
    format: 'say <message>'
  }
}

export default function helpCommand(message: Message) {
  const footerText = 'Requested by: ' + message.author.tag;
  const footerIcon = message.author.displayAvatarURL();
  const embed = new MessageEmbed()
    .setTitle('HELP MENU')
    .setColor('GREEN')
    .setFooter({ text: footerText, iconURL: footerIcon })
    .setTimestamp();

  for (const commandName of Object.keys(commands)) {
    const command = commands[commandName];
    let desc = command.description + '\n\n';
    if (command.aliases) desc += `**Aliases :** ${command.aliases.join(', ')}\n\n`;
    desc += '**Format**\n```\n' + prefix + command.format + '```';

    embed.addField(commandName, desc, false);
  }

  return embed;
}