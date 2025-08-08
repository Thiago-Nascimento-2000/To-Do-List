import { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";

import { Modal } from "./components/Modal";
import { NewTask } from "./components/NewTask";
import { Header } from "./components/Header";
import { Paginacao } from "./components/Paginacao";
import { QuantidadeItensPorPagina } from "./components/QuantidadeItensPorPagina";

import { PiTrash } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";
import { HiMiniPlus } from "react-icons/hi2";
import { MdOutlineCancel } from "react-icons/md";
import { AiOutlinePushpin } from "react-icons/ai";


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
  }, [itensPorPagina])

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
      <Header />

      <div className="flex justify-between w-6/12 z-2">
        <span className="font-semibold text-2xl text-blue-600 pt-10 pb-2">
          {`Suas tarefas: ${tarefa.length},`}
          &nbsp;&nbsp;
          {`Concluidas: ${tarefa.filter(task => task.concluido).length},`}
          &nbsp;&nbsp;
          {`Pendentes: ${tarefa.filter(task => !task.concluido).length}.`}
        </span>
      <QuantidadeItensPorPagina itensPorPagina={itensPorPagina} setItensPorPagina={setItensPorPagina}/>
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
            className="text-white font-semibold hover:cursor-pointer">
            <MdOutlineCancel size={25} className="text-red-500 hover:text-red-700"/>
          </button>
        </div>
        <h1 className="text-white font-semibold text-2xl mb-5">Descreva sua Tarefa</h1>
        <div className="flex items-start">
          <input
            placeholder="Nova Task"
            type="text"
            value={input}
            onChange={(e) => { setInput(e.target.value) }}
            className="bg-white rounded-l-xl border-none p-2">
          </input>
          <button
            onClick={() => adicionarTarefa()}
            className="bg-white rounded-r-xl p-2 hover:cursor-pointer mb-10">
            <AiOutlinePushpin size={24} />
          </button>
        </div>
      </Modal>

      <Paginacao paginas={paginas} setPaginaAtual={setPaginaAtual}/>

      <NewTask
        onClick={() => setOpen(true)}>
        <HiMiniPlus size={30} />
      </NewTask>
    </main>
  )
}

