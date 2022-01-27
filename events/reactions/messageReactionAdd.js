module.exports = {
    name: "messageReactionAdd",
    async execute(messageReaction, user) {
        if(messageReaction.message.channel.id != config.channels.suggestions || user.bot) return
        try {
            var userUp = (await messageReaction.message.reactions.cache.find(x => x._emoji.name == "👍").users.fetch()).map(user => user.id)
            var userDown = (await messageReaction.message.reactions.cache.find(x => x._emoji.name == "👎").users.fetch()).map(user => user.id)
            if(messageReaction._emoji.name == `👍` && userDown.includes(user.id)) return messageReaction.users.remove(user)
            if(messageReaction._emoji.name == `👎` && userUp.includes(user.id)) return messageReaction.users.remove(user)
        } catch {

        }
    }
}