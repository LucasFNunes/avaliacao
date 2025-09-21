import { Injectable } from "@nestjs/common";
import { Pedido, CaixaResultado } from "./interfaces/pedido.interface";
import { embalarPedidos } from "../utils/caixa-utils";
@Injectable()
export default class PedidosService {
  static async processarPedidos(
    pedidos: Pedido[]
  ): Promise<{ pedido_id: number; caixas: CaixaResultado[] }[]> {
    return embalarPedidos(pedidos, {
      allowRotation: false, // 🔹 rotação desabilitada por padrão
      sizeThreshold: null, // 🔹 threshold desativado para reproduzir saida.json esperado
    });
  }
}
