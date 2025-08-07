import { useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import { NewTask } from "./components/NewTask";
import { HiMiniPlus } from "react-icons/hi2";
import { MdKeyboardArrowDown, MdOutlineCancel } from "react-icons/md";
import { AiOutlinePushpin } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import { PiTrash } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { Header } from "./components/Header";


export default function App() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState('');
  const [tarefa, setTarefa] = useState<Tarefas[]>(() => {
    const tarefaStorage = localStorage.getItem('tarefa');
    return tarefaStorage ? JSON.parse(tarefaStorage) : [];
  });
  const [itensPorPagina, setItensPorPagina] = useState(5);
  const [paginaAtual, setPaginaAtual] = useState(0);

  const paginas = Math.ceil(tarefa.length / itensPorPagina);
  const InicioIndex = paginaAtual * itensPorPagina;
  const FimIndex = InicioIndex + itensPorPagina;
  const ItensAtual = tarefa.slice(InicioIndex, FimIndex);

  useEffect(() => {
    setPaginaAtual(0);
  },[itensPorPagina])

  type Tarefas = {
    id: string;
    nomeTarefa: string;
    concluido: boolean;
  }

  const adicionarTarefa = () => {
    const id = uuid();
    if (!input) return
    setTarefa([...tarefa, { id, nomeTarefa: input, concluido: false }]);
    setInput('');
  }

  const removerTarefa = (id: string) => {
    setTarefa(tarefa.filter(task =>
      task.id !== id))
  }

  const concluirTarefa = (id: string) => {
    setTarefa(tarefa.map(task =>
      task.id === id
        ? { ...task, concluido: !task.concluido }
        : task
    ));
  };


  useEffect(() => {
    localStorage.setItem("tarefa", JSON.stringify(tarefa));
  }, [tarefa]);

  return (
    <main className="flex items-center flex-col h-full">
      <Header/>

      <div className="flex justify-between w-6/12 z-2">
        <span className="font-semibold text-2xl text-blue-600 pt-10 pb-2">
          {`Suas tarefas: ${tarefa.length},`}
          &nbsp;&nbsp;
          {`Concluidas: 5,`}
          &nbsp;&nbsp;
          {`Pendentes: 7.`}
          </span>
        <span
          className="text-blue-600 flex items-center pt-10">Mostrar&nbsp;
          <select className="cursor-pointer" value={itensPorPagina} onChange={(e) => setItensPorPagina(Number(e.target.value))}>
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
          </select>
          &nbsp;&nbsp;itens
        </span>
      </div>

      {ItensAtual.map((task) => (
        <span key={task.id} className="w-full flex m-2 justify-center z-2">

          <div className="flex w-6/12">

            <div className={`w-2 h-15 rounded-l-sm ${task.concluido ? 'bg-green-500' : 'bg-red-500'}
`} />
            <div className="bg-white w-full h-15 rounded-r-sm flex items-center justify-between pr-5 pl-5 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
              <p style={{ textDecoration: task.concluido ? 'line-through' : 'none', cursor: 'pointer' }}>{task.nomeTarefa}</p>
              <div className="flex gap-3">
                <FaCheck size={22} onClick={() => concluirTarefa(task.id)} className="text-green-500 hover:cursor-pointer hover:scale-105" />
                <PiTrash size={25} onClick={() => removerTarefa(task.id)} className="hover:cursor-pointer hover:scale-105 text-red-700" />
              </div>
            </div>
          </div>

        </span>
      ))}

      <Modal
        open={open}
        onClose={() => setOpen(false)}>
        <div className="w-full flex justify-end items-end p-2">
          <button
            onClick={() => setOpen(false)}
            className="text-white font-semibold p-2 hover:cursor-pointer">
            <MdOutlineCancel size={25} />
          </button>
        </div>

        <div className="flex-1 flex items-start">
          <input
            placeholder="Nova Task"
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value) }}
            className="bg-white rounded-l-xl p-1 border-none">
          </input>
          <button
            onClick={() => adicionarTarefa()}
            className="bg-white rounded-r-xl p-1 hover:cursor-pointer">
            <AiOutlinePushpin size={24} />
          </button>
        </div>
      </Modal>

      <div className="flex gap-2 z-2">
        {Array.from(Array(paginas), (item, index) => {
          return (
            <button
              className={`hover:cursor-pointer w-8 h-8 text-white rounded-full
              flex items-center justify-center mt-5 mb-5 ${paginaAtual === index ? 'bg-blue-800 text-white' : 'bg-blue-600'}`}
              value={index}
              onClick={(e) => setPaginaAtual(Number(e.currentTarget.value))}>{index + 1}
            </button>
          )
        })}
      </div>

      <NewTask
        onClick={() => setOpen(true)}>
        <HiMiniPlus size={30} />
      </NewTask>
    </main>
  )
}

