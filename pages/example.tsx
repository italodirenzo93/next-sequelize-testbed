import {Project, User} from "@/models"

type Proj = {
    id: number
    name: string
    ownerId: number
    ownerName: string
}

export default function Example({ data = [] }: { data: Proj[] }) {
    return <div>
        <h1>Hello there!</h1>
        <ol>
            {data.map((d, i) => <li key={i}>{d.id}, {d.name}, {d.ownerId}, {d.ownerName}</li>)}
        </ol>
    </div>
}


export async function getServerSideProps() {
    const stuff = await Project.findAll({
        order: ['name'],
        limit: 3,
        include: [User]
    })

    return {
        props: {
            data: stuff.map<Proj>(p => ({
                id: p.id,
                name: p.name,
                ownerId: p.ownerId,
                ownerName: p.owner?.name || 'he has no name',
            }))
        }
    }
}
