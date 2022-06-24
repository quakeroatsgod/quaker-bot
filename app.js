// Require the necessary discord.js classes
const { Client, Intents, Interaction } = require('discord.js');
const { token,clientId,pingMattChannelId,mattId } = require('./config.json');
// Create a new client instance
const client = new Client({ intents: ["GUILDS", "GUILD_MESSAGES", "DIRECT_MESSAGES"] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
	console.log(`Bot app is running as ${client.user.tag}`);
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
    console.log(`Message sent by ${message.author.tag}. Content <${message.content}>`);
    //Base case, bot shouldn't worry about its own message
    if(message.author.id===clientId) return;
    //If the message was sent in #ping-matt-here
    if(message.channel.id===pingMattChannelId)  return message.channel.send(`<@${mattId}>`)
});



// Login to Discord with your client's token
client.login(token);

