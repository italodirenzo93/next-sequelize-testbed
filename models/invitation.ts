import { Model, Table, Column } from 'sequelize-typescript'
import { isPast } from "date-fns";

@Table
export class Invitation extends Model {
    @Column({ unique: true })
    code!: string

    @Column
    sentBy?: string

    @Column
    sentTo?: string

    @Column
    expiresOn!: Date

    @Column
    salesforceId?: string

    @Column
    type!: string

    get isExpired() {
        return isPast(this.expiresOn)
    }

    get isMultiUse() {
        return this.type === 'multi_use'
    }
}
