const Discord = require('discord.js');
const axios = require('axios');
const client = new Discord.Client();

const TOKEN = process.env.BOT_TOKEN
var prefix = "$";
var baralho = "2ylp40zxgtcc";

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

    if (command === "baralhoNovo") {
        const data = axios({
            url: 'https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1',
            headers: {'accept': 'application/json'}
        }).then((result) => {
            message.channel.send(`Código do seu baralho: \n\n${result.data.deck_id}`);
            baralho = result.data.deck_id;
        }).catch((error) => {
            console.log(error);
        })
    }

    if (command === "r" || command === "reset") {
        const data = axios({
            url: `https://deckofcardsapi.com/api/deck/${baralho}/shuffle/`,
            headers: {'accept': 'application/json'}
        }).then((result) => {
            message.channel.send(`Baralho RESETADO\nCódigo do baralho: \n\n${result.data.deck_id}`);
        }).catch((error) => {
            console.log(error);
        })
    }


    if (command === "p" || command === "poker") {
        const data = axios({
            url: `https://deckofcardsapi.com/api/deck/${baralho}/draw/?count=1`,
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