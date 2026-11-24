"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.databaseProviders = void 0;
const config_1 = require("@nestjs/config");
const typeorm_1 = require("typeorm");
const database_source_1 = require("../constants/database-source");
exports.databaseProviders = [
    {
        provide: database_source_1.DATABASE_SOURCE,
        inject: [config_1.ConfigService],
        useFactory: async (configService) => {
            const dataSource = new typeorm_1.DataSource({
                type: 'mysql',
                host: configService.get('DB_HOST', 'localhost'),
                port: Number(configService.get('DB_PORT', '3306')),
                username: configService.get('DB_USERNAME', 'root'),
                password: configService.get('DB_PASSWORD', ''),
                database: configService.get('DB_NAME', 'AlvesxEvents'),
                entities: [__dirname + '/../../**/*.entity{.ts,.js}'],
                synchronize: configService.get('DB_SYNCHRONIZE') === 'true',
                logging: configService.get('DB_LOGGING') === 'true',
            });
            return dataSource.initialize();
        },
    },
];
