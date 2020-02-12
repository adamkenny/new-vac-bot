const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let msg = message.content.toUpperCase();
  let sender = message.author;
  let cont = message.content.slice(1).split(" ");

  if (!args[0]) return message.reply("You need to have atleast 1 argument!");

  async function purge() {
    message.delete();

    const fetched = await message.channel.fetchMessages({limit: args[0]});

    message.channel.bulkDelete(fetched)
    .catch(error =>
    message.channel.send(`Error: ${error}`));
  }
    purge();
  };

  exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 6
  };

  exports.help = {
    name: 'delete',
    description: 'Purges X amount of messages from a given channel.',
    usage: 'delete <number>'
  };
