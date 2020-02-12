const Discord = require('discord.js');

exports.run = async(client, message, args) => {

 if(!message.member.roles.some(r=>["-----------admins------------"].includes(r.name)) )
 //if(!message.member.roles.some(r=>["80%"].includes(r.name)) )

     return message.reply("You don't have permissions to use this!");


let rMember = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if (!rMember) return message.reply("Please mention a valid user of this server");

let role = args.join(" ").slice(22);
if (!role) return message.reply("Please specify a role");

let gRole = message.guild.roles.find(`name`, role);
if (!gRole) return message.reply("I couldn't find that role.");

if (!rMember.roles.has(gRole.id)) return message.reply("The specified user doesn't have that role");
await (rMember.removeRole(gRole.id));

try {
  await message.channel.send(`Member <@${rMember.id}> has lost the ${gRole.name} role.`);
  console.log(`Member <@${rMember.id}> has lost the ${gRole.name} role.`);
} catch(e) {
  message.channel.send(`An error has occured.`);
}

}

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 6
  };

  exports.help = {
    name: 'removerole',
    description: 'Remove a role from the specified user. (staff only)',
    usage: 'removerole [user] [role]'
  };
