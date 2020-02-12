const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {


  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return message.reply("Please mention a valid user of this server");

  let muted_role = message.guild.roles.find(role => role.name === 'Muted');

    if (rMember.roles.has(muted_role.id)) return message.reply(`<@${rMember.id}> is already a worker.`);
    await (rMember.addRole(muted_role.id));
    try {
      await  message.channel.send(`Muted <@${rMember.id}>`);
    } catch(e) {
      message.channel.send("An error has occured.");
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 6,
};

exports.help = {
    name: 'mute',
    description: 'Adds the muted rank to a user!',
    usage: 'mute [user]'
};
