import { DataTypes, Model, type Optional } from 'sequelize';

import { sequelize } from '../database/database.ts';

interface MovieAttributes {
  id: string;
  title: string;
  genre: string;
  durationMinutes: number;
  isActive: boolean;
  createdBy: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface MovieCreationAttributes extends Optional<
  MovieAttributes,
  'id' | 'isActive'
> {}

export class Movie
  extends Model<MovieAttributes, MovieCreationAttributes>
  implements MovieAttributes
{
  declare id: string;
  declare title: string;
  declare genre: string;
  declare durationMinutes: number;
  declare isActive: boolean;
  declare createdBy: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Movie.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    genre: {
      type: DataTypes.STRING,
    },
    durationMinutes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdBy: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'movies',
    timestamps: true,
  },
);
