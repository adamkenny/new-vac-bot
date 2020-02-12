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





if (args[1] == "cargo") {

function listMajors(auth) {
  var member = message.mentions.members.first();
  const sheets = google.sheets({version: 'v4', auth});
  sheets.spreadsheets.values.append({
    spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
      range: 'Voucher History (Do Not Touch)!A2:L',
      valueInputOption: 'USER_ENTERED',
      insertDataOption: 'INSERT_ROWS',
      resource: {
          "values": [
            [
              `${member.nickname}`,
              `${member.user.tag}`,
              `${member.id}`, // 144346516998455306
              `0`, // Airline Vouchers
              `${args[2]}`, // Cargo Vouchers
              `0`, //Heli Vouchers
              `0`, //Garbage Vouchers
              `0`, //Mail Vouchers
              `0`, //Fish Meat
              `0`, //Medic Vouchers
              `0`, //Train Vouchers
              `${new Date()}` // Date / Time
            ]
          ]
        },
      });
      message.channel.send(`Turned in ` + args[2] + ` cargo vouchers for <@${member.id}>.`)
    }
  }

  if (args[1] == "heli") {

    function listMajors(auth) {
      var member = message.mentions.members.first();
      const sheets = google.sheets({version: 'v4', auth});
      sheets.spreadsheets.values.append({
        spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
          range: 'Voucher History (Do Not Touch)!A2:L',
          valueInputOption: 'USER_ENTERED',
          insertDataOption: 'INSERT_ROWS',
          resource: {
              "values": [
                [
                  `${member.nickname}`,
                  `${member.user.tag}`,
                  `${member.id}`, // 144346516998455306
                  `0`, // Airline Vouchers
                  `0`, // Cargo Vouchers
                  `${args[2]}`, //Heli Vouchers
                  `0`, //Garbage Vouchers
                  `0`, //Mail Vouchers
                  `0`, //Fish Meat
                  `0`, //Medic Vouchers
                  `0`, //Train Vouchers
                  `${new Date()}` // Date / Time
                ]
              ]
            },
          });
          message.channel.send(`Turned in ` + args[2] + ` helicopter vouchers for <@${member.id}>.`)

        }
      }

      if (args[1] == "garbage") {

        function listMajors(auth) {
          var member = message.mentions.members.first();
          const sheets = google.sheets({version: 'v4', auth});
          sheets.spreadsheets.values.append({
            spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
              range: 'Voucher History (Do Not Touch)!A2:L',
              valueInputOption: 'USER_ENTERED',
              insertDataOption: 'INSERT_ROWS',
              resource: {
                  "values": [
                    [
                      `${member.nickname}`,
                      `${member.user.tag}`,
                      `${member.id}`, // 144346516998455306
                      `0`, // Airline Vouchers
                      `0`, // Cargo Vouchers
                      `0`, //Heli Vouchers
                      `${args[2]}`, //Garbage Vouchers
                      `0`, //Mail Vouchers
                      `0`, //Fish Meat
                      `0`, //Medic Vouchers
                      `0`, //Train Vouchers
                      `${new Date()}` // Date / Time
                    ]
                  ]
                },
              });
              message.channel.send(`Turned in ` + args[2] + ` garbage vouchers for <@${member.id}>.`)

            }
          }

          if (args[1] == "mail") {

            function listMajors(auth) {
              var member = message.mentions.members.first();
              const sheets = google.sheets({version: 'v4', auth});
              sheets.spreadsheets.values.append({
                spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                  range: 'Voucher History (Do Not Touch)!A2:L',
                  valueInputOption: 'USER_ENTERED',
                  insertDataOption: 'INSERT_ROWS',
                  resource: {
                      "values": [
                        [
                          `${member.nickname}`,
                          `${member.user.tag}`,
                          `${member.id}`, // 144346516998455306
                          `0`, // Airline Vouchers
                          `0`, // Cargo Vouchers
                          `0`, //Heli Vouchers
                          `0`, //Garbage Vouchers
                          `${args[2]}`, //Mail Vouchers
                          `0`, //Fish Meat
                          `0`, //Medic Vouchers
                          `0`, //Train Vouchers
                          `${new Date()}` // Date / Time
                        ]
                      ]
                    },
                  });
                  message.channel.send(`Turned in ` + args[2] + ` mail vouchers for <@${member.id}>.`)

                }
              }

              if (args[1] == "fish") {

                function listMajors(auth) {
                  var member = message.mentions.members.first();
                  const sheets = google.sheets({version: 'v4', auth});
                  sheets.spreadsheets.values.append({
                    spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                      range: 'Voucher History (Do Not Touch)!A2:L',
                      valueInputOption: 'USER_ENTERED',
                      insertDataOption: 'INSERT_ROWS',
                      resource: {
                          "values": [
                            [
                              `${member.nickname}`,
                              `${member.user.tag}`,
                              `${member.id}`, // 144346516998455306
                              `0`, // Airline Vouchers
                              `0`, // Cargo Vouchers
                              `0`, //Heli Vouchers
                              `0`, //Garbage Vouchers
                              `0`, //Mail Vouchers
                              `${args[2]}`, //Fish Meat
                              `0`, //Medic Vouchers
                              `0`, //Train Vouchers
                              `${new Date()}` // Date / Time
                            ]
                          ]
                        },
                      });
                      message.channel.send(`Turned in ` + args[2] + ` fish meat for <@${member.id}>.`)

                    }
                  }
                  if (args[1] == "medic") {

                    function listMajors(auth) {
                      var member = message.mentions.members.first();
                      const sheets = google.sheets({version: 'v4', auth});
                      sheets.spreadsheets.values.append({
                        spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                          range: 'Voucher History (Do Not Touch)!A2:L',
                          valueInputOption: 'USER_ENTERED',
                          insertDataOption: 'INSERT_ROWS',
                          resource: {
                              "values": [
                                [
                                  `${member.nickname}`,
                                  `${member.user.tag}`,
                                  `${member.id}`, // 144346516998455306
                                  `0`, // Airline Vouchers
                                  `0`, // Cargo Vouchers
                                  `0`, //Heli Vouchers
                                  `0`, //Garbage Vouchers
                                  `0`, //Mail Vouchers
                                  `0`, //Fish Meat
                                  `${args[2]}`, //Medic Vouchers
                                  `0`, //Train Vouchers
                                  `${new Date()}` // Date / Time
                                ]
                              ]
                            },
                          });
                          message.channel.send(`Turned in ` + args[2] + ` medic vouchers for <@${member.id}>.`)
                        }
                      }
                      if (args[1] == "train") {

                        function listMajors(auth) {
                          var member = message.mentions.members.first();
                          const sheets = google.sheets({version: 'v4', auth});
                          sheets.spreadsheets.values.append({
                            spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                              range: 'Voucher History (Do Not Touch)!A2:L',
                              valueInputOption: 'USER_ENTERED',
                              insertDataOption: 'INSERT_ROWS',
                              resource: {
                                  "values": [
                                    [
                                      `${member.nickname}`,
                                      `${member.user.tag}`,
                                      `${member.id}`, // 144346516998455306
                                      `0`, // Airline Vouchers
                                      `0`, // Cargo Vouchers
                                      `0`, //Heli Vouchers
                                      `0`, //Garbage Vouchers
                                      `0`, //Mail Vouchers
                                      `0`, //Fish Meat
                                      `0`, //Medic Vouchers
                                      `${args[2]}`, //Train Vouchers
                                      `${new Date()}` // Date / Time
                                    ]
                                  ]
                                },
                              });
                              message.channel.send(`Turned in ` + args[2] + ` train vouchers for <@${member.id}>.`)
                            }
                          }

                          if (args[1] == "cargo") {

                            function listMajors(auth) {
                              var member = message.mentions.members.first();
                              const sheets = google.sheets({version: 'v4', auth});
                              sheets.spreadsheets.values.append({
                                spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                                  range: 'Voucher History (Do Not Touch)!A2:L',
                                  valueInputOption: 'USER_ENTERED',
                                  insertDataOption: 'INSERT_ROWS',
                                  resource: {
                                      "values": [
                                        [
                                          `${member.nickname}`,
                                          `${member.user.tag}`,
                                          `${member.id}`, // 144346516998455306
                                          `0`, // Airline Vouchers
                                          `${args[2]}`, // Cargo Vouchers
                                          `0`, //Heli Vouchers
                                          `0`, //Garbage Vouchers
                                          `0`, //Mail Vouchers
                                          `0`, //Fish Meat
                                          `0`, //Medic Vouchers
                                          `0`, //Train Vouchers
                                          `${new Date()}` // Date / Time
                                        ]
                                      ]
                                    },
                                  });
                                }
                              }

