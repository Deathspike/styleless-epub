import * as app from '..';
import fs from 'fs';
import util from 'util';

export async function parseAsync(resourcePaths: string[]) {
  for (const resourcePath of resourcePaths) {
    const stat = await util.promisify(fs.stat)(resourcePath);
    if (stat.isDirectory()) {
      await app.parseDirAsync(resourcePath);
    } else if (stat.isFile()) {
      await app.parseFileAsync(resourcePath);
    }
  }
}
