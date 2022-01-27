module.exports = {
    name: `interactionCreate`,
    execute(interaction) {
        if(interaction.customId != `Approva`) return
        let user = interaction.user
        let message = interaction.message
        let id = message.embeds[0].footer.text.slice(9)
        let utenteembed = client.users.cache.get(id)
        let embedtitle = message.embeds[0].title
        let suggest = message.embeds[0].fields[1].value
        let utente = message.embeds[0].fields[2].value
        let thumbnail = message.embeds[0].thumbnail.url
        let embeddm = new Discord.MessageEmbed()
            .setTitle(`Suggerimento Accettato`)
            .setColor(`GREEN`)
            .setDescription(`Il tuo suggerimento:\n**${suggest}**\nè stato accettato da ${user.username}`)
        utenteembed.send({embeds: [embeddm]}).catch(() => {})
        let embedsuggestion = new Discord.MessageEmbed()
            .setTitle(`💡Nuovo Suggerimento da ${utenteembed.username}💡`)
            .setThumbnail(utenteembed.displayAvatarURL({dynamic: true}))
            .addField(`🔮Suggerimento:`, suggest.toString())
            .setDescription(`Usa le reazioni "👍" e "👎" per votare il suggerimento!\n**ATTENZIONE**:\nPuoi premere una sola reazione.`)
            .setColor(`BLUE`)
        let suggestchannel = client.channels.cache.get(config.channels.suggestions)
        suggestchannel.send({embeds: [embedsuggestion]}).then(msg => {
            msg.react(`👍`)
            msg.react(`👎`)
        })
        let embed = new Discord.MessageEmbed()
            .setTitle(embedtitle.toString())
            .setThumbnail(thumbnail)
            .setColor(`GREEN`)
            .addField(`✅Stato:`, `Accettato da **${user.username}**`)
            .addField(`🔮Suggerimento:`, suggest)
            .addField(`👤Utente:`, utente)
            .setFooter({text: `User ID: ${id}`})
        let button1 = new Discord.MessageButton()
            .setStyle(`SUCCESS`)
            .setLabel(`Approva`)
            .setEmoji(`✅`)
            .setCustomId(`Approva`)
            .setDisabled()
        let button2 = new Discord.MessageButton()
            .setStyle(`DANGER`)
            .setLabel(`Rifiuta`)
            .setEmoji(`❌`)
            .setCustomId(`Rifiuta`)
            .setDisabled()
        let row = new Discord.MessageActionRow()
            .addComponents(button1)
            .addComponents(button2)
        interaction.update({embeds: [embed], components: [row]})
    }
}