if (args[1] == "acid") {

  function listMajors(auth) {
     var member = message.mentions.members.first();
     const sheets = google.sheets({version: 'v4', auth});
      sheets.spreadsheets.values.append({
        spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
        range: 'Cargo History (Do Not Touch)!A2:Y',
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
            "values": [
            [
            `${member.nickname}`,
            `${member.user.tag}`,
            `${member.id}`, // 144346516998455306
            `${args[2]}`, // Acid
            `0`, // Scrap Aluminum
            `0`, // Scrap Copper
            `0`, // Scrap Lead
            `0`, // Scrap Mercury
            `0`, // Scrap Gold
            `0`, // Scrap Tin
            `0`, // Raw Emeralds
            `0`, // Sand
            `0`, // Planks
            `0`, // Sawdust
            `0`, // Treated Water
            `0`, // Refined Aluminium
            `0`, // Refined Copper
            `0`, // Refined Glass
            `0`, // Refined Gold
            `0`, // Refined Solder
            `0`, // Refined Tin
            `0`, // Refined Zine
            `0`, // Bronze Alloy
            `0`, // Refined Amalgam
            `${new Date()}` // Date / Time
           ]
          ]
        },
      });
    }
  }

  if (args[1] == "sa") {

    function listMajors(auth) {
       var member = message.mentions.members.first();
       const sheets = google.sheets({version: 'v4', auth});
        sheets.spreadsheets.values.append({
          spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
          range: 'Cargo History (Do Not Touch)!A2:Y',
          valueInputOption: 'USER_ENTERED',
          insertDataOption: 'INSERT_ROWS',
          resource: {
              "values": [
              [
              `${member.nickname}`,
              `${member.user.tag}`,
              `${member.id}`, // 144346516998455306
              `0`, // Acid
              `${args[2]}`, // Scrap Aluminum
              `0`, // Scrap Copper
              `0`, // Scrap Lead
              `0`, // Scrap Mercury
              `0`, // Scrap Gold
              `0`, // Scrap Tin
              `0`, // Raw Emeralds
              `0`, // Sand
              `0`, // Planks
              `0`, // Sawdust
              `0`, // Treated Water
              `0`, // Refined Aluminium
              `0`, // Refined Copper
              `0`, // Refined Glass
              `0`, // Refined Gold
              `0`, // Refined Solder
              `0`, // Refined Tin
              `0`, // Refined Zine
              `0`, // Bronze Alloy
              `0`, // Refined Amalgam
              `${new Date()}` // Date / Time
             ]
            ]
          },
        });
      }
    }

    if (args[1] == "sc") {

      function listMajors(auth) {
         var member = message.mentions.members.first();
         const sheets = google.sheets({version: 'v4', auth});
          sheets.spreadsheets.values.append({
            spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
            range: 'Cargo History (Do Not Touch)!A2:Y',
            valueInputOption: 'USER_ENTERED',
            insertDataOption: 'INSERT_ROWS',
            resource: {
                "values": [
                [
                `${member.nickname}`,
                `${member.user.tag}`,
                `${member.id}`, // 144346516998455306
                `0`, // Acid
                `0`, // Scrap Aluminum
                `${args[2]}`, // Scrap Copper
                `0`, // Scrap Lead
                `0`, // Scrap Mercury
                `0`, // Scrap Gold
                `0`, // Scrap Tin
                `0`, // Raw Emeralds
                `0`, // Sand
                `0`, // Planks
                `0`, // Sawdust
                `0`, // Treated Water
                `0`, // Refined Aluminium
                `0`, // Refined Copper
                `0`, // Refined Glass
                `0`, // Refined Gold
                `0`, // Refined Solder
                `0`, // Refined Tin
                `0`, // Refined Zine
                `0`, // Bronze Alloy
                `0`, // Refined Amalgam
                `${new Date()}` // Date / Time
               ]
              ]
            },
          });
        }
      }

      if (args[1] == "sl") {

        function listMajors(auth) {
           var member = message.mentions.members.first();
           const sheets = google.sheets({version: 'v4', auth});
            sheets.spreadsheets.values.append({
              spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
              range: 'Cargo History (Do Not Touch)!A2:Y',
              valueInputOption: 'USER_ENTERED',
              insertDataOption: 'INSERT_ROWS',
              resource: {
                  "values": [
                  [
                  `${member.nickname}`,
                  `${member.user.tag}`,
                  `${member.id}`, // 144346516998455306
                  `0`, // Acid
                  `0`, // Scrap Aluminum
                  `0`, // Scrap Copper
                  `${args[2]}`, // Scrap Lead
                  `0`, // Scrap Mercury
                  `0`, // Scrap Gold
                  `0`, // Scrap Tin
                  `0`, // Raw Emeralds
                  `0`, // Sand
                  `0`, // Planks
                  `0`, // Sawdust
                  `0`, // Treated Water
                  `0`, // Refined Aluminium
                  `0`, // Refined Copper
                  `0`, // Refined Glass
                  `0`, // Refined Gold
                  `0`, // Refined Solder
                  `0`, // Refined Tin
                  `0`, // Refined Zine
                  `0`, // Bronze Alloy
                  `0`, // Refined Amalgam
                  `${new Date()}` // Date / Time
                 ]
                ]
              },
            });
          }
        }

        if (args[1] == "sm") {

          function listMajors(auth) {
             var member = message.mentions.members.first();
             const sheets = google.sheets({version: 'v4', auth});
              sheets.spreadsheets.values.append({
                spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                range: 'Cargo History (Do Not Touch)!A2:Y',
                valueInputOption: 'USER_ENTERED',
                insertDataOption: 'INSERT_ROWS',
                resource: {
                    "values": [
                    [
                    `${member.nickname}`,
                    `${member.user.tag}`,
                    `${member.id}`, // 144346516998455306
                    `0`, // Acid
                    `0`, // Scrap Aluminum
                    `0`, // Scrap Copper
                    `0`, // Scrap Lead
                    `${args[2]}`, // Scrap Mercury
                    `0`, // Scrap Gold
                    `0`, // Scrap Tin
                    `0`, // Raw Emeralds
                    `0`, // Sand
                    `0`, // Planks
                    `0`, // Sawdust
                    `0`, // Treated Water
                    `0`, // Refined Aluminium
                    `0`, // Refined Copper
                    `0`, // Refined Glass
                    `0`, // Refined Gold
                    `0`, // Refined Solder
                    `0`, // Refined Tin
                    `0`, // Refined Zine
                    `0`, // Bronze Alloy
                    `0`, // Refined Amalgam
                    `${new Date()}` // Date / Time
                   ]
                  ]
                },
              });
            }
          }

          if (args[1] == "sg") {

            function listMajors(auth) {
               var member = message.mentions.members.first();
               const sheets = google.sheets({version: 'v4', auth});
                sheets.spreadsheets.values.append({
                  spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                  range: 'Cargo History (Do Not Touch)!A2:Y',
                  valueInputOption: 'USER_ENTERED',
                  insertDataOption: 'INSERT_ROWS',
                  resource: {
                      "values": [
                      [
                      `${member.nickname}`,
                      `${member.user.tag}`,
                      `${member.id}`, // 144346516998455306
                      `0`, // Acid
                      `0`, // Scrap Aluminum
                      `0`, // Scrap Copper
                      `0`, // Scrap Lead
                      `0`, // Scrap Mercury
                      `${args[2]}`, // Scrap Gold
                      `0`, // Scrap Tin
                      `0`, // Raw Emeralds
                      `0`, // Sand
                      `0`, // Planks
                      `0`, // Sawdust
                      `0`, // Treated Water
                      `0`, // Refined Aluminium
                      `0`, // Refined Copper
                      `0`, // Refined Glass
                      `0`, // Refined Gold
                      `0`, // Refined Solder
                      `0`, // Refined Tin
                      `0`, // Refined Zine
                      `0`, // Bronze Alloy
                      `0`, // Refined Amalgam
                      `${new Date()}` // Date / Time
                     ]
                    ]
                  },
                });
              }
            }

            if (args[1] == "st") {

              function listMajors(auth) {
                 var member = message.mentions.members.first();
                 const sheets = google.sheets({version: 'v4', auth});
                  sheets.spreadsheets.values.append({
                    spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                    range: 'Cargo History (Do Not Touch)!A2:Y',
                    valueInputOption: 'USER_ENTERED',
                    insertDataOption: 'INSERT_ROWS',
                    resource: {
                        "values": [
                        [
                        `${member.nickname}`,
                        `${member.user.tag}`,
                        `${member.id}`, // 144346516998455306
                        `0`, // Acid
                        `0`, // Scrap Aluminum
                        `0`, // Scrap Copper
                        `0`, // Scrap Lead
                        `0`, // Scrap Mercury
                        `0`, // Scrap Gold
                        `${args[2]}`, // Scrap Tin
                        `0`, // Raw Emeralds
                        `0`, // Sand
                        `0`, // Planks
                        `0`, // Sawdust
                        `0`, // Treated Water
                        `0`, // Refined Aluminium
                        `0`, // Refined Copper
                        `0`, // Refined Glass
                        `0`, // Refined Gold
                        `0`, // Refined Solder
                        `0`, // Refined Tin
                        `0`, // Refined Zine
                        `0`, // Bronze Alloy
                        `0`, // Refined Amalgam
                        `${new Date()}` // Date / Time
                       ]
                      ]
                    },
                  });
                }
              }

              if (args[1] == "re") {

                function listMajors(auth) {
                   var member = message.mentions.members.first();
                   const sheets = google.sheets({version: 'v4', auth});
                    sheets.spreadsheets.values.append({
                      spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                      range: 'Cargo History (Do Not Touch)!A2:Y',
                      valueInputOption: 'USER_ENTERED',
                      insertDataOption: 'INSERT_ROWS',
                      resource: {
                          "values": [
                          [
                          `${member.nickname}`,
                          `${member.user.tag}`,
                          `${member.id}`, // 144346516998455306
                          `0`, // Acid
                          `0`, // Scrap Aluminum
                          `0`, // Scrap Copper
                          `0`, // Scrap Lead
                          `0`, // Scrap Mercury
                          `0`, // Scrap Gold
                          `0`, // Scrap Tin
                          `${args[2]}`, // Raw Emeralds
                          `0`, // Sand
                          `0`, // Planks
                          `0`, // Sawdust
                          `0`, // Treated Water
                          `0`, // Refined Aluminium
                          `0`, // Refined Copper
                          `0`, // Refined Glass
                          `0`, // Refined Gold
                          `0`, // Refined Solder
                          `0`, // Refined Tin
                          `0`, // Refined Zine
                          `0`, // Bronze Alloy
                          `0`, // Refined Amalgam
                          `${new Date()}` // Date / Time
                         ]
                        ]
                      },
                    });
                  }
                }

                if (args[1] == "sand") {

                  function listMajors(auth) {
                     var member = message.mentions.members.first();
                     const sheets = google.sheets({version: 'v4', auth});
                      sheets.spreadsheets.values.append({
                        spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                        range: 'Cargo History (Do Not Touch)!A2:Y',
                        valueInputOption: 'USER_ENTERED',
                        insertDataOption: 'INSERT_ROWS',
                        resource: {
                            "values": [
                            [
                            `${member.nickname}`,
                            `${member.user.tag}`,
                            `${member.id}`, // 144346516998455306
                            `0`, // Acid
                            `0`, // Scrap Aluminum
                            `0`, // Scrap Copper
                            `0`, // Scrap Lead
                            `0`, // Scrap Mercury
                            `0`, // Scrap Gold
                            `0`, // Scrap Tin
                            `0`, // Raw Emeralds
                            `${args[2]}`, // Sand
                            `0`, // Planks
                            `0`, // Sawdust
                            `0`, // Treated Water
                            `0`, // Refined Aluminium
                            `0`, // Refined Copper
                            `0`, // Refined Glass
                            `0`, // Refined Gold
                            `0`, // Refined Solder
                            `0`, // Refined Tin
                            `0`, // Refined Zine
                            `0`, // Bronze Alloy
                            `0`, // Refined Amalgam
                            `${new Date()}` // Date / Time
                           ]
                          ]
                        },
                      });
                    }
                  }

                  if (args[1] == "planks") {

                    function listMajors(auth) {
                       var member = message.mentions.members.first();
                       const sheets = google.sheets({version: 'v4', auth});
                        sheets.spreadsheets.values.append({
                          spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                          range: 'Cargo History (Do Not Touch)!A2:Y',
                          valueInputOption: 'USER_ENTERED',
                          insertDataOption: 'INSERT_ROWS',
                          resource: {
                              "values": [
                              [
                              `${member.nickname}`,
                              `${member.user.tag}`,
                              `${member.id}`, // 144346516998455306
                              `0`, // Acid
                              `0`, // Scrap Aluminum
                              `0`, // Scrap Copper
                              `0`, // Scrap Lead
                              `0`, // Scrap Mercury
                              `0`, // Scrap Gold
                              `0`, // Scrap Tin
                              `0`, // Raw Emeralds
                              `0`, // Sand
                              `${args[2]}`, // Planks
                              `0`, // Sawdust
                              `0`, // Treated Water
                              `0`, // Refined Aluminium
                              `0`, // Refined Copper
                              `0`, // Refined Glass
                              `0`, // Refined Gold
                              `0`, // Refined Solder
                              `0`, // Refined Tin
                              `0`, // Refined Zine
                              `0`, // Bronze Alloy
                              `0`, // Refined Amalgam
                              `${new Date()}` // Date / Time
                             ]
                            ]
                          },
                        });
                      }
                    }

                    if (args[1] == "sawdust") {

                      function listMajors(auth) {
                         var member = message.mentions.members.first();
                         const sheets = google.sheets({version: 'v4', auth});
                          sheets.spreadsheets.values.append({
                            spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                            range: 'Cargo History (Do Not Touch)!A2:Y',
                            valueInputOption: 'USER_ENTERED',
                            insertDataOption: 'INSERT_ROWS',
                            resource: {
                                "values": [
                                [
                                `${member.nickname}`,
                                `${member.user.tag}`,
                                `${member.id}`, // 144346516998455306
                                `0`, // Acid
                                `0`, // Scrap Aluminum
                                `0`, // Scrap Copper
                                `0`, // Scrap Lead
                                `0`, // Scrap Mercury
                                `0`, // Scrap Gold
                                `0`, // Scrap Tin
                                `0`, // Raw Emeralds
                                `0`, // Sand
                                `0`, // Planks
                                `${args[2]}`, // Sawdust
                                `0`, // Treated Water
                                `0`, // Refined Aluminium
                                `0`, // Refined Copper
                                `0`, // Refined Glass
                                `0`, // Refined Gold
                                `0`, // Refined Solder
                                `0`, // Refined Tin
                                `0`, // Refined Zine
                                `0`, // Bronze Alloy
                                `0`, // Refined Amalgam
                                `${new Date()}` // Date / Time
                               ]
                              ]
                            },
                          });
                        }
                      }

                      if (args[1] == "tw") {

                        function listMajors(auth) {
                           var member = message.mentions.members.first();
                           const sheets = google.sheets({version: 'v4', auth});
                            sheets.spreadsheets.values.append({
                              spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                              range: 'Cargo History (Do Not Touch)!A2:Y',
                              valueInputOption: 'USER_ENTERED',
                              insertDataOption: 'INSERT_ROWS',
                              resource: {
                                  "values": [
                                  [
                                  `${member.nickname}`,
                                  `${member.user.tag}`,
                                  `${member.id}`, // 144346516998455306
                                  `0`, // Acid
                                  `0`, // Scrap Aluminum
                                  `0`, // Scrap Copper
                                  `0`, // Scrap Lead
                                  `0`, // Scrap Mercury
                                  `0`, // Scrap Gold
                                  `0`, // Scrap Tin
                                  `0`, // Raw Emeralds
                                  `0`, // Sand
                                  `0`, // Planks
                                  `0`, // Sawdust
                                  `${args[2]}`, // Treated Water
                                  `0`, // Refined Aluminium
                                  `0`, // Refined Copper
                                  `0`, // Refined Glass
                                  `0`, // Refined Gold
                                  `0`, // Refined Solder
                                  `0`, // Refined Tin
                                  `0`, // Refined Zine
                                  `0`, // Bronze Alloy
                                  `0`, // Refined Amalgam
                                  `${new Date()}` // Date / Time
                                 ]
                                ]
                              },
                            });
                          }
                        }

                        if (args[1] == "ra") {

                          function listMajors(auth) {
                             var member = message.mentions.members.first();
                             const sheets = google.sheets({version: 'v4', auth});
                              sheets.spreadsheets.values.append({
                                spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                                range: 'Cargo History (Do Not Touch)!A2:Y',
                                valueInputOption: 'USER_ENTERED',
                                insertDataOption: 'INSERT_ROWS',
                                resource: {
                                    "values": [
                                    [
                                    `${member.nickname}`,
                                    `${member.user.tag}`,
                                    `${member.id}`, // 144346516998455306
                                    `0`, // Acid
                                    `0`, // Scrap Aluminum
                                    `0`, // Scrap Copper
                                    `0`, // Scrap Lead
                                    `0`, // Scrap Mercury
                                    `0`, // Scrap Gold
                                    `0`, // Scrap Tin
                                    `0`, // Raw Emeralds
                                    `0`, // Sand
                                    `0`, // Planks
                                    `0`, // Sawdust
                                    `0`, // Treated Water
                                    `${args[2]}`, // Refined Aluminium
                                    `0`, // Refined Copper
                                    `0`, // Refined Glass
                                    `0`, // Refined Gold
                                    `0`, // Refined Solder
                                    `0`, // Refined Tin
                                    `0`, // Refined Zine
                                    `0`, // Bronze Alloy
                                    `0`, // Refined Amalgam
                                    `${new Date()}` // Date / Time
                                   ]
                                  ]
                                },
                              });
                            }
                          }

                          if (args[1] == "rc") {

                            function listMajors(auth) {
                               var member = message.mentions.members.first();
                               const sheets = google.sheets({version: 'v4', auth});
                                sheets.spreadsheets.values.append({
                                  spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                                  range: 'Cargo History (Do Not Touch)!A2:Y',
                                  valueInputOption: 'USER_ENTERED',
                                  insertDataOption: 'INSERT_ROWS',
                                  resource: {
                                      "values": [
                                      [
                                      `${member.nickname}`,
                                      `${member.user.tag}`,
                                      `${member.id}`, // 144346516998455306
                                      `0`, // Acid
                                      `0`, // Scrap Aluminum
                                      `0`, // Scrap Copper
                                      `0`, // Scrap Lead
                                      `0`, // Scrap Mercury
                                      `0`, // Scrap Gold
                                      `0`, // Scrap Tin
                                      `0`, // Raw Emeralds
                                      `0`, // Sand
                                      `0`, // Planks
                                      `0`, // Sawdust
                                      `0`, // Treated Water
                                      `0`, // Refined Aluminium
                                      `${args[2]}`, // Refined Copper
                                      `0`, // Refined Glass
                                      `0`, // Refined Gold
                                      `0`, // Refined Solder
                                      `0`, // Refined Tin
                                      `0`, // Refined Zine
                                      `0`, // Bronze Alloy
                                      `0`, // Refined Amalgam
                                      `${new Date()}` // Date / Time
                                     ]
                                    ]
                                  },
                                });
                              }
                            }

                            if (args[1] == "glass") {

                              function listMajors(auth) {
                                 var member = message.mentions.members.first();
                                 const sheets = google.sheets({version: 'v4', auth});
                                  sheets.spreadsheets.values.append({
                                    spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                                    range: 'Cargo History (Do Not Touch)!A2:Y',
                                    valueInputOption: 'USER_ENTERED',
                                    insertDataOption: 'INSERT_ROWS',
                                    resource: {
                                        "values": [
                                        [
                                        `${member.nickname}`,
                                        `${member.user.tag}`,
                                        `${member.id}`, // 144346516998455306
                                        `0`, // Acid
                                        `0`, // Scrap Aluminum
                                        `0`, // Scrap Copper
                                        `0`, // Scrap Lead
                                        `0`, // Scrap Mercury
                                        `0`, // Scrap Gold
                                        `0`, // Scrap Tin
                                        `0`, // Raw Emeralds
                                        `0`, // Sand
                                        `0`, // Planks
                                        `0`, // Sawdust
                                        `0`, // Treated Water
                                        `0`, // Refined Aluminium
                                        `0`, // Refined Copper
                                        `${args[2]}`, // Glass
                                        `0`, // Refined Gold
                                        `0`, // Refined Solder
                                        `0`, // Refined Tin
                                        `0`, // Refined Zine
                                        `0`, // Bronze Alloy
                                        `0`, // Refined Amalgam
                                        `${new Date()}` // Date / Time
                                       ]
                                      ]
                                    },
                                  });
                                }
                              }

                              if (args[1] == "rg") {

                                function listMajors(auth) {
                                   var member = message.mentions.members.first();
                                   const sheets = google.sheets({version: 'v4', auth});
                                    sheets.spreadsheets.values.append({
                                      spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                                      range: 'Cargo History (Do Not Touch)!A2:Y',
                                      valueInputOption: 'USER_ENTERED',
                                      insertDataOption: 'INSERT_ROWS',
                                      resource: {
                                          "values": [
                                          [
                                          `${member.nickname}`,
                                          `${member.user.tag}`,
                                          `${member.id}`, // 144346516998455306
                                          `0`, // Acid
                                          `0`, // Scrap Aluminum
                                          `0`, // Scrap Copper
                                          `0`, // Scrap Lead
                                          `0`, // Scrap Mercury
                                          `0`, // Scrap Gold
                                          `0`, // Scrap Tin
                                          `0`, // Raw Emeralds
                                          `0`, // Sand
                                          `0`, // Planks
                                          `0`, // Sawdust
                                          `0`, // Treated Water
                                          `0`, // Refined Aluminium
                                          `0`, // Refined Copper
                                          `0`, // Glass
                                          `${args[2]}`, // Refined Gold
                                          `0`, // Refined Solder
                                          `0`, // Refined Tin
                                          `0`, // Refined Zine
                                          `0`, // Bronze Alloy
                                          `0`, // Refined Amalgam
                                          `${new Date()}` // Date / Time
                                         ]
                                        ]
                                      },
                                    });
                                  }
                                }

                                if (args[1] == "rs") {

                                  function listMajors(auth) {
                                     var member = message.mentions.members.first();
                                     const sheets = google.sheets({version: 'v4', auth});
                                      sheets.spreadsheets.values.append({
                                        spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                                        range: 'Cargo History (Do Not Touch)!A2:Y',
                                        valueInputOption: 'USER_ENTERED',
                                        insertDataOption: 'INSERT_ROWS',
                                        resource: {
                                            "values": [
                                            [
                                            `${member.nickname}`,
                                            `${member.user.tag}`,
                                            `${member.id}`, // 144346516998455306
                                            `0`, // Acid
                                            `0`, // Scrap Aluminum
                                            `0`, // Scrap Copper
                                            `0`, // Scrap Lead
                                            `0`, // Scrap Mercury
                                            `0`, // Scrap Gold
                                            `0`, // Scrap Tin
                                            `0`, // Raw Emeralds
                                            `0`, // Sand
                                            `0`, // Planks
                                            `0`, // Sawdust
                                            `0`, // Treated Water
                                            `0`, // Refined Aluminium
                                            `0`, // Refined Copper
                                            `0`, // Glass
                                            `0`, // Refined Gold
                                            `${args[2]}`, // Refined Solder
                                            `0`, // Refined Tin
                                            `0`, // Refined Zine
                                            `0`, // Bronze Alloy
                                            `0`, // Refined Amalgam
                                            `${new Date()}` // Date / Time
                                           ]
                                          ]
                                        },
                                      });
                                    }
                                  }

                                  if (args[1] == "rt") {

                                    function listMajors(auth) {
                                       var member = message.mentions.members.first();
                                       const sheets = google.sheets({version: 'v4', auth});
                                        sheets.spreadsheets.values.append({
                                          spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                                          range: 'Cargo History (Do Not Touch)!A2:Y',
                                          valueInputOption: 'USER_ENTERED',
                                          insertDataOption: 'INSERT_ROWS',
                                          resource: {
                                              "values": [
                                              [
                                              `${member.nickname}`,
                                              `${member.user.tag}`,
                                              `${member.id}`, // 144346516998455306
                                              `0`, // Acid
                                              `0`, // Scrap Aluminum
                                              `0`, // Scrap Copper
                                              `0`, // Scrap Lead
                                              `0`, // Scrap Mercury
                                              `0`, // Scrap Gold
                                              `0`, // Scrap Tin
                                              `0`, // Raw Emeralds
                                              `0`, // Sand
                                              `0`, // Planks
                                              `0`, // Sawdust
                                              `0`, // Treated Water
                                              `0`, // Refined Aluminium
                                              `0`, // Refined Copper
                                              `0`, // Glass
                                              `0`, // Refined Gold
                                              `0`, // Refined Solder
                                              `${args[2]}`, // Refined Tin
                                              `0`, // Refined Zine
                                              `0`, // Bronze Alloy
                                              `0`, // Refined Amalgam
                                              `${new Date()}` // Date / Time
                                             ]
                                            ]
                                          },
                                        });
                                      }
                                    }

                                    if (args[1] == "rz") {

                                      function listMajors(auth) {
                                         var member = message.mentions.members.first();
                                         const sheets = google.sheets({version: 'v4', auth});
                                          sheets.spreadsheets.values.append({
                                            spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                                            range: 'Cargo History (Do Not Touch)!A2:Y',
                                            valueInputOption: 'USER_ENTERED',
                                            insertDataOption: 'INSERT_ROWS',
                                            resource: {
                                                "values": [
                                                [
                                                `${member.nickname}`,
                                                `${member.user.tag}`,
                                                `${member.id}`, // 144346516998455306
                                                `0`, // Acid
                                                `0`, // Scrap Aluminum
                                                `0`, // Scrap Copper
                                                `0`, // Scrap Lead
                                                `0`, // Scrap Mercury
                                                `0`, // Scrap Gold
                                                `0`, // Scrap Tin
                                                `0`, // Raw Emeralds
                                                `0`, // Sand
                                                `0`, // Planks
                                                `0`, // Sawdust
                                                `0`, // Treated Water
                                                `0`, // Refined Aluminium
                                                `0`, // Refined Copper
                                                `0`, // Glass
                                                `0`, // Refined Gold
                                                `0`, // Refined Solder
                                                `0`, // Refined Tin
                                                `${args[2]}`, // Refined Zine
                                                `0`, // Bronze Alloy
                                                `0`, // Refined Amalgam
                                                `${new Date()}` // Date / Time
                                               ]
                                              ]
                                            },
                                          });
                                        }
                                      }

                                      if (args[1] == "ba") {

                                        function listMajors(auth) {
                                           var member = message.mentions.members.first();
                                           const sheets = google.sheets({version: 'v4', auth});
                                            sheets.spreadsheets.values.append({
                                              spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                                              range: 'Cargo History (Do Not Touch)!A2:Y',
                                              valueInputOption: 'USER_ENTERED',
                                              insertDataOption: 'INSERT_ROWS',
                                              resource: {
                                                  "values": [
                                                  [
                                                  `${member.nickname}`,
                                                  `${member.user.tag}`,
                                                  `${member.id}`, // 144346516998455306
                                                  `0`, // Acid
                                                  `0`, // Scrap Aluminum
                                                  `0`, // Scrap Copper
                                                  `0`, // Scrap Lead
                                                  `0`, // Scrap Mercury
                                                  `0`, // Scrap Gold
                                                  `0`, // Scrap Tin
                                                  `0`, // Raw Emeralds
                                                  `0`, // Sand
                                                  `0`, // Planks
                                                  `0`, // Sawdust
                                                  `0`, // Treated Water
                                                  `0`, // Refined Aluminium
                                                  `0`, // Refined Copper
                                                  `0`, // Glass
                                                  `0`, // Refined Gold
                                                  `0`, // Refined Solder
                                                  `0`, // Refined Tin
                                                  `0`, // Refined Zine
                                                  `${args[2]}`, // Bronze Alloy
                                                  `0`, // Refined Amalgam
                                                  `${new Date()}` // Date / Time
                                                 ]
                                                ]
                                              },
                                            });
                                          }
                                        }

                                        if (args[1] == "amalgam") {

                                          function listMajors(auth) {
                                             var member = message.mentions.members.first();
                                             const sheets = google.sheets({version: 'v4', auth});
                                              sheets.spreadsheets.values.append({
                                                spreadsheetId: '1nahkPciw9SulHoWcADLQZqr-04fSyW3pnrJB5_95xTA',
                                                range: 'Cargo History (Do Not Touch)!A2:Y',
                                                valueInputOption: 'USER_ENTERED',
                                                insertDataOption: 'INSERT_ROWS',
                                                resource: {
                                                    "values": [
                                                    [
                                                    `${member.nickname}`,
                                                    `${member.user.tag}`,
                                                    `${member.id}`, // 144346516998455306
                                                    `0`, // Acid
                                                    `0`, // Scrap Aluminum
                                                    `0`, // Scrap Copper
                                                    `0`, // Scrap Lead
                                                    `0`, // Scrap Mercury
                                                    `0`, // Scrap Gold
                                                    `0`, // Scrap Tin
                                                    `0`, // Raw Emeralds
                                                    `0`, // Sand
                                                    `0`, // Planks
                                                    `0`, // Sawdust
                                                    `0`, // Treated Water
                                                    `0`, // Refined Aluminium
                                                    `0`, // Refined Copper
                                                    `0`, // Glass
                                                    `0`, // Refined Gold
                                                    `0`, // Refined Solder
                                                    `0`, // Refined Tin
                                                    `0`, // Refined Zine
                                                    `0`, // Bronze Alloy
                                                    `${args[2]}`, // Refined Amalgam
                                                    `${new Date()}` // Date / Time
                                                   ]
                                                  ]
                                                },
                                              });
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
    name: 'add',
    description: 'Allows staff to add vouchers to the spreadsheet!',
    usage: 'add [user] [cargo/voucher] [amount]'
};
