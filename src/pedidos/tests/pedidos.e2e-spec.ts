import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest"; // ← AQUI ESTÁ A CORREÇÃO
import { AppModule } from "../../app.module";
import entrada from "./fixtures/entrada.json";
import saida from "./fixtures/saida.json";

describe("PedidosController (e2e)", () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it("deve processar pedidos e retornar exatamente o JSON esperado", async () => {
    const response = await request(app.getHttpServer())
      .post("/pedidos/processar")
      .send(entrada)
      .expect(201);

    expect(response.body).toEqual(saida);
  });
});
