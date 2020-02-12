const Discord = require("discord.js");
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

module.exports.run = async (client, message, args) => {

var SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];
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


if (args[1] == "airline") {
function listMajors(auth) {
  var member = message.mentions.members.first();
  // test message for adding vouchers message.channel.send(`I have been successfull in adding ${args[2]} airline vouchers to ` + member + `\'s account. Also, hi <@572139428106076171>.`);
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.append({
    spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
      range: '!A2:L',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
          "values": [
            [
              `${member.nickname}`,
              `${member.user.tag}`,
              `${member.id}`, // 144346516998455306
              `${args[2]}`, // Airline Vouchers
              `0`, // Cargo Vouchers
              `0`, //Heli Vouchers
              `0`, //Garbage Vouchers
              `0`, //Mail Vouchers
              `0`, //Fish Meat
              `0`, //Medic Vouchers
              `0`, //Train Vouchers
              `${new Date()}` // Date / Time
            ]
          ]
        }
      });
      message.channel.send(`Turned in ` + args[2] + ` airline vouchers for <@${member.id}>.`)
    }
}

};

exports.conf = {
  enabled: false,
  guildOnly: false,
  aliases: [],
  permLevel: 3,
};

exports.help = {
  name: 'addorder',
  description: 'Allows staff to add vouchers to the spreadsheet!',
  usage: 'addorder [user] [cargo/voucher] [amount]'
};
