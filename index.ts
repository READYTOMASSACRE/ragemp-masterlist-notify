require('dotenv').config();

import Notify from "./src/Notify"
import { schedule } from 'node-cron'

(() => {
    const crontab = process.env.crontab ?? '0 */1 * * *'

    schedule(crontab, () => Notify({
        rage_ip: process.env.rage_ip,
        tg_message: process.env.tg_message,
        tg_bot: process.env.tg_bot,
        tg_chat_id: process.env.tg_chat_id,
    }))

    console.log('Package "rage-masterlist-notify" has started')
    console.log('Cron registered: ' + crontab)
})()