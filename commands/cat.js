const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {

    let { body } = await superagent
        .get(`https://aws.random.cat/meow`);

    let catembed = new Discord.RichEmbed()
        .setColor("ff9900")
        .setImage(body.file);

    message.channel.send(catembed);

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ["kitty", "kitten", "pussy", "vagina"],
    permLevel: 0
};

exports.help = {
    name: 'cat',
    description: 'Shows Cat Photo :)',
    usage: 'cat'
};
