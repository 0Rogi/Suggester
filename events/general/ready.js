module.exports = {
    name: `ready`,
    execute() {
        console.clear()
        console.log(`Bot Online`)
        client.user.setActivity(`!suggest`)
    }
}