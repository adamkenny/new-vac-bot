const Discord = require("discord.js");
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

module.exports.run = async (client, message, args) => {


    const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
const TOKEN_PATH = './json/token.json';

// Load client secrets from a local file.
fs.readFile('./json/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  authorize(JSON.parse(content), listMajors);
});

function authorize(credentials, callback) {
  const {client_secret, client_id, redirect_uris} = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(
      client_id, client_secret, redirect_uris[0]);

  // Check if we have previously stored a token.
  fs.readFile(TOKEN_PATH, (err, token) => {
    if (err) return getNewToken(oAuth2Client, callback);
    oAuth2Client.setCredentials(JSON.parse(token));
    callback(oAuth2Client);
  });
}

function getNewToken(oAuth2Client, callback) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });
  console.log('Authorize this app by visiting this url:', authUrl);
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });
  rl.question('Enter the code from that page here: ', (code) => {
    rl.close();
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return console.error('Error while trying to retrieve access token', err);
      oAuth2Client.setCredentials(token);
      // Store the token to disk for later program executions
      fs.writeFile(TOKEN_PATH, JSON.stringify(token), (err) => {
        if (err) return console.error(err);
        console.log('Token stored to', TOKEN_PATH);
      });
      callback(oAuth2Client);
    });
  });
}

function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
    range: 'Progression System!A3:AF',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
        rows.forEach(row => {
        if(row[1] === message.author.id) {

            let cargoEmbed = new Discord.RichEmbed()
            .setAuthor(`${row[0]}'s Cargo Stats`, `${message.author.avatarURL}`)
            .setFooter('Total Cargo')
            .setColor("GREEN")
            .addField(`Acid`, `${row[11]}`, true)
            .addField(`Scrap Aluminium`, `${row[12]}`, true)
            .addField(`Scrap Copper`, `${row[13]}`, true)
            .addField(`Scrap Lead`, `${row[14]}`, true)
            .addField(`Scrap Mercury`, `${row[15]}`, true)
            .addField(`Scrap Gold`, `${row[16]}`, true)
            .addField(`Scrap Tin`, `${row[17]}`, true)
            .addField(`Raw Emeralds`, `${row[18]}`, true)
            .addField(`Sand`, `${row[19]}`, true)
            .addField(`Planks`, `${row[20]}`, true)
            .addField(`Sawdust`, `${row[21]}`, true)
            .addField(`Treated Water`, `${row[22]}`, true)
            .addField(`Refined Aluminium`, `${row[23]}`, true)
            .addField(`Refined Copper`, `${row[24]}`, true)
            .addField(`Glass`, `${row[25]}`, true)
            .addField(`Refined Gold`, `${row[26]}`, true)
            .addField(`Refined Solder`, `${row[27]}`, true)
            .addField(`Refined Tin`, `${row[28]}`, true)
            .addField(`Refined Zinc`, `${row[29]}`, true)
            .addField(`Bronze Alloy`, `${row[30]}`, true)
            .addField(`Refined Amalgam`, `${row[31]}`, true)
            .setFooter('Created by GhostEntity#4258')
            .setTimestamp();

            message.channel.send(cargoEmbed);
        } else { return; }
        })

         //message.channel.send(cargoEmbed);

    } else {
      console.log('No data found.');
    }
  });
}

};

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: ['cargo'],
    permLevel: 2,
};

exports.help = {
    name: 'c',
    description: 'Shows you the amount of cargo you have turned in!',
    usage: 'c'
};
