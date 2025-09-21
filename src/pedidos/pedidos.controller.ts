import { Controller, Post, Body } from "@nestjs/common";
import PedidosService from "./pedidos.service";
import { Pedido } from "./interfaces/pedido.interface";

@Controller("pedidos")
export class PedidosController {
  @Post("processar")
  async processar(@Body() body: { pedidos: Pedido[] }) {
    try {
      const processando = await PedidosService.processarPedidos(body.pedidos);

      return {
        pedidos: processando,
      };
    } catch (error) {
      return "Erro ao tentar fazer o calculo das caixas";
    }
  }
}
