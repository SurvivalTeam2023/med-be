import { Controller, Get } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { HealthCheckService, HttpHealthIndicator, HealthCheck, TypeOrmHealthIndicator } from "@nestjs/terminus";
import { Unprotected } from "nest-keycloak-connect";

@Controller('/actuator/health')
@ApiBearerAuth()
export class HealthCheckController {
    constructor(
        private healthCheckService: HealthCheckService,
        private http: HttpHealthIndicator,
        private db: TypeOrmHealthIndicator,
    ) { }

    @Get()
    @Unprotected()
    @HealthCheck()
    checkHealth() {
        return this.healthCheckService.check([
            () => this.http.pingCheck('Server Check', 'https://api_dev.mediatation.tokyo/docs'),
            () => this.db.pingCheck('dev_be')
        ]);
    }
}