import { DataTypes, Sequelize } from 'sequelize';

export class PostgresqlConfig {

    db;
    userModel;

    constructor() {
        this.db = this.initializeDatabaseConnection();
        this.userModel = this.defineUserTable();
    }

    /**
     * Initializes database connection and creates user table if necessary
     */
    initializeDatabaseConnection() {
        const db = new Sequelize(process.env.CONNECTION_STRING);
        db.sync().then(() => console.log('Connected to database')).catch(err => console.error(err));
        return db;
    }

    /**
     * Defines the user table
     */
    defineUserTable() {
        return this.db.define('user', { 
            id: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false
            },
            name: {
                type: DataTypes.STRING,
                allowNull: false
            },
            surname: {
                type: DataTypes.STRING,
                allowNull: false
            },
            avatar: {
                type: DataTypes.STRING,
                allowNull: true,
            }
        });
    }
}