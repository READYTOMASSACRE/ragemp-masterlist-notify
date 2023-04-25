import { request, get } from 'https'

export default class TgAPI {
    readonly hostname: string = 'api.telegram.org'

    constructor(readonly token: string) {}

    async push(text: string) {
        const chat_id = await this.getChatId()

        if (!chat_id) return

        return this.post(
            `/bot${process.env.tg_bot}/sendMessage`,
            JSON.stringify({ chat_id, text })
        )
    }

    async getChatId(): Promise<number | undefined> {
        const response = await this.get(`/bot${process.env.tg_bot}/getUpdates`)
        const [{
            message: {
                chat: {
                    id = undefined
                } = {}
            } = {}
        } = {}] = response?.result || []

        return id
    }

    private post(path: string, data: string) {
        return new Promise((resolve, reject) => {
            const req = request(this.options(path, 'POST', data), (response) => {
                let data = ''
                response.on('data', chunk => data += chunk)
                response.on('end', () => resolve(data))
                response.on('error', (err) => reject(err))
            })

            req.write(data)
            req.end()
        })
    }

    private async get(path: string) {
        return new Promise<any>((resolve, reject) => {
            get(`https://${this.hostname}${path}`, (response) => {
                let data = ''
    
                response.on('data', chunk => data += chunk)
                response.on('end', () => {
                    try {
                        resolve(JSON.parse(data))
                    } catch (err) {
                        reject(err)
                    }
                })
            }).on('error', err => reject(err))
        })
    }

    private options(path: string, method: string = 'GET', data?: string) {
        return {
            hostname: this.hostname,
            path,
            port: 443,
            method,
            ...(
                data?.length ? {
                    headers: {
                        'Content-Type': 'application/json',
                        'Content-Length': data.length,
                    }
                } : {}
            )
        }
    }
}