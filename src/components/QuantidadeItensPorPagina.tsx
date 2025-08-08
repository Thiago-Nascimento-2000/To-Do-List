type PaginacaoProps = {
  itensPorPagina: number;
  setItensPorPagina: React.Dispatch<React.SetStateAction<number>>;
};

export function QuantidadeItensPorPagina({itensPorPagina, setItensPorPagina}: PaginacaoProps) {
    return(
        <span
          className = "text-blue-600 flex items-center pt-10" > Mostrar &nbsp;
          <select className = "cursor-pointer" value = { itensPorPagina } onChange = {(e) => setItensPorPagina(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select >
          &nbsp;&nbsp; itens
        </span >
    )
}