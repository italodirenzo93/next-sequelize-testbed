//@ ts-check

import Sequelize from "sequelize";
import addMonths from 'date-fns/addMonths'
// const Sequelize = require('sequelize')
// const addMonths = require('date-fns/addMonths')

/**
 * @typedef {'CANDIDATE_TECH' | 'CANDIDATE_EXEC' | 'CANDIDATE_BOARD' | 'CANDIDATE_COACH' | 'CANDIDATE_STUDENT'} CandidateRole
 */

/**
 * @typedef {'RECRUITER_TECH' | 'RECRUITER_EXEC' | 'RECRUITER_BOARD' | 'RECRUITER_COACH'} RecruiterRole
 */

/**
 * @typedef {CandidateRole | RecruiterRole | 'MOC_CREATOR' | 'ADMIN' | 'TALENT_PARTNER_TECH' | 'TALENT_PARTNER_EXEC' | 'DEACTIVATED_RECRUITER' | 'RECRUIT_PORTFOLIO' | 'RECRUIT_SEARCH_PARTNER'} UserRoleValue
 */

/**
 * @typedef {object} UserRole
 * @property {number} user_id
 * @property {UserRoleValue} role
 */

/**
 * @param {import('sequelize').Sequelize} sequelize
 * @returns {*}
 */
export default (sequelize) => {
    const UserRole = sequelize.define(
        'user_role',
        {
            user_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                references: {
                    model: 'users',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'CASCADE'
            },
            role: {
                primaryKey: true,
                type: Sequelize.ENUM(
                    'CANDIDATE_TECH',
                    'CANDIDATE_EXEC',
                    'CANDIDATE_BOARD',
                    'CANDIDATE_COACH',
                    'CANDIDATE_STUDENT',
                    'RECRUITER_TECH',
                    'RECRUITER_EXEC',
                    'RECRUITER_BOARD',
                    'RECRUITER_COACH',
                    'MOC_CREATOR',
                    'ADMIN',
                    'TALENT_PARTNER_TECH',
                    'TALENT_PARTNER_EXEC',
                    'RECRUIT_PORTFOLIO',
                    'RECRUIT_SEARCH_PARTNER'
                )
            },
            foo: {
                type: Sequelize.VIRTUAL,
                get() {
                    return addMonths(new Date(), 6)
                }
            }
        },
        {
            timestamps: false
        }
    )

    UserRole.belongsTo(sequelize.models.User, {
        foreignKey: 'user_id',
        targetKey: 'id'
    })

    return UserRole
}
