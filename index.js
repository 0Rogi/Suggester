global.Discord = require(`discord.js`)
global.fs = require(`fs`)
global.client = new Discord.Client({ intents: 32767, partials: ['MESSAGE', 'CHANNEL', 'REACTION'], allowedMentions: { repliedUser: false }  })
global.config = require(`./JSON/config`)
client.login(process.env.token)

//!Command Handler
client.commands = new Discord.Collection();

const commandsFiles = fs.readdirSync(`./commands`).filter(file => file.endsWith(`.js`));
for (const file of commandsFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

const commandsFolder = fs.readdirSync(`./commands`);
for (const folder of commandsFolder) {
    const commandsFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith(`.js`));
    for (const file of commandsFiles) {
        const command = require(`./commands/${folder}/${file}`);
        client.commands.set(command.name, command);
    }
}

//!Event Handler
const eventsFolders = fs.readdirSync('./events');
for (const folder of eventsFolders) {
    const eventsFiles = fs.readdirSync(`./events/${folder}`)

    for (const file of eventsFiles) {
        if (file.endsWith(`.js`)) {
            const event = require(`./events/${folder}/${file}`);
            client.on(event.name, (...args) => event.execute(...args));
        }
        else {
            const eventsFiles2 = fs.readdirSync(`./events/${folder}/${file}`)
            for (const file2 of eventsFiles2) {
                const event = require(`./events/${folder}/${file}/${file2}`);
                client.on(event.name, (...args) => event.execute(...args));
            }
        }
    }
}

//!Commands Check
client.on(`messageCreate`, message => {
    const prefix = config.prefix;

    if (!message.content.startsWith(prefix) || message.author.bot || !message.guild) return

    const args = message.content.toLowerCase().slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (!client.commands.has(command) && !client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))) return

    var comando = client.commands.get(command) || client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(command))

    comando.execute(message, args);
})
