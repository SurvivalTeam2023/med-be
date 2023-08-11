import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AgeEntity } from "./entities/age.entity";
import { EntityManager, LessThanOrEqual, MoreThanOrEqual, Repository } from "typeorm";
import UserEntity from "../user/entities/user.entity";
import { getAge } from "src/utils/getAge.utils";

@Injectable()
export default class AgeService {
    constructor(
        private readonly entityManage: EntityManager,
        @InjectRepository(AgeEntity)
        private ageRepository: Repository<AgeEntity>,
    ) { }

    async getAgeLog(): Promise<any> {
        const user = await this.entityManage.find(UserEntity)


        const ageArray = user.map(e => {
            const age = getAge(e.dob)
            return age
        })


        const ageCountMap: { [age: number]: number } = {}; // Initialize the count map
        const defaultAgeIds = [1, 2, 3, 4];

        // Initialize the ageCountMap with zero counts for default age IDs
        for (const ageId of defaultAgeIds) {
            ageCountMap[ageId] = 0;
        }
        for (const age of ageArray) {
            const ageCount = await this.ageRepository
                .createQueryBuilder('age')
                .where('start_age <= :age', { age: age })
                .andWhere('end_age >= :age', { age: age })
                .getOne();

            const ageId = ageCount.id; // Assuming id is the property representing ageId

            if (ageCountMap[ageId]) {
                ageCountMap[ageId]++; // Increment the count if the ageId exists
            } else {
                ageCountMap[ageId] = 1; // Initialize the count if the ageId doesn't exist
            }
        }

        return ageCountMap;
    }
}