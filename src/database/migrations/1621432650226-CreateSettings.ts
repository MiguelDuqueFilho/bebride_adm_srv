import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateSettings1621432650226 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'settings',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'username',
            type: 'varchar',
          },
          {
            name: 'chat',
            type: 'boolean',
            default: false,
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropTable('settings');
    } catch (error) {
      console.error(`Error on dropTable settings`);
    }
  }
}
