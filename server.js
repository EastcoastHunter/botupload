const Discord = require('discord.js');
const client = new Discord.Client();

const prefix = '>';
const ownerID = '202563982349959168';
const serverStats = {
    guildID:'',
    totalUsersID: '',
    memberCountID: '',
    bot CountID: ''
};

// Listener events
client.on('message', message => {
    //this is run whenever a new message is created in a channel the bot has access to 
    
    //Variables
    let args = message.content.slice(prefix.length).trim().split(' ');
    let cmd = args.shift().toLowerCase();
    
    // Return Statements
    if (message.author.bot) return;
    if (!message.content.startsWith(prefix)) return;
    
    // command handler
    try{
        //options
        let ops = {
            ownerID: ownerID
        }
        
        let commandFile = require(`./commands/${cmd}.js`);
        commandFile.run(client, message, args);
        
    } catch(e) {// This will catch errors, either within the code or if the command doesn't exist 
        console.log(e.stack);
    }
});

// Ready events
client.on('ready', () => console.log('Launched!'));
// Member Join/Leave events
client.on('guildMemberAdd', member => {
    
    if (member.guild.id !== serverStats.guildID) return;)
    
    //Voice channel Update
    client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.mebers.filter(m => !m.bot).siz}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.bot).size}`);
    
});

client.on('guildMemberRemove', member => {
    
    if (member.guild.id !== serverStats.guildID) return;
    
    //We Also Want the same thing to happen when a member leaves
    client.channels.get(serverStats.totalUsersID).setName(`Total Users : ${member.guild.memberCount}`);
    client.channels.get(serverStats.memberCountID).setName(`Member Count : ${member.guild.mebers.filter(m => !m.bot).siz}`);
    client.channels.get(serverStats.botCountID).setName(`Bot Count : ${member.guild.members.filter(m => m.bot).size}`);
    
});// Now, we can test it
client.login('NTA4NTI0MzAzOTUyNjQyMDQ4.DsNvFg.nw95r-MJ-lFcUtCAh6QtzzIV3pc')
