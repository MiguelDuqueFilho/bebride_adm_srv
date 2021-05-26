import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateEvents1621793478884 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'events',
        columns: [
          {
            name: 'id',
            type: 'varchar(36)',
            isPrimary: true,
          },
          {
            name: 'title',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'status',
            type: "ENUM('inicial','Contratado','Em Andamento','Concluido','Cancelado')",
          },
          {
            name: 'initial_date',
            type: 'datetime',
            isNullable: true,
          },
          {
            name: 'event_date',
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
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropTable('events');
    } catch (error) {}
  }
}
