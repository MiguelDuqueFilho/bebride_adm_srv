import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateImages1621957509091 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    new Table({
      name: 'images',
      columns: [
        {
          name: 'id',
          type: 'varchar(36)',
          isPrimary: true,
        },
        {
          name: 'use_type',
          type: 'tinyint',
          default: 0,
        },
        {
          name: 'status',
          type: 'tinyint',
          default: false,
        },
        {
          name: 'title',
          type: 'varchar',
          isNullable: true,
          default: null,
        },
        {
          name: 'content',
          type: 'varchar',
          isNullable: true,
          default: null,
        },
        {
          name: 'file_key',
          type: 'varchar',
        },
        {
          name: 'file_location',
          type: 'varchar',
        },
        {
          name: 'file_original_name',
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
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.dropTable('images');
    } catch (error) {}
  }
}
