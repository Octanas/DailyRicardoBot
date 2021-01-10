const cron = require("cron");
const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    const lowerCaseMsg = message.content.toLowerCase();

    // Remove repeated consecutive letters (ex.: riiiicardo -> ricardo)
    const noRepeatConsecMsg = lowerCaseMsg.replace(/(.)\1+/g, '$1');

    if (noRepeatConsecMsg.includes('ricardo')
        || noRepeatConsecMsg.includes('ricardinho')) {
        message.channel.send('<:pinto:795825395563364362>');
    }
});

const scheduledMessage = new cron.CronJob('00 00 22 * * *', () => {
    // This runs every day at 22:00
    client.channels.get(process.env.CHANNEL_ID).send('**Hora do Ricardo**');
    client.channels.get(process.env.CHANNEL_ID).send('<:pinto:795825395563364362>');
});

client.login(process.env.BOT_TOKEN);

if (process.env.CHANNEL_ID) {
    scheduledMessage.start();
}