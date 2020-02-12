const Discord = require("discord.js");

exports.run = function(client, message, args) {
    let pingEmbed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor("Pong!")
    .addField("Latency", `${Date.now()- message.createdTimestamp}ms.`, true)
    .addField("API Latency", `${Math.round(client.ping)}ms`, true)
    .setTimestamp();
    message.channel.send(pingEmbed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'ping',
    description: 'Ping/Pong command.',
    usage: 'ping'
  };