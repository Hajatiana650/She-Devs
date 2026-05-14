import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { LocalisationModule } from './modules/localisation/localisation.module';
import { QuarterModule } from './modules/quarter/quarter.module';
import { AdminModule } from './modules/admin/admin.module';
import { PopulationModule } from './modules/population/population.module';
import { DriverModule } from './modules/driver/driver.module';
import { BusModule } from './modules/bus/bus.module';
import { LineModule } from './modules/line/line.module';
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule,
    QuarterModule,
    UserModule,
    LocalisationModule,
    AdminModule,
    PopulationModule,
    DriverModule,
    BusModule,
    LineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply()                          // ← tu pourras y mettre un LoggerMiddleware plus tard
      .exclude(
        { path: 'auth/login',           method: RequestMethod.POST },
        { path: 'auth/refresh',         method: RequestMethod.POST },
        { path: 'user',                 method: RequestMethod.POST }, // register
        { path: 'user/reset-password',  method: RequestMethod.PATCH },
      )
      .forRoutes('*');
  }
}
