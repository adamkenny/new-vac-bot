const Discord = require("discord.js");

exports.run = function(client, message, args) {
    let messageArray = message.content.split(" ");
    let suggestion = args.join(" ");
      if(!suggestion) return message.channel.send("Please supply a suggestion!");

    let suggestionEmbed = new Discord.RichEmbed()
      .setColor("YELLOW")
      .addField(`${message.author.tag}'s Suggestion`, `\n${suggestion}`)
      .setTimestamp();
    message.delete().catch(O_o=>{});

    let suggestionChannel = message.guild.channels.find(ch => ch.name === `suggestions`); // Checks channel
    suggestionChannel.send(suggestionEmbed).then(function (message) {
    message.react('👍')
    .then(() => message.react('🤔'))
    .then(() => message.react('👎'))
    .catch(() => console.log("One of the emoji failed to work!"));
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['suggest'],
  permLevel: 6
};

exports.help = {
  name: 'suggestion',
  description: 'Post a suggestion for the community!',
  usage: 'suggestion'
};
