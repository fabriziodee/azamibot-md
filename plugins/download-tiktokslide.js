import fetch from 'node-fetch'
import { delay,ranNumb } from '../lib/others.js'

let handler = async(m, { conn, text, usedPrefix, command, isPrems }) => {
	if (!text) throw `Example: ${usedPrefix + command} https://vt.tiktok.com/ZS81qJD5v/`
	if (!(text.includes('http://') || text.includes('https://'))) return m.reply(`url invalid, please input a valid url. Try with add http:// or https://`)
	if (!text.includes('tiktok.com')) return m.reply(`Invalid Tiktok URL.`)
	try {
		let res = await fetch(`https://api.lolhuman.xyz/api/tiktokslide?apikey=${apilol}&url=${text}`)
		let anu = await res.json()
		if (anu.status != '200') throw Error(anu.message)
		anu = anu.result
		if (anu.length == 0) throw Error('Error : no data')
		let c = 0, d = anu.length
		if (!isPrems && anu.length > 7) {
			anu = anu.slice(0, 7)
			await conn.reply(m.sender, `_[!] (bukan user premium)_ limit maksimal 6 Slide.`, m)
		}
		for (let x of anu) {
			if (c == 0) await conn.sendFile(m.chat, x, '', `Mengirim 1 dari ${d} slide gambar.\n_(Sisanya akan dikirim via chat pribadi.)_`, m)
			else await conn.sendFile(m.sender, x, '', '', m)
			c += 1
			await delay(isPrems ? ranNumb(700, 1000) : ranNumb(800, 1500))
		}
	} catch (e) {
		console.log(e)
		throw `invalid slideshow url / media isn't available.`
	}
}

handler.menudownload = ['tiktokslide <url>']
handler.tagsdownload = ['search']
handler.command = /^((tt|tiktok)slide)$/i

handler.premium = true
handler.limit = true

export default handler