const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {

    let { body } = await superagent
        .get(`https://random.dog/woof.json`);

    let dogembed = new Discord.RichEmbed()
        .setColor("ff9900")
        .setImage(body.url);

    message.channel.send(dogembed);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'dog',
    description: 'Shows Dog Photo :)',
    usage: 'dog'
};
