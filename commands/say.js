const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    message.delete().catch(O_o => { });
    message.channel.send(`${ args.join(' ') }`);
};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 3,
};

exports.help = {
    name: 'say',
    description: 'Make the bot say something!',
    usage: 'Say [message]'
};
