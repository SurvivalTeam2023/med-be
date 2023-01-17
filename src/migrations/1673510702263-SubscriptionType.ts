import { MigrationInterface, QueryRunner } from "typeorm"

export class SubscriptionType1673510702263 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO `med-db`.subscription_type (name,`desc`,usageTime,status,cost) VALUES ('Starter Pack','3 months pack',3,'ACTIVE',9);")
        await queryRunner.query("INSERT INTO `med-db`.subscription_type (name,`desc`,usageTime,status,cost) VALUES ('Standered Pack','6 months pack',6,'ACTIVE',15);")
        await queryRunner.query("INSERT INTO `med-db`.subscription_type(name, `desc`, usageTime, status, cost) VALUES('Super Saver Pack', '12 months pack', 12, 'ACTIVE', 25);")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "DELETE FROM `med-db`.subscription_type;"
        )
    }

}
