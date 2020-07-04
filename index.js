const Discord = require('discord.js');
const bot = new Discord.Client({
 disableMentions: 'all'
});

const PREFIX = '#!';

const { Player } = require('discord-player');

const player = new Player(bot, 'Your YouTube v3 API KEY');

bot.on('ready', async () => {
 console.log('Bot ready!');
});

bot.on('message', async message => {
 if (message.author.bot) return;
 if (message.channel.type === 'dm') return;

 const msg = message.content.toLowerCase();
 const args = message.content.slice(PREFIX.length).trim().split(' ');
 const cmd = args.shift().toLowerCase();

 player.getQueue(message.guild.id)
 .on('end', () => {
  message.channel.send('There is no more music in the queue!');
  })
  .on('songChanged', (oldSong, newSong) => {
   message.channel.send(`**Now playing ${newSong.name}..`);
  })
  .on('channelEmpty', () => {
   message.channel.send(`Stop playing, there is no more members in the voice channel.`);
  });

 try {
  let commands = require(`./commands/${cmd}.js`);
  if (!commands) return;
  commands.run(bot, message, args);
 } catch (exception) {
  console.error(e.message);
 } finally {
  console.log(`[INFO] ${message.author.tag} using ${cmd} on ${message.guild.name}`);
 }
});

bot.login('Your Bot Token?');
