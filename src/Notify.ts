import MasterlistAPI from "./MasterlistAPI"
import TgAPI from "./TgAPI"

export default async ({ rage_ip, tg_message, tg_bot, tg_chat_id }: {
    rage_ip: string
    tg_message: string
    tg_bot: string
    tg_chat_id?: string
}) => {
    try {
        const tgApi = new TgAPI(tg_bot, tg_chat_id)
        const exists = await MasterlistAPI.isExists(rage_ip)

        if (!exists) {
            tgApi.push(tg_message.replace(':rage', rage_ip))
        }

        const now = new Date().toTimeString().split(' ')[0];
        
        console.log(
            `[${now}]: Server is alive...${rage_ip}: [${exists ? 'Alive': 'Not alive'}]`
        )
    } catch (err) {
        console.error(err)
    }
}