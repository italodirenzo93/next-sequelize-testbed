import { ModelCtor, Sequelize, SequelizeOptions } from "sequelize-typescript"
import { ModelStatic as OriginalModelStatic } from "sequelize"
import { Invitation } from "@/models/invitation";
import { Project } from '@/models/project'
import { User } from '@/models/user'
import checkoutModel, { Checkout } from "@/models/checkout"
import userRoleModel from "@/models/user_role"

export const config: SequelizeOptions = {
    username: "postgres",
    password: "postgres",
    database: "boardportal_development",
    host: "127.0.0.1",
    dialect: "postgres",
    define: {
        underscored: true
    },
    models: [Invitation, Project, User]
}

export const sequelize = new Sequelize(config)

// sequelize.addModels([
//     Invitation,
//     Project,
//     User
// ])

// Register non-decorated models
checkoutModel(sequelize)
const UserRole = userRoleModel(sequelize)

declare module 'sequelize' {
    // @ts-expect-error suppressing unused symbol because we are declaration merging
    export class Sequelize {
        public readonly models: {
            Invitation: ModelCtor<Invitation>
            Project: ModelCtor<Project>
            User: ModelCtor<User>
            checkout: OriginalModelStatic<Checkout>
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            user_role: OriginalModelStatic<any>
        }
    }
}

// Re-export model classes
export {
    Invitation,
    Project,
    User,
    Checkout,
    UserRole
}
