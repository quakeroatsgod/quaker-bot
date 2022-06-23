// Require the necessary discord.js classes
const { Client, Intents, Interaction } = require('discord.js');
const { token } = require('./config.json');
// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

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

client.on('message', (message) => {
    console.log('aaff')
    if(message.user.id!="142381065485418496"){
        message.reply('aa!');
    }
});



// Login to Discord with your client's token
client.login(token);
