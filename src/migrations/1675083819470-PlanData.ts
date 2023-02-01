import { MigrationInterface, QueryRunner } from "typeorm"

export class PlanData1675083819470 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("INSERT INTO `med-db`.plan(id, name,`desc`,usage_time,status,cost) VALUES ('P-8DC421374D1432420MPL344I','Starter Pack','3 months pack',3,'ACTIVE',9);")
        await queryRunner.query("INSERT INTO `med-db`.plan(id, name,`desc`,usage_time,status,cost) VALUES ('P-8DC421374D1432420MPL341I','Standered Pack','6 months pack',6,'ACTIVE',15);")
        await queryRunner.query("INSERT INTO `med-db`.plan(id, name, `desc`, usage_time, status, cost) VALUES('P-8DC421374D1432420MPL347I','Super Saver Pack', '12 months pack', 12, 'ACTIVE', 25);")
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            "DELETE FROM `med-db`.plan;"
        )
    }

}
