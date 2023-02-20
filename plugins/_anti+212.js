import db from '../lib/database.js'

export async function before(m, { isAdmin, isPrems, isBotAdmin }) {
		if (m.sender.startsWith('91') || m.sender.startsWith('92')) {
			try {
				db.data.users[m.sender].banned = true
			} catch (e) {
				console.log(e)
			}
		}
	return !0
}
