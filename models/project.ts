import {Model, Table, Column, DataType, ForeignKey, BelongsTo} from 'sequelize-typescript'
import { User } from "@/models/user";

export const PROJECT_TYPES = ['SEARCH', 'EVENT'] as const
export type ProjectType = typeof PROJECT_TYPES[number]

@Table
export class Project extends Model {
    @ForeignKey(() => User)
    @Column
    ownerId!: number

    @BelongsTo(() => User, 'ownerId')
    owner?: User

    @Column
    companyId!: number

    @Column
    name!: string

    @Column({
        type: DataType.STRING,
        validate: {
            isIn: {
                args: [PROJECT_TYPES],
                msg: `project type must be one of: ${PROJECT_TYPES.join(', ')}`
            }
        }
    })
    projectType!: ProjectType

    @Column(DataType.VIRTUAL)
    get isEvent(): boolean {
        return this.projectType === 'EVENT'
    }

    @Column(DataType.ARRAY(DataType.STRING))
    location?: string[]

    @Column({
        defaultValue: () => "rando"
    })
    attendanceCode!: string
}
