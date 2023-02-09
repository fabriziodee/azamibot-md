import fetch from 'node-fetch'

let handler = async(m, { conn, text, usedPrefix, command }) => {
	if (!text) throw `*Usage : ${usedPrefix + command} smule_url_media*\n\nExample :\n${usedPrefix + command} https://www.smule.com/recording/lewis-capaldi-someone-you-loved/2027750707_2937753991`
	if (!(text.includes('http://') || text.includes('https://'))) throw `url invalid, please input a valid url. Try with add http:// or https://`
	try {
		let anu = await fetch(`https://api.lolhuman.xyz/api/smule?apikey=${apilol}&url=${text}`)
		let json = await anu.json()
		await conn.sendFile(m.chat, json.result.video, '', json.result.title, m)
	} catch (e) {
		console.log(e)
		m.reply(`Invalid Smule url.`)
	}
}

handler.menudownload = ['smulevideo <url>']
handler.tagsdownload = ['search']
handler.command = /^(smule(mp4|video))$/i

handler.premium = true
handler.limit = true

export default handler