"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_module_1 = require("./app.module");
const helpers_1 = require("./helpers");
const expressLayouts = require('express-ejs-layouts');
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useStaticAssets((0, path_1.join)(process.cwd(), 'public'));
    app.setBaseViewsDir((0, path_1.join)(process.cwd(), 'views'));
    app.use(expressLayouts);
    app.set('layout', 'layout');
    app.setViewEngine('ejs');
    (0, helpers_1.registerHelpers)(app.getHttpAdapter().getInstance());
    const port = process.env.PORT || 3000;
    await app.listen(port);
    console.log(`AlvesxEvents rodando em http://localhost:${port}`);
}
bootstrap();
