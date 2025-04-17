// import { MigrationInterface, QueryRunner } from 'typeorm';
//
// export class InitMigration implements MigrationInterface {
//   async down(queryRunner: QueryRunner): Promise<any> {
//     console.log('InitMigration: down');
//     await queryRunner.dropSchema('product_management_dev');
//   }
//
//   async up(queryRunner: QueryRunner): Promise<any> {
//     console.log(
//       'InitMigration: up, creating schema with name:',
//       'product_management_dev',
//     );
//     await queryRunner.createSchema('product_management_dev', true);
//   }
// }
