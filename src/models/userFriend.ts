import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database/database.ts';

export class UserFriend extends Model {
  declare userId: string;
  declare friendId: string;
}

UserFriend.init(
  {
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    friendId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    sequelize,
    tableName: 'user_friends',
    timestamps: true,
    underscored: true,
  }
);
