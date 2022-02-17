import { Table, Column, Model } from 'sequelize-typescript';

@Table
export class Tests extends Model {
  @Column
  username: string;

  @Column
  password: string;
}
