import {
  Table,
  Column,
  Model,
  PrimaryKey,
  HasMany,
} from 'sequelize-typescript';

import { Users } from './users';

@Table({
  tableName: 'Address',
  timestamps: false,
})
export class Address extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column
  streetAdress: string;

  @Column
  streetNumber: number;

  @Column
  zipCode: number;

  @Column
  town: string;

  @Column
  country: string;

  @HasMany(() => Users)
  users: Users[];
}
