const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("I cannot ban this user!");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag}. Reason: ${reason}`);
};



exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 5
  };

  exports.help = {
    name: 'ban',
    description: 'Ban the specified user. (staff only)',
    usage: 'ban [name]'
  };
