const Discord = require("discord.js");
const chalk = require('chalk');
const fs = require("fs");
const moment = require("moment");
const client = new Discord.Client();
const config = require("./json/config.json");
require('./util/eventLoader')(client);

const log = message => {
  console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir('./commands/', (err, files) => {
  if (err) console.error(err);
  log(`Loading a total of ${files.length} commands.`);
  files.forEach(f => {
    let props = require(`./commands/${f}`);
    log(`Loading Command: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./commands/${command}`)];
      let cmd = require(`./commands/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e){
      reject(e);
    }
  });
};

client.elevation = message => {
  // This function should resolve to an ELEVATION level which
  // is then sent to the command handler for verification
  let permlvl = 0;
  // Normal Permissions
  let customer_role = message.guild.roles.find(role => role.name === 'Customers');
  if (customer_role && message.member.roles.has(customer_role.id)) permlvl = 1;
  // Worker Permissions
  let worker_role = message.guild.roles.find(role => role.name === `Worker`);
  if (worker_role && message.member.roles.has(worker_role.id)) permlvl = 2;
  // Moderator Permissions
  let mod_role = message.guild.roles.find(role => role.name === 'Collector');
  if (mod_role && message.member.roles.has(mod_role.id)) permlvl = 3;
  // Developer Role
  let dev_role = message.guild.roles.find(role => role.name === 'Designer/Developer');
  if (dev_role && message.member.roles.has(dev_role.id)) permlvl = 4;
  //Owner Permissions
  let owner_role = message.guild.roles.find(role => role.name === '-----------owner--------------');
  if (owner_role && message.member.roles.has(owner_role.id)) permlvl = 5;
  //Admin permissions
  let admin_role = message.guild.roles.find(role => role.name === '-----------admins------------');
  if (admin_role && message.member.roles.has(admin_role.id)) permlvl = 6;
  // Bot Owner Permissions
  if (message.author.id === config.ownerID) permlvl = 7;
  return permlvl;
};


//Client Events
client.on('channelCreate', channel => {
  console.log(`A ${channel.type} by the name of ${channel.name} was created at ${channel.createdAt} with the ID of ${channel.id}`);
  if(channel.type === 'text') return channel.send('You were successful!').then(message => {
    message.delete(5000)});
});

client.on('channelDelete', channel => {
  console.log(`A ${channel.type} channel by the of ${channel.name} was deleted!`)
});

// /** client.on('channelUpdate', (oChannel, nChannel) => {
//   console.log(oChannel, nChannel);
// }); */
//
// /*client.on('channelPinsUpdate', (channel, time) => {
//  channel.guild.defaultChannel.send(`The pins for ${channel.name} have been updated at ${time}`);
// });*/

client.on('messageDelete', message => {
  console.log(`A message with the contents ${message.cleanContent} was deleted from ${message.channel}`);
  //client.channels.get(`570438397198336001`).send(`[**${message.author.name} (${message.author.id})**]: ${message.cleanContent}) was deleted in ${message.channel} at ${new Date()}`);
});
//
// // client.on('messageDeleteBulk', messages => {
// //   console.log(`${messages.size} was deleted`);
// // });*/
//
var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on('debug', e => {
   console.log(chalk.bgBlue(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${e.replace(regToken, 'that was redacted')}`));
});

client.on('error', e => {
  console.log(chalk.bgRed(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${e.replace(regToken, 'that was redacted')}`));
});

client.on('warn', e => {
  console.log(chalk.bgYellow(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] ${e.replace(regToken, 'that was redacted')}`));
});

client.login(config.token);
