import { DataTypes, Model, Optional, Sequelize } from 'sequelize'

export type Attributes = {
    userId: number
    resourceId: number | string
    resourceType: string
    createdAt: Date
    updatedAt: Date
}

export type CreationAttributes = Optional<
    Attributes,
    'createdAt' | 'updatedAt' | 'userId'
>

export class Checkout extends Model<Attributes, CreationAttributes> {
    static associate(models: Sequelize['models']) {
        this.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'userId'
        })
    }
}

export default function init(sequelize: Sequelize) {
    Checkout.init(
        {
            resourceId: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                allowNull: false
            },
            resourceType: {
                type: DataTypes.STRING,
                primaryKey: true,
                allowNull: false
            },
            userId: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'user',
                    key: 'id'
                }
            },
            createdAt: DataTypes.DATE,
            updatedAt: DataTypes.DATE
        },
        {
            // @ts-expect-error sequelize is being janky and says its not compatible, idk why but it is
            sequelize,
            modelName: 'checkout',
            tableName: 'checkout'
        }
    )

    return Checkout
}
