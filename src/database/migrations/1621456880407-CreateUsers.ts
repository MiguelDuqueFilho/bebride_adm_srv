import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableIndex,
  TableUnique,
} from 'typeorm';

export class CreateUsers1621456880407 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'email',
            type: 'varchar(150)',
          },
          {
            name: 'first_name',
            type: 'varchar',
          },
          {
            name: 'last_name',
            type: 'varchar',
          },
          {
            name: 'role',
            type: "ENUM('visitante','cliente','parceiro','administrador','suporte')",
          },
          {
            name: 'profile_id',
            type: 'varchar(36)',
            default: null,
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'password_salt',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'password_hash',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email_verified',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'password_reset_token',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'password_reset_expires',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'remote_reset_ip',
            type: 'varchar(45)',
            isNullable: true,
          },
          {
            name: 'deleted_at',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
    await queryRunner.createIndex(
      'users',
      new TableIndex({
        name: 'IDX_EMAIL_UNIQUE',
        columnNames: ['email'],
        isUnique: true,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropIndex('users', 'IDX_EMAIL_UNIQUE');
    } catch (error) {
      console.error(`Error on dropIndex users email`);
    }
    try {
      await queryRunner.dropTable('users');
    } catch (error) {
      console.error(`Error on dropTable users`);
    }
  }
}
