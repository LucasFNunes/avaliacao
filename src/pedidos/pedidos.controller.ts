import { Controller, Post, Body } from "@nestjs/common";
import PedidosService from "./pedidos.service";
import { Pedido } from "./interfaces/pedido.interface";

@Controller("pedidos")
export class PedidosController {
  @Post("processar")
  processar(@Body() body: { pedidos: Pedido[] }) {
    try {
      const processando = PedidosService.processarPedidos(body.pedidos);

      return processando;
    } catch (error) {
      return "Erro ";
    }
  }
}
