const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {

  let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
  if (!rMember) return message.reply("Please mention a valid user of this server");

    let customer_role = message.guild.roles.find(role => role.name === 'Customers');
    let normal_tags = message.guild.roles.find(role => role.name === '⁣     --Normal Tags--     ⁣');

    if (rMember.roles.has(customer_role.id)) return message.reply(`<@${rMember.id}> is already a customer.`);
    await (rMember.addRole(customer_role.id));
    await (rMember.addRole(normal_tags.id));
    try {
    await  message.channel.send(`Gave <@${rMember.id}> the customer role.`);
    } catch(e) {
      message.channel.send(e);
    }
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 6,
};

exports.help = {
    name: 'customer',
    description: 'Adds the customer rank to a user!',
    usage: 'customer [user]'
};
