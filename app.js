const Discord = require("discord.js")
const {RichEmbed} = require('discord.js')
const ping = require('minecraft-server-util')
const {token} = require ("./token.json")
const client = new Discord.Client();
client.login(token)


const prefix = '~';

client.on("ready", () => {
    console.log(`Logged in as ${client.user.tag}!`)
//    client.user.setActivity("Created by Laythumm").catch(console.error);

    ping('mc.celestial-mc.com', 25565, (error, response) => {
        client.user.setActivity("Online Players: " + response.onlinePlayers)
    })
})




client.on('message', message =>{

    let args = message.content.substring(prefix.length).split(' ')

    switch(args[0]){
        case'mc':
            ping('mc.celestial-mc.com', 25565 ,(error, response) =>{
                if (error) throw error
                const Embed = new Discord.MessageEmbed()
                .setTitle('Server Status')
                .addField('Server IP', response.host)
                .addField('Server Version', response.version)
                .addField('Online Players', response.onlinePlayers)                
                .addField('Max Players', response.maxPlayers)

               // console.log(response)

                message.channel.send(Embed)
            })
        break
    }
})




// Commands
client.on('message' , message =>{
    if(!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'ping'){
        message.channel.send('u have no life, pleb');
    } else if (command === 'embed'){
        message.channel.send(embed())
    };

});


