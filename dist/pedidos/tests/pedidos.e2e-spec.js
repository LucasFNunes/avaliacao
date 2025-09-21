"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const testing_1 = require("@nestjs/testing");
const supertest_1 = __importDefault(require("supertest")); // ← AQUI ESTÁ A CORREÇÃO
const app_module_1 = require("../../app.module");
const entrada_json_1 = __importDefault(require("./fixtures/entrada.json"));
const saida_json_1 = __importDefault(require("./fixtures/saida.json"));
describe("PedidosController (e2e)", () => {
    let app;
    beforeAll(async () => {
        const moduleFixture = await testing_1.Test.createTestingModule({
            imports: [app_module_1.AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    });
    afterAll(async () => {
        await app.close();
    });
    it("deve processar pedidos e retornar exatamente o JSON esperado", async () => {
        const response = await (0, supertest_1.default)(app.getHttpServer())
            .post("/pedidos/processar")
            .send(entrada_json_1.default)
            .expect(201);
        expect(response.body).toEqual(saida_json_1.default);
    });
});
