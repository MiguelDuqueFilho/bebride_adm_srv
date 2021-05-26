import { MigrationInterface, QueryRunner, Table, TableIndex } from 'typeorm';

export class CreateAccounts1621969608539 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'account',
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
            name: 'role',
            type: "ENUM('visitante','cliente','parceiro','administrador','suporte')",
          },
          {
            name: 'provider',
            type: 'varchar',
            default: null,
          },
          {
            name: 'password_salt',
            type: 'varchar',
            default: null,
          },
          {
            name: 'password_hash',
            type: 'varchar',
            default: null,
          },
          {
            name: 'email_verified',
            type: 'timestamp',
            default: null,
          },
          {
            name: 'deleted_at',
            type: 'datetime',
            default: null,
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

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
