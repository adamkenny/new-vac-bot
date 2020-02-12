const Discord = require("discord.js");
module.exports = member => {
        let memberLog = member.guild.channels.find(ch => ch.name === `join-log`); //Checks channel
        let leaveembed = new Discord.RichEmbed()
          .setColor("ff0000")
          .setAuthor(`${member.user.tag} (${member.id})`, member.user.avatarURL)
          .setFooter(`User left`)
          .setTimestamp();
        memberLog.send(leaveembed); // Sends Leave Message
};
