const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    const rolled = Math.floor(Math.random() * 2) + 1;
    let headembed = new Discord.RichEmbed()
        .addField(`Result`, `You flipped: **Heads**!`)
        .setColor("RANDOM");
    let tailembed = new Discord.RichEmbed()
        .addField(`Result`, `You flipped: **Tails**!`)
        .setColor("RANDOM");
    if (rolled == "1") {
        message.channel.send(tailembed);
    }
    if (rolled == "2") {
        message.channel.send(headembed);
    }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["cf" ,"coinflip"],
    permLevel: 0
};

exports.help = {
    name: 'coinflip',
    description: 'Flips coin',
    usage: 'coinflip'
};
