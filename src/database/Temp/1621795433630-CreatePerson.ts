import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePerson1621795433630 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'persons',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'Name',
            type: 'varchar',
          },
          {
            name: 'gender',
            type: "ENUM('Masculino','Feminino','Não Binário')",
          },
          {
            name: 'user_id',
            type: 'varchar(36)',
            isNullable: true,
          },
          {
            name: 'event_id',
            type: 'varchar(36)',
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
    await queryRunner.createForeignKey(
      'persons',
      new TableForeignKey({
        name: 'FKPersonUser',
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        columnNames: ['user_id'],
        onDelete: 'SET NULL',
      })
    );
    await queryRunner.createForeignKey(
      'persons',
      new TableForeignKey({
        name: 'FKPersonEvent',
        referencedTableName: 'events',
        referencedColumnNames: ['id'],
        columnNames: ['event_id'],
        onDelete: 'SET NULL',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropForeignKey('persons', 'FKPersonUser');
    } catch (error) {}
    try {
      await queryRunner.dropForeignKey('persons', 'FKPersonEvent');
    } catch (error) {}
    try {
      await queryRunner.dropTable('persons');
    } catch (error) {}
  }
}
