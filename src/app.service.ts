import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AppService {
  constructor(private readonly config: ConfigService) {}

  async getLatestData() {
    try {
      const filename = 'data.json';
      const address = this.config.get('WALLET_ADDRESS');
      const res = await axios.get(
        `${this.config.get(
          'API_Mainnet_URL',
        )}?module=account&action=balance&address=${address}&&tag=latest&apiKey=${this.config.get(
          'API_KEY',
        )}`,
      );
      fs.writeFile(
        `${path.resolve(__dirname, '..', 'src/file')}/${filename}`,
        JSON.stringify(res.data),
        (err) => {
          if (err) {
            console.error(err);
          } else {
            console.log('JSON file created successfully!');
          }
        },
      );
      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
}
