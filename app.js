// Require the necessary discord.js classes
const { Client, Intents, Interaction } = require('discord.js');
const { token,clientId,pingMattChannelId,mattId } = require('./config.json');
// Create a new client instance
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

// When the client is ready, run this code (only once)
client.once('ready', (client) => {
	console.log(`Bot app is running as ${client.user.tag}`);
    //Gets the the current hours from today
    var hours = new Date().getHours();
    var welcomeMattMessage=``
    //Changes the login message to ping matt based on the time of day
    if(hours > 3 && hours < 12)     welcomeMattMessage=`Good morning <@${mattId}>`
    else if(hours > 11 && hours < 18)   welcomeMattMessage=`Good afternoon <@${mattId}>`
    else if(hours > 17 || hours < 4)  welcomeMattMessage=`Good evening <@${mattId}>`
    //Sends a message to the cursed channel
    client.channels.cache.get(pingMattChannelId).send(welcomeMattMessage);
});

//Commands using "/command"
client.on('interactionCreate', async interaction => {
    console.log(interaction.user.id)
    if(interaction.isCommand()){
        const { commandName } = interaction;
        if(commandName === 'ping'){
            await interaction.reply('Pong!');
        }
    }
});
//Event handler when a message is sent
client.on('messageCreate', async (message) => {
    var date=new Date();
    console.log(`MESSAGE SENT BY ${message.author.tag} AT ${date.getHours()}:${date.getMinutes()}. CONTENT <${message.content}>`);
    //Base case, bot shouldn't worry about its own message
    if(message.author.id===clientId) return;
    //If the message was sent in #ping-matt-here
    if(message.channel.id===pingMattChannelId)  return message.channel.send(`<@${mattId}>`)
    if(message.author.id==mattId)   {
        if(Math.random() % 20 === 1){
            message.delete()
            return message.channel.send(`lmao`)
        }
    }
});



// Login to Discord with your client's token
client.login(token);

