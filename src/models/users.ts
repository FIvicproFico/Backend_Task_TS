import {
  Table,
  Column,
  Model,
  UpdatedAt,
  CreatedAt,
  DataType,
  PrimaryKey,
} from 'sequelize-typescript';

@Table
export class Users extends Model {
  @PrimaryKey
  @Column
  id: number;

  @Column(DataType.UUID)
  uuid: string;

  @Column(DataType.STRING)
  username: string;

  @Column(DataType.STRING)
  password: string;

  @Column(DataType.STRING)
  name: string;

  @Column(DataType.STRING)
  surname: string;

  @Column(DataType.STRING)
  email: string;

  @Column(DataType.STRING)
  role: string;

  @CreatedAt
  createdAt: Date;

  @UpdatedAt
  updatedAt: Date;
}
