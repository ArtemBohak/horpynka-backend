import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OrdersModule } from './orders/orders.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('DB_HOST') as string,
        port: configService.get<number>('DB_PORT') as number,
        username: configService.get<string>('DB_USERNAME') as string,
        password: configService.get<string>('DB_PASSWORD') as string,
        database: configService.get<string>('DB_NAME') as string,
        entities: [],
        autoLoadEntities: true,
        migrations: ['./migrations/*.ts'],
        invalidWhereValuesBehavior: {
          null: 'sql-null',
          undefined: 'ignore',
        },
        synchronize: false,
      }),
    }),
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
