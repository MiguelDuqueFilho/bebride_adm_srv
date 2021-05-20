import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreateConnections1621521133725 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'connections',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'admin_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: true,
          },
          {
            name: 'socket_id',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );
    await queryRunner.createForeignKey(
      'connections',
      new TableForeignKey({
        name: 'FKConnectionUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropForeignKey('connections', 'FKConnectionUser');
    } catch (error) {}
    try {
      await queryRunner.dropTable('connections');
    } catch (error) {}
  }
}
