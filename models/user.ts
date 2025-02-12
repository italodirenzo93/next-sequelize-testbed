import {Model, Table, Column, HasMany} from 'sequelize-typescript'
import { Project } from "@/models/project";

@Table({ paranoid: true })
export class User extends Model {
    @Column
    name?: string

    @Column
    companyName?: string

    @Column({ unique: true })
    email!: string

    @Column
    lastActiveAt?: Date

    @HasMany(() => Project, 'ownerId')
    projects!: Project[]
}
