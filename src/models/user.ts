import { DataTypes, Model } from 'sequelize';
import { hash } from 'bcrypt';

import { sequelize } from '../database/database.ts';

export class User extends Model {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: [8, 32],
      },
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'users',

    hooks: {
      beforeCreate: async (user: User) => {
        user.password = await hash(user.password, 10);
      },

      beforeUpdate: async (user: User) => {
        user.password = await hash(user.password, 10);
      },
    },

    defaultScope: {
      attributes: { exclude: ['password'] },
    },
    scopes: {
      withPassword: {
        attributes: { exclude: [] },
      },
    },
  }
);
