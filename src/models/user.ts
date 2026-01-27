import { DataTypes, Model } from 'sequelize';
import { hash } from 'bcrypt';

import { sequelize } from '../database/database.ts';
import { UserFriend } from './userFriend.ts';
import { Movie } from './movie.ts';
import { FriendRequest } from './friendRequest.ts';

export class User extends Model {
  declare id: string;
  declare firstName: string;
  declare lastName: string;
  declare email: string;
  declare password: string;
  declare isActive: boolean;
  declare isAdmin: boolean;
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
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
      publicProfile: {
        attributes: ['firstName', 'lastName', 'isActive'],
      },
    },
  },
);

User.belongsToMany(User, {
  through: UserFriend,
  as: 'friends',
  foreignKey: 'userId',
  otherKey: 'friendId',
});

Movie.belongsTo(User, {
  foreignKey: 'createdBy',
  as: 'creator',
});

User.hasMany(Movie, {
  foreignKey: 'createdBy',
  as: 'movies',
});

User.hasMany(FriendRequest, {
  foreignKey: 'senderId',
  as: 'sentFriendRequests',
});

User.hasMany(FriendRequest, {
  foreignKey: 'receiverId',
  as: 'receiverFriendRequests',
});

FriendRequest.belongsTo(User, {
  foreignKey: 'senderId',
  as: 'sender',
});

FriendRequest.belongsTo(User, {
  foreignKey: 'receiverId',
  as: 'receiver',
});
