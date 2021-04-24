import {
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';

import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import { promisify } from 'util';

const mkdir = promisify(fs.mkdir);
const exists = promisify(fs.exists);
const writeFile = promisify(fs.writeFile);

@Injectable()
export class FilesService {
  async createFile(file: Express.Multer.File): Promise<string> {
    try {
      const fileName = uuid.v4() + '.jpg';
      const filePath = path.resolve(__dirname, '..', 'static');

      if (!(await exists(filePath))) {
        await mkdir(filePath, { recursive: true });
      }
      await writeFile(path.join(filePath, fileName), file.buffer);
      return fileName;
    } catch (e) {
      throw new InternalServerErrorException(
        'Unexpected error during file processing',
      );
    }
  }
}
