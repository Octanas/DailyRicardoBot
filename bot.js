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
        // If bot is mentioned, it will send a message from a set of messages
        if (message.mentions.has(client.user, { ignoreRoles: true, ignoreEveryone: true })) {
            // Probability of sending special message
            const specialMsg = Math.random();

            // 5% of probability of being sent
            if (specialMsg >= 0.95) {
                message.channel.send('**RICARDO** POLKA TIME!', { files: ['lib/ricardo_polka.mp4'] });
                return;
            }

            // 15% of probability of being sent
            if (specialMsg >= 0.85) {
                message.channel.send('HEEERE\'S **RICARDO**!', { files: ['lib/heres_ricardo.jpg'] });
                return;
            }

            // 25% of probability of being sent
            if (specialMsg >= 0.75) {
                message.channel.send('**RIPCARDO**', { files: ['lib/ripcardo.png'] });
                return;
            }

            // 30% of probability of being sent
            if (specialMsg >= 0.7) {
                message.channel.send('I\'m sorry, Ricardo is in another castle...');

                // Messages are delayed
                setTimeout(function () {
                    message.channel.send('JK, **RICARDO** IS HERE!!!');
                    sendRicardoEmoji(message.channel, 3);
                }, 10000);

                return;
            }

            const responseMsgs = [
                'Alguém chamou o **RICARDO**???',
                'Sou eu, o **RICARDO**!',
                'It\'s-a me, **RICARDO**!',
                '**RICARDO** IS IN THE HOOOOUSE!',
            ]

            // Random index to access array of messages
            const randomMsg = Math.floor(Math.random() * responseMsgs.length);

            message.channel.send(responseMsgs[randomMsg]);

            sendRicardoEmoji(message.channel, 1);

            return;
        }

        const lowerCaseMsg = message.content.toLowerCase();

        // Remove repeated consecutive letters (ex.: riiiicardo -> ricardo)
        const noRepeatConsecMsg = lowerCaseMsg.replace(/(.)\1+/g, '$1');

        if (noRepeatConsecMsg.includes('ricardo')
            || noRepeatConsecMsg.includes('ricardinho')
            || noRepeatConsecMsg.includes('ricardao')) {
            sendRicardoEmoji(message.channel, 1);
        }
    }
});

function sendRicardoEmoji(channel, number) {
    const ricardoEmoji = client.emojis.cache.find(emoji => emoji.name === "pinto");

    if (ricardoEmoji === undefined) {
        channel.send('You don\'t have the Ricardo emoji. **SHAME**');
        channel.send('Add an emoji with tag \`:pinto:` and you\'ll be good to go.');
    } else {
        for (let i = 0; i < number; i++) {
            channel.send(`${ricardoEmoji}`);
        }
    }
}

const scheduledMessage = new cron.CronJob('00 00 22 * * *', () => {
    // This runs every day at 22:00
    client.channels.fetch(process.env.CHANNEL_ID)
        .then(channel => {
            channel.send('**Hora do Ricardo**');
            sendRicardoEmoji(channel, 1);
        });
});

client.login(process.env.BOT_TOKEN);

if (process.env.CHANNEL_ID) {
    scheduledMessage.start();
}