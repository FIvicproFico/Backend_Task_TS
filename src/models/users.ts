import {
  Table,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  DataType,
  PrimaryKey,
  Unique,
  AutoIncrement,
  AllowNull,
  ForeignKey,
} from 'sequelize-typescript';

import { Address } from './address';

@Table({
  tableName: 'Users',
})
export class Users extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column
  id: number;

  @Column(DataType.UUID)
  uuid: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  username: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  password: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  name: string;

  @AllowNull(false)
  @Column(DataType.STRING)
  surname: string;

  @Unique(true)
  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  role: string;

  @ForeignKey(() => Address)
  @Column
  addressId: number;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
