import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../database/database.ts';

export class FriendRequest extends Model {
  declare id: string;
  declare senderId: string;
  declare receiverId: string;
  declare status: 'PENDING' | 'ACCEPTED' | 'REJECTED';
}

FriendRequest.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    senderId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    receiverId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
      defaultValue: 'PENDING',
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    tableName: 'friend_requests',
    indexes: [{ unique: true, fields: ['sender_id', 'receiver_id'] }],
  }
);
