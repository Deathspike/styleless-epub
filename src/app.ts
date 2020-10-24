import * as app from '.';

app.parseDirAsync('R:\\Books')
  .catch(console.log.bind(console));
