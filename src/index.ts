import { Client } from 'discord.js';
import config from './config';
import helpCommand from './commands';

const { intents, prefix, token } = config;

const client = new Client({
  intents,
  presence: {
    status: 'online',
    activities: [{
      name: `${prefix}help`,
      type: 'LISTENING'
    }]
  }
});

client.on('ready', () => {
  console.log(`Logged in as: ${client.user?.tag}`);
});

client.on('messageCreate', async (message) => {
  if (message.author.bot) return;

  if (message.content.startsWith(prefix)) {
    const args = message.content.slice(prefix.length).split(' ');
    const command = args.shift();

    switch (command) {
      case 'ping':
        const msg = await message.reply('Pinging...');
        await msg.edit(`Pong! :tennis:`);
        break;

      case 'say':
      case 'repeat':
        if (args.length > 0) await message.channel.send(args.join(' '));
        else await message.reply('You did not send a message to repeat, cancelling command.');
        break;

      case 'help':
        const embed = helpCommand(message);
        embed.setThumbnail(client.user!.displayAvatarURL());
        await message.channel.send({ embeds: [embed] });
        break;


      case 'd6': // D6
        let resultat = hasard(1, 6);

        await message.reply('*:milky_way: Le hasard galactique te donne un*:                  :game_die:**' + resultat + '**:game_die:');
        break;


      case 'perso': //FICHE PERSONNAGE
        let endurance = hasard(1, 6) + hasard(1, 6) + 12;
        let habilete = hasard(1, 6) + 6;
        let chance = hasard(1, 6) + 6;

        await message.reply('- Ton endurance est de **' + endurance + '** :hearts: \n- Ta chance de **' + chance + '** :clubs: \n- Ton habilete est de **' + habilete + '** :dart:');
        break;


      case "bataille": //BATAILLE 

        // POUR METTRE EN PLACE LES VARIABLES PERSOS / TOUR
        let vieAdversaire = Number(args[0]);
        let vieCommandant = Number(args[1]);
        let Tour = 0;



        while (vieAdversaire > 0 && vieCommandant > 0) {

          // Numéro de tour
          Tour++;
          await message.reply(":arrows_counterclockwise: Tour n° **" + Tour +
            "**\n \nCommandant: **" + vieCommandant + "**\nAdversaire: **" + vieAdversaire + "**");


          // Lancer le d6
          let jetDegats = hasard(1, 6);

          //Condition pour rater son tour
          if (jetDegats <= 3) {
            vieCommandant = vieCommandant - 1;
            await message.reply(":game_die: : **" + jetDegats + '** :cyclone:\n \n' + ":collision: Aïe, vous avez prit un coup !\n \n \n - Il vous reste **" + vieCommandant + "** points de vie." + '\n' + "- Il reste *" + vieAdversaire + "* points de vie à l'adversaire.");
          }

          //Condition pour réussir son tour
          if (jetDegats > 3) {
            vieAdversaire = vieAdversaire - 1;
            await message.reply(":game_die: : **" + jetDegats + '** :milky_way:\n \n' + ":dizzy: Vous lui mettez un coup !\n \n \n- Il lui reste *" + vieAdversaire + "* points de vie." + '\n' + "- Il vous en reste **" + vieCommandant + "**.");
          }
        }

        // CONDITIONS DE DEFAITES OU DE VICTOIRE 

        //victoire
        if (vieAdversaire <= 0) {
          await message.reply("\n \n \n:milky_way: **BRAVO !** :milky_way:\n \n \n *Vous avez gagné !*");
        }
        //defaite
        if (vieCommandant <= 0) {
          await message.reply("\n \n \n:cyclone: **ARGHHH !** :cyclone: \n \n \n *Vous tombez, tombez, tombez...* ");
        }
        break;




    }
  }

});;

client.login(token);


// Fonctions pour déterminer le hasard du d6
function hasard(min: any, max: any) {
  return Math.floor(
    Math.random() * (max - min) + min)
}





