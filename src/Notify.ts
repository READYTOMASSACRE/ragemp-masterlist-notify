import MasterlistAPI from "./MasterlistAPI"
import TgAPI from "./TgAPI"

export default async ({ rage_ip, tg_message, tg_bot }: {
    rage_ip: string
    tg_message: string
    tg_bot: string
}) => {
    try {
        const tgApi = new TgAPI(tg_bot)
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