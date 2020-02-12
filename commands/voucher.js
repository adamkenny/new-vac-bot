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
    range: 'Progression System!A2:L',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
        rows.forEach(row => {
        if(row[1] === message.author.id) {

            let voucherEmbed = new Discord.RichEmbed()
            .setAuthor(`${row[0]}'s Voucher Stats`, `${message.author.avatarURL}`)
            .setFooter('Total Vouchers')
            .setColor("RANDOM")
            .addField(`Airline Vouchers`, `${row[2]}`, true)
            .addField(`Cargo Vouchers`, `${row[3]}`, true)
            .addField(`Helicopter Vouchers`, `${row[4]}`, true)
            .addField(`Garbage Vouchers`, `${row[5]}`, true)
            .addField(`Mail Vouchers`, `${row[6]}`, true)
            .addField(`Fish Meat`, `${row[7]}`, true)
            .addField(`Medic Vouchers`, `${row[8]}`, true)
            .addField(`Train Vouchers`, `${row[9]}`, true)
            .addField(`Total Vouchers`, `${row[10]}`, true)
            .setFooter(`Created by GhostEntity#4258`)
            .setTimestamp();

            message.channel.send(voucherEmbed);
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
    aliases: ['vouchers'],
    permLevel: 2,
};

exports.help = {
    name: 'v',
    description: 'Shows you the amount of vouchers you have turned in!',
    usage: 'v'
};
