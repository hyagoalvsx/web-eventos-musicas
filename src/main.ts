import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { registerHelpers } from './helpers';


const expressLayouts = require('express-ejs-layouts');

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(process.cwd(), 'public'));
  app.setBaseViewsDir(join(process.cwd(), 'views'));
  app.use(expressLayouts);
  app.set('layout', 'layout');
  app.setViewEngine('ejs');

  registerHelpers(app.getHttpAdapter().getInstance());

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`AlvesxEvents rodando em http://localhost:${port}`);
}
bootstrap();