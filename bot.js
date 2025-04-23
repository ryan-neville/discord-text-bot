const { Client, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('messageCreate', async (message) => {
    if (message.author.bot) return;

    // Check if the message contains an attachment
    if (message.attachments.size > 0) {
        message.attachments.forEach((attachment) => {
            if (attachment.name.endsWith('.txt')) {
                // Download the .txt file
                fetch(attachment.url)
                    .then((res) => res.text())
                    .then((text) => {
                        // Send the content of the .txt file as a message
                        message.channel.send(`Content of ${attachment.name}:\n${text}`);
                    })
                    .catch((err) => {
                        console.error('Error reading the .txt file:', err);
                        message.channel.send('Failed to read the .txt file.');
                    });
            }
        });
    }
});

client.login(process.env.DISCORD_TOKEN);
