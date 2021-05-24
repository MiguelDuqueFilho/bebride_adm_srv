import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateMessages1621463208762 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'messages',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'admin_id',
            type: 'varchar(36)',
            isNullable: true,
            default: null,
          },
          {
            name: 'user_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'text',
            type: 'varchar',
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
    await queryRunner.createForeignKey(
      'messages',
      new TableForeignKey({
        name: 'FKMessagesUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropForeignKey('messages', 'FKMessagesUser');
    } catch (error) {}
    try {
      await queryRunner.dropTable('messages');
    } catch (error) {}
  }
}
