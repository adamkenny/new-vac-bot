const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.kickable)
      return message.reply("I cannot kick this user!");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.kick(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't kick because of : ${error}`));
    message.reply(`${member.user.tag} has been kicked by ${message.author.tag}. Reason: ${reason}`);
};



exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 5
  };

  exports.help = {
    name: 'kick',
    description: 'Kick the specified user.',
    usage: 'kick [name]'
  };
