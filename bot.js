const cron = require('cron');
const Discord = require('discord.js');
const client = new Discord.Client();

require('dotenv').config();

client.on('ready', () => {
    console.log('I am ready!');
});

client.on('message', message => {
    // If the message was sent by this bot, ignore
    if (message.author.id !== client.user.id) {
        if (message.isMemberMentioned(client.user)) {
            const specialMsg = Math.random();

            if (specialMsg >= 0.8) {
                message.channel.send('I\'m sorry, Ricardo is in another castle...');

                setTimeout(function () {
                    message.channel.send('JK, **RICARDO** IS HERE!!!');

                    for(let i = 0; i < 3; i++) {
                        message.channel.send('<:pinto:795825395563364362>');
                    }
                }, 10000);

                return;
            }

            const responseMsgs = [
                'Alguém chamou o **RICARDO**???',
                'Sou eu, o **RICARDO**!',
                'It\'s-a me, **RICARDO**!',
            ]

            const randomMsg = Math.floor(Math.random() * responseMsgs.length);

            message.channel.send(responseMsgs[randomMsg]);
            message.channel.send('<:pinto:795825395563364362>');
        } else {
            const lowerCaseMsg = message.content.toLowerCase();

            // Remove repeated consecutive letters (ex.: riiiicardo -> ricardo)
            const noRepeatConsecMsg = lowerCaseMsg.replace(/(.)\1+/g, '$1');

            if (noRepeatConsecMsg.includes('ricardo')
                || noRepeatConsecMsg.includes('ricardinho')
                || noRepeatConsecMsg.includes('ricardao')) {
                message.channel.send('<:pinto:795825395563364362>');
            }
        }
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