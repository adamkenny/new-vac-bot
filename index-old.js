//[[VARIABLES]]

const Discord = require("discord.js");
const client = new Discord.Client();
const config = require("./config.json");

var total_vouchers = 0;
var total_vouchers_str = "Total vouchers";
var rank = "New kids on the block";
var rank_str = "Rank";
var new_kids = "New kids on the block (Level 1)";
var level_2 = "Level 2 Worker";
var level_3 = "Level 3 Worker";
var level_4 = "Level 4 Worker";
var master_worker = "Master Worker";
var owner = "Owner";


var total_vouchers_ghost = 14000;
var total_vouchers_raccoon = 0;
var total_vouchers_eye = 4500;
var total_vouchers_saft = 0;
var total_vouchers_nick = 2250;
var total_vouchers_rainzy = 33000;
var total_vouchers_cookie = 0;
var total_vouchers_sodium = 0;
var total_vouchers_bigshow = 0;
var total_vouchers_hberra = 17000;
var total_vouchers_ananas = 0;

var current_vouchers = total_vouchers;

var updated = false

//[[EVENTS]]

client.on("ready", () => {
  console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} servers.`);
  client.user.setActivity(`<help!`);
});

client.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  client.user.setActivity(`<help!`);
});

client.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
});

client.on('guildMemberAdd', member => {
  const channel = member.guild.channels.find(ch => ch.name === 'join-log');
  if (!channel) return;
  let joinembed = new Discord.RichEmbed()
  .setColor("GREEN")
  .setAuthor(`User joined`)
  .setTimestamp();
  channel.send(joinembed);
  console.log('User' + member.user.username + ' has joined the server')

  var role = member.guild.roles.find("name", "--Normal Tags--");
  var role1 = member.guild.roles.find("name", "Customer");

  member.addRole(role);
  member.addRole(role1);
});

client.on('guildMemberRemove', member=> {
  const channel = member.guild.channels.find(ch => ch.name === 'join-log');
  if (!channel) return;
  let leftembed = new Discord.RichEmbed()
  .setColor("RED")
  .setAuthor(`User left`)
  .setTimestamp();
  channel.send(leftembed);
});




client.on('message', message => {
  var sender = message.member.user.tag
  if (sender ===  "ᵀᵀ ᴿᵃᶜᶜᵒᵒⁿ🗑#0516") {
    total_vouchers = total_vouchers_raccoon;
    rank = owner;
  }
  else if (sender === "HBerrA#1782") {
    total_vouchers = total_vouchers_hberra;
    rank = level_3;
  }
  else if (sender === "GhostEntity#4258") {
    total_vouchers = total_vouchers_ghost;
    rank = level_3;
  }
  else if (sender === "Eyefeatheristic#6676") {
    total_vouchers = total_vouchers_eye;
    rank = level_2;
  }
  else if (sender === "SaftBlandarN#0300") {
    total_vouchers = total_vouchers_saft;
    rank = new_kids;
  }
  else if (sender === "nick#3826") {
    total_vouchers = total_vouchers_nick;
    rank = level_2;
  }
  else if (sender === "rainzy#0001") {
    total_vouchers = total_vouchers_rainzy;
    rank = master_worker;
  }
  else if (sender === "CookieAntonio#5301") {
    total_vouchers = total_vouchers_cookie;
    rank = new_kids;
  }
  else if (sender === "Sodium Chloride#4851") {
    total_vouchers = total_vouchers_sodium;
    rank = new_kids;
  }
  else if (sender === "𝕭𝖎𝖌𝖘𝖍𝖔𝖜#3858") {
    total_vouchers = total_vouchers_bigshow;
    rank = new_kids;
  }
  else if (sender === "YoloAnanas#2639") {
    total_vouchers = total_vouchers_ananas;
    rank = new_kids;
  }
});

client.on('message', message => {
  if (message.content === "<help") {
    message.channel.send({embed: {
        color: 3447003,
        title: "Commands",
        description: "All commands available:",
        fields: [{
            name: "Yeet",
            value: '<yeet: Will return a weird image...'
          },
          {
            name: 'Help',
            value: '<help: I wonder if you are on this right now...'
          },
          {
            name: 'Vouchers',
            value: '<vouchers: If you are a worker, your current vouchers will be displayed.'
          },
          {
            name: 'Ping',
            value: '<ping: Will return your ping.'
          },
          {
            name: 'Say',
            value: '<say: Make the bot say what ever you type, you message will be deleted. (Workers and staff only)'
          },
          {
            name: 'In-game command',
            value: '<bus_info: Will say the command to type in game for the business advertisement.'
          },
          {
            name: 'Coin',
            value: '<coin: Heads or tails?'
          },
          {
            name: 'Add Vouchers',
            value: '<add name amount: Add vouchers to a workers account. (staff only)'
          },
          {
            name: 'Kick',
            value: '<kick name: Duh, it will make an egg. Kicks the specified user. (staff only)'
          },
          {
            name: 'Ban',
            value: '<ban name: Ban the specified user. (staff only)'
          },
          {
            name: 'Delete',
            value: '<delete amount: Will delete the amount of messages you typed. (staff only)'
          }
        ],
        timestamp: new Date(),
        footer: {
          icon_url: client.user.avatarURL,
          text: "© GhostEntity"
        }
      }
    });
  }
});



client.on("message", async message => {
  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();


  if(command === "yeet") {
      const attachment = new Attachment('https://i.imgur.com/IJp4h8w.png');
      message.channel.send(attachment);
      message.delete().catch();
}

if (command === "bus_info") {
  if(!message.member.roles.some(r=>["Worker"].includes(r.name)) )
   return message.reply("You don't have permissions to use this!");
  message.reply("Type this into the ingame chat: /bus Do you want to sit back and relax while other people get your vouchers for you? Do you want your vouchers guaranteed to get to you in preferably a week (maybe a month)? In that case, order from V.C.T today in #mini-ads on TT discord or apply to work for us as well, so you can make the money and be treated how you deserve! ")
}

  if(command === "say") {
    if(!message.member.roles.some(r=>["Worker"].includes(r.name)) )
       return message.reply("You don't have permissions to use this!");
    const sayMessage = args.join(" ");
    message.delete().catch();
    message.channel.send(sayMessage);
}

if (command === "coin") {
  message.reply("I picked " + coin());
}

function coin() {
  return (Math.floor(Math.random() * 2) == 0) ? 'heads!' : 'tails!';
}

  if(command === "kick") {
   if(!message.member.roles.some(r=>["-----------admins------------"].includes(r.name)) )
      return message.reply("You don't have permissions to use this!");


    

  }

  if(command === "ban") {
    if(!message.member.roles.some(r=>["-----------admins------------"].includes(r.name)) )
     return message.reply("You don't have permissions to use this!");

    let member = message.mentions.members.first();
    if(!member)
      return message.reply("Please mention a valid member of this server");
    if(!member.bannable)
      return message.reply("I cannot ban this user!");

    let reason = args.slice(1).join(' ');
    if(!reason) reason = "No reason provided";

    await member.ban(reason)
      .catch(error => message.reply(`Sorry ${message.author} I couldn't ban because of : ${error}`));
    message.reply(`${member.user.tag} has been banned by ${message.author.tag} because: ${reason}`);
  }

  if(command === "delete") {
    if(!message.member.roles.some(r=>["-----------admins------------",].includes(r.name)) )
       return message.reply("You don't have permissions to use this!");
    const deleteCount = parseInt(args[0], 10);

    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");

    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }

});

client.login(config.token);