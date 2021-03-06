module.exports = {
    name: `suggest`,
    execute(message, args) {
        let adminchannel = client.channels.cache.get(config.channels.admin)
        let suggest = args.join(` `)
        if(!suggest) {
            let embed = new Discord.MessageEmbed()
                .setTitle(`:x: Errore`)
                .setDescription(`Inserisci il suggerimento:\n*\`!suggest [suggerimento]\`*`)
                .setColor(`RED`)
            message.reply({embeds: [embed]}).catch(() => { })
            return
        }
        let embed = new Discord.MessageEmbed()
            .setTitle(`💡Nuovo Suggerimento💡`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setColor(`BLUE`)
            .addField(`⚪Stato:`, `In attesa...`)
            .addField(`🔮Suggerimento:`, suggest.toString())
            .addField(`👤Utente:`, `Nome: **${message.author.username}**\nID: **${message.author.id}**\nTag: ${message.author.toString()}`)
            .setFooter({text: `User ID: ${message.author.id}`})
        let embed2 = new Discord.MessageEmbed()
            .setTitle(`💡Nuovo Suggerimento💡`)
            .setThumbnail(message.author.displayAvatarURL({ dynamic: true }))
            .setColor(`BLUE`)
            .addField(`🔮Suggerimento:`, suggest.toString())
            .setDescription(`Il tuo suggerimento è stato inviato allo staff.\nAttendi che venga approvato.`)
        let button1 = new Discord.MessageButton()
            .setStyle(`SUCCESS`)
            .setLabel(`Approva`)
            .setEmoji(`✅`)
            .setCustomId(`Approva`)
        let button2 = new Discord.MessageButton()
            .setStyle(`DANGER`)
            .setLabel(`Rifiuta`)
            .setEmoji(`❌`)
            .setCustomId(`Rifiuta`)
        let row = new Discord.MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)
        adminchannel.send({embeds: [embed], components: [row]})
        message.reply({embeds: [embed2]}).catch(() => { })
    }
}