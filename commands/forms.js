const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {

  message.channel.send(`Inactivity form \nhttps://forms.gle/QppyC5nGnT1gkZoo7 \nOrder Form (currently closed) \nhttp://bit.ly/2ZouYG0 \nWorker Form\nhttp://bit.ly/2PjhmHn \nOrder Tracker (Only editable if worker)\nhttps://docs.google.com/spreadsheets/d/1h1DGvyRBQstFmIvl3uNaR9aDf5AgYb9NJurzQGDfxpE/edit?usp=sharing \nStaff Application \nhttps://docs.google.com/forms/d/e/1FAIpQLSfWySLgvg0ATfMH161Ol4ZOWaSzf06yk9jPdbrygaXVbFfsLQ/viewform`)

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
};

exports.help = {
    name: 'forms',
    description: 'Shows the current forms',
    usage: 'forms'
};
