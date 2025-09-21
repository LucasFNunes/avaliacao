export type Dimensoes = {
  altura: number;
  largura: number;
  comprimento: number;
};

interface CaixaDef {
  id: string;
  altura: number;
  largura: number;
  comprimento: number;
  volume: number;
}

const caixasDisponiveis: CaixaDef[] = [
  {
    id: "Caixa 1",
    altura: 30,
    largura: 40,
    comprimento: 80,
    volume: 30 * 40 * 80,
  },
  {
    id: "Caixa 2",
    altura: 50,
    largura: 50,
    comprimento: 40,
    volume: 50 * 50 * 40,
  },
  {
    id: "Caixa 3",
    altura: 50,
    largura: 80,
    comprimento: 60,
    volume: 50 * 80 * 60,
  },
];

function dimsToArray(d: Dimensoes) {
  return [d.altura, d.largura, d.comprimento];
}

function canFit(
  prodDims: number[],
  boxDims: number[],
  allowRotation = false
): boolean {
  if (allowRotation) {
    const p = [...prodDims].sort((a, b) => a - b);
    const b = [...boxDims].sort((a, b) => a - b);
    return p[0] <= b[0] && p[1] <= b[1] && p[2] <= b[2];
  }
  return (
    prodDims[0] <= boxDims[0] &&
    prodDims[1] <= boxDims[1] &&
    prodDims[2] <= boxDims[2]
  );
}

export function embalarPedidos(
  pedidos: Array<{
    pedido_id: number;
    produtos: Array<{ produto_id: string; dimensoes: Dimensoes }>;
  }>,
  options?: { allowRotation?: boolean; sizeThreshold?: number | null }
) {
  const allowRotation = options?.allowRotation ?? false; // 🔹 padrão = sem rotação
  const sizeThreshold = options?.sizeThreshold ?? null; // 🔹 padrão = desabilitado

  return pedidos.map((pedido) => {
    const produtos = pedido.produtos.map((p) => {
      const arr = dimsToArray(p.dimensoes);
      const vol = arr[0] * arr[1] * arr[2];
      const maxDim = Math.max(...arr);
      return { produto_id: p.produto_id, dims: arr, volume: vol, maxDim };
    });

    const caixas: {
      caixa_id: string | null;
      produtos: string[];
      observacao?: string;
    }[] = [];

    for (const produto of produtos) {
      const caixaEscolhida = caixasDisponiveis.find((c) =>
        canFit(
          produto.dims,
          [c.altura, c.largura, c.comprimento],
          allowRotation
        )
      );

      if (caixaEscolhida) {
        // tenta caixa já aberta
        let caixaAberta = caixas.find(
          (cx) => cx.caixa_id === caixaEscolhida.id && !cx.observacao
        );

        if (caixaAberta) {
          // se sizeThreshold estiver habilitado, respeitar
          if (
            sizeThreshold !== null &&
            produto.maxDim <
              Math.max(
                caixaEscolhida.altura,
                caixaEscolhida.largura,
                caixaEscolhida.comprimento
              ) *
                sizeThreshold
          ) {
            // abre nova caixa em vez de colocar na já aberta
            caixaAberta = undefined;
          }
        }

        if (!caixaAberta) {
          caixaAberta = { caixa_id: caixaEscolhida.id, produtos: [] };
          caixas.push(caixaAberta);
        }
        caixaAberta.produtos.push(produto.produto_id);
      } else {
        caixas.push({
          caixa_id: null,
          produtos: [produto.produto_id],
          observacao: "Produto não cabe em nenhuma caixa disponível.",
        });
      }
    }

    return { pedido_id: pedido.pedido_id, caixas };
  });
}
