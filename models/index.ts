import { ModelCtor, Sequelize, SequelizeOptions } from "sequelize-typescript"
import { Invitation } from "./invitation";
import { Project } from './project'
import { User } from './user'

export const config: SequelizeOptions = {
    "username": "postgres",
    "password": "postgres",
    "database": "boardportal_development",
    "host": "127.0.0.1",
    "dialect": "postgres",
    "define": {
        "underscored": true
    }
}

export const db = new Sequelize({
    ...config,
    models: [Invitation, Project, User]
})

// sequelize.addModels([
//     Invitation,
//     Project,
//     User
// ])

declare module 'sequelize' {
    // @ts-expect-error suppressing unused symbol because we are declaration merging
    export class Sequelize {
        public readonly models: {
            Invitation: ModelCtor<Invitation>
            Project: ModelCtor<Project>
            User: ModelCtor<User>
        }
    }
}

export {
    Invitation,
    Project,
    User
}
