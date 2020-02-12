const Discord = require("discord.js");

// Found this, have no clue why I put this in here...

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// const arr = [1, 2, 3, 4, 5, 6, 9, 7, 8, 9, 10];
// arr.reverse();

// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


const used = process.memoryUsage().heapUsed / 1024 / 1024;

exports.run = function (client, message, args) {

    let totalSeconds = (client.uptime / 1000);
    let days = ~~(totalSeconds / 86400);
    totalSeconds -= days * 86400

    let hours = ~~(totalSeconds / 3600);
    totalSeconds -= hours * 3600

    let minutes = ~~(totalSeconds / 60);
    totalSeconds -= minutes * 60

    let seconds = Math.floor(totalSeconds - (60 * (Math.floor(totalSeconds / 60))))

    let uptime = `**${days}** days, **${hours}** hours, **${minutes}** minutes, **${seconds}** seconds`;

    let botinfoEmbed = new Discord.RichEmbed()
        .setColor("RANDOM")
        .setAuthor(`${client.user.username}`, client.user.displayAvatarURL)
        .addField(`Author`, `<@470205527675240449>`, true)
        .addField(`Created on`, client.user.createdAt, true)
        .addField(`Total RAM used`, `${Math.round(used * 100) / 100} MB`)
        .addField(`Total Servers`, `${client.guilds.size}`, true)
        .addField(`Discord.js`, `${Discord.version}`, true)
        .addField(`Node.js`, `${process.version}`, true)
        .addField("Uptime", uptime, true)
        .setTimestamp();
    message.channel.send(botinfoEmbed);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'botinfo',
    description: 'Shows info about Bot',
    usage: 'botinfo'
};
