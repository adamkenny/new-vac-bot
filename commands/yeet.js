const Discord = require("discord.js");
const {Client, Attachment}  = require('discord.js');


exports.run = function(client, message, args) {
    const attachment = new Attachment('https://i.imgur.com/IJp4h8w.png');
      message.channel.send(attachment);
      message.delete().catch();
};



exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };

  exports.help = {
    name: 'yeet',
    description: 'Will return a weird image...',
    usage: 'yeet'
  };
