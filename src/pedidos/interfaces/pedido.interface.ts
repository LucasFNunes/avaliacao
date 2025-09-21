export interface Dimensoes {
  altura: number;
  largura: number;
  comprimento: number;
}

export interface Produto {
  produto_id: string;
  dimensoes: Dimensoes;
}

export interface Pedido {
  pedido_id: number;
  produtos: Produto[];
}

export interface CaixaResultado {
  caixa_id: string | null;
  produtos: string[];
  observacao?: string;
}
