let handler = async (m, { conn, text }) => {
    if (!text) throw 'Siapa yang mau di banned?'
    let who
    if (m.isGroup) who = m.quoted ? m.quoted.sender : m.mentionedJid[0]
    else who = m.chat
    if (!who) throw 'Tag salah satu lah'
    try {
        let users = global.db.data.users
        users[who].banned = true
        conn.reply(m.chat, `berhasil banned`, m)
    } catch (e) {
        console.log(e)
        m.reply(`User tidak ada dalam database.`)
    }
}

handler.menugroup = ['ban @tag']
handler.tagsgroup = ['owner']
handler.command = /^(ban(user)?)$/i

handler.owner = true

export default handler