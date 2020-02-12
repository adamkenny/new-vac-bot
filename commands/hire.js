const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {


  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return message.reply("Please mention a valid user of this server");

  let main_role = message.guild.roles.find(role => role.name === 'Staff');


    if (rMember.roles.has(main_role.id)) return message.reply(`<@${rMember.id}> is already a worker.`);

    await (rMember.addRole(main_role.id));
    try {
      await  message.channel.send(`Gave <@${rMember.id}> the staff role.`);
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
    name: 'hire',
    description: 'Adds the worker rank to a user!',
    usage: 'hire [user]'
};
