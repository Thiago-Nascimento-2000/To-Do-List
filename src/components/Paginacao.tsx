type PaginacaoProps = {
  paginas: number;
  setPaginaAtual: React.Dispatch<React.SetStateAction<number>>;
  paginaAtual?: number;
};

export function Paginacao({ setPaginaAtual, paginas, paginaAtual }: PaginacaoProps) {
  return (
    <div className="flex gap-2 z-2">
      {Array.from(Array(paginas), (_, index) => (
        <button
          key={index}
          className={`hover:cursor-pointer w-8 h-8 text-white rounded-full
            flex items-center justify-center mt-5 mb-5 hover:bg-blue-800 ${
              paginaAtual === index ? 'bg-blue-800 text-white' : 'bg-blue-600'
            }`}
          value={index}
          onClick={(e) => setPaginaAtual(Number(e.currentTarget.value))}
        >
          {index + 1}
        </button>
      ))}
    </div>
  );
}