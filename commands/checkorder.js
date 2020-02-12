const Discord = require("discord.js");
const fs = require('fs');
const readline = require('readline');
const {google} = require('googleapis');

module.exports.run = async (client, message, args) => {

    // If modifying these scopes, delete token.json.
const SCOPES = ['https://www.googleapis.com/auth/spreadsheets.readonly'];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = './json/token.json';

// Load client secrets from a local file.
fs.readFile('./json/credentials.json', (err, content) => {
  if (err) return console.log('Error loading client secret file:', err);
  // Authorize a client with credentials, then call the Google Sheets API.
  authorize(JSON.parse(content), listMajors);
});

/**
 * Create an OAuth2 client with the given credentials, and then execute the
 * given callback function.
 * @param {Object} credentials The authorization client credentials.
 * @param {function} callback The callback to call with the authorized client.
 */
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

/**
 * Get and store new token after prompting for user authorization, and then
 * execute the given callback with the authorized OAuth2 client.
 * @param {google.auth.OAuth2} oAuth2Client The OAuth2 client to get token for.
 * @param {getEventsCallback} callback The callback for the authorized client.
 */
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

/**
 * Prints the names and majors of students in a sample spreadsheet:
 * @see https://docs.google.com/spreadsheets/d/1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms/edit
 * @param {google.auth.OAuth2} auth The authenticated Google OAuth client.
 */
function listMajors(auth) {
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.get({
    spreadsheetId: '183QWNRA30DzQemkXENsrS72RD7vCi7BOkmBjGz0kav8',
    range: 'Current Orders!B14:S',
  }, (err, res) => {
    if (err) return console.log('The API returned an error: ' + err);
    const rows = res.data.values;
    if (rows.length) {
        let ordersEmbed = new Discord.RichEmbed()
        .setTitle(":scroll: Orders")
        .setColor("RED")
        // Print columns A and E, which correspond to indices 0 and 4.
        rows.forEach(row => {
          if(row[6] === message.author.tag) {
          //if(row[0] === "Fish Meat") { row[0] = ":fish: Fish Meat" }
          if(row[8] === "Cargo") {row[8] = ":package: Cargo Vouchers" }
          //if(row[0] === "Helicopter") {row[0] = ":helicopter: Heli Vouchers" }
          if(row[8] === "Airline") {row[8] = ":airplane: Airline Vouchers" }
          //if(row[0] === "Train Vouchers") {row[0] = ":train2: Train Vouchers" }
          //if(row[0] === "Garbage Vouchers") {row[0] = ":wastebasket: Garbage Vouchers" }
          //if(row[0] === "Mail Vouchers") {row[0] = ":mailbox_with_mail: Mail Vouchers" }
          //if(row[0] === "Medic Vouchers") {row[0] = ":hospital: Medic Vouchers" }
          ordersEmbed.addField(`${row[0]}`, `${row[8]}\n Amount: ${row[10]}\n Total Price: ${row[12]}\n Status: **${row[14]}**`, true)

          ordersEmbed.setTimestamp();
          message.channel.send(ordersEmbed);
          }
      })
    } else {
      console.log('No data found.');
    }
  });
}

};

exports.conf = {
    enabled: false,
    guildOnly: false,
    aliases: [],
    permLevel: 1,
};

exports.help = {
    name: 'checkorder',
    description: 'Allows you to check your order!',
    usage: 'checkorder'
};
