import { Controller, Logger } from '@nestjs/common';
import { AppService } from './app.service';
import { Cron } from '@nestjs/schedule';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  private readonly logger = new Logger(AppService.name);

  @Cron('01 * * * * *')
  async handleCron() {
    this.logger.debug('Called when the current second is 01');
    await this.appService.getLatestData();
  }
}
