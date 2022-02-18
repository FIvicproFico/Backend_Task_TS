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
} from 'sequelize-typescript';

@Table
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

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
