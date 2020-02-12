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

if(args[0] === 'voucher') {
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '1h1DGvyRBQstFmIvl3uNaR9aDf5AgYb9NJurzQGDfxpE',
    range: 'VCT Price Sheet!B4:D',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
        let marketplaceEmbed = new Discord.RichEmbed()
        .setTitle(":convenience_store: Voucher Marketplace")
        .setFooter('**Prices change daily**')
        .setColor("ORANGE")
        rows.forEach(row => {
          if(row[0] === "Fish Meat x100") { row[0] = ":fish: Fish Meat x100" }
          if(row[0] === "Cargo") {row[0] = ":package: Cargo Vouchers" }
          if(row[0] === "Heli") {row[0] = ":helicopter: Heli Vouchers" }
          if(row[0] === "Airline") {row[0] = ":airplane: Airline Vouchers" }
          if(row[0] === "Train") {row[0] = ":train2: Train Vouchers" }
          if(row[0] === "Garbage") {row[0] = ":wastebasket: Garbage Vouchers" }
          if(row[0] === "Mail") {row[0] = ":mailbox_with_mail: Mail Vouchers" }
          if(row[0] === "Medic") {row[0] = ":hospital: Medic Vouchers" }
            marketplaceEmbed.addField(`${row[0]}`, `Price: ${row[1]}\n Max Amount: ${row[2]}`, true)
        })

          marketplaceEmbed.setTimestamp();
         message.channel.send(marketplaceEmbed);

    } else {
      console.log('No data found.');
    }
  });
}
}

if(args[0] === 'cargo') {
  function listMajors(auth) {
    const sheets = google.sheets({version: 'v4', auth});
    sheets.spreadsheets.values.get({
      spreadsheetId: '1h1DGvyRBQstFmIvl3uNaR9aDf5AgYb9NJurzQGDfxpE',
      range: 'VCT Price Sheet!F4:H',
    }, (err, res) => {
      if (err) return console.log('The API returned an error: ' + err);
      const rows = res.data.values;
      if (rows.length) {
          let marketplaceEmbed = new Discord.RichEmbed()
          .setTitle(":convenience_store: Cargo Marketplace")
          .setFooter('**Prices change daily**')
          .setColor("ORANGE")
          rows.forEach(row => {
              marketplaceEmbed.addField(`${row[0]}`, `Price: ${row[1]}\n Max Amount: ${row[2]}`, true)
          })
  
            marketplaceEmbed.setTimestamp();
           message.channel.send(marketplaceEmbed);
  
      } else {
        console.log('No data found.');
      }
    });
  }
  }

};

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['marketplace', 'shop', 'store'],
    permLevel: 0,
};

exports.help = {
    name: 'market',
    description: 'Shows you what we have available!',
    usage: 'market [cargo/voucher]'
};
