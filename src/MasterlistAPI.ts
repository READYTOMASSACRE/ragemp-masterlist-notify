import { get } from 'https'

type Item = {
    name: string
    gamemode: string
    url: string
    lang: string
    players: number
    peak: number
    maxplayers: number
}

type List = Record<string, Item>

export default new class MasterlistAPI {
    private api: string = 'https://cdn.rage.mp/master/'

    async isExists(ip: string): Promise<Item | undefined> {
        const list = await this.list()

        return (await this.list())?.[ip]
    }

    list() {
        return new Promise<List>((resolve, reject) => {
            get(this.api, (response) => {
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
}