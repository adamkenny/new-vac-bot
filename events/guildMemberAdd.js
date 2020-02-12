const Discord = require("discord.js");

module.exports = member => {
        let memberLog = member.guild.channels.find(ch => ch.name === `join-log`); // Checks channel
        let joinembed = new Discord.RichEmbed()
          .setColor("00ff00")
          .setAuthor(`${member.user.tag} (${member.id})`, member.user.avatarURL)
          .setFooter(`User joined`)
          .setTimestamp();
        memberLog.send(joinembed); // Sends Join Message

        let guest_role = message.guild.roles.find(role => role.name === 'Guest');

        if (member.roles.has(guest_role.id)) return message.reply(`<@${member.id}> is already a guest.`);
        await (member.addRole(guest_role.id));
};
