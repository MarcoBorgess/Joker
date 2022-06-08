const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();

const TOKEN = 'OTgzODgyMTg1NDM2MTc2NDM0.Go5lA1.6vDvWnqfltCKZepbmzd7mlHUtedF4FjAgFJf5c';
var prefix = "$";

client.on('ready', () => {
    console.log('I am ready!');
});
client.on('message', async message => {
    if(!message.content.startsWith(prefix)){
        return;
    }
    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLocaleLowerCase();

    if (command === "carta" || command === "c" || command === "card") {
        const data = axios({
            url: 'https://deckofcardsapi.com/api/deck/new/draw/?count=1',
            headers: {'accept': 'application/json'}
        }).then((result) => {
            message.channel.send(result.data.cards[0].image);
        }).catch((error) => {
            console.log(error);
        })
    }

    if (command === "b" || command === "baralho" || command === "deck" || command === "d") {
        const data = axios({
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
            headers: {'accept': 'application/json'}
        }).then((result) => {
            message.channel.send(`Código do seu baralho: \n\n${result.data.deck_id}`);
        }).catch((error) => {
            console.log(error);
        })
    }

    if (command === "p" || command === "poker") {
        const data = axios({
            url: `https://deckofcardsapi.com/api/deck/${args}/draw/?count=1`,
            headers: {'accept': 'application/json'}
        }).then((result) => {
            const embed = new Discord.MessageEmbed()
                .setImage(result.data.cards[0].image)
                .setDescription(`Cartas restantes no baralho: ${result.data.remaining}`);
            message.reply(embed);
        }).catch((error) => {
            console.log(error);
        })
    }
}
);

client.login(TOKEN);