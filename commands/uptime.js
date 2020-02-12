const Discord = require("discord.js");
const config = require(`../json/config.json`);

exports.run = function(client, message, params) {
        let totalSeconds = (client.uptime / 1000);
        let days = ~~(totalSeconds / 86400);
        totalSeconds -= days * 86400
    
        let hours = ~~(totalSeconds / 3600);
        totalSeconds -= hours * 3600
    
        let minutes = ~~(totalSeconds / 60);
        totalSeconds -= minutes * 60
    
        let seconds = Math.floor(totalSeconds - (60*(Math.floor(totalSeconds/60))))
    
        let uptime = `**${days}** days\n **${hours}** hours\n **${minutes}** minutes\n **${seconds}** seconds`;
    
        message.channel.send(`Online since:\n ${uptime}`)
          
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 4
};

exports.help = {
  name: 'uptime',
  description: 'Check the uptime for the discord bot',
  usage: 'uptime'
};