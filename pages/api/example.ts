import {NextApiRequest, NextApiResponse} from "next";
import { sequelize } from '@/models'

type Proj = {
    id: number
    name: string
    ownerId: number
    ownerName: string
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    const stuff = await sequelize.models.Project.findAll({
        order: ['name'],
        limit: 3,
        include: [sequelize.models.User]
    })

    const r = stuff.map<Proj>(p => ({
        id: p.id,
        name: p.name,
        ownerId: p.ownerId,
        ownerName: p.owner?.name || 'he has no name',
    }))

    res.json(r)
}
