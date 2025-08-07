import { useEffect, useState } from "react";
import { Modal } from "./components/Modal";
import { NewTask } from "./components/NewTask";
import { HiMiniPlus } from "react-icons/hi2";
import { MdKeyboardArrowDown, MdOutlineCancel } from "react-icons/md";
import { AiOutlinePushpin } from "react-icons/ai";
import { v4 as uuid } from "uuid";
import { PiTrash } from "react-icons/pi";
import { FaCheck } from "react-icons/fa";


export default function App() {
  const [open, setOpen] = useState(false);

  type Tarefas = {
    id: string;
    nomeTarefa: string;
    concluido: boolean;
  }

  const [input, setInput] = useState('');
  const [tarefa, setTarefa] = useState<Tarefas[]>(() => {
    const tarefaStorage = localStorage.getItem('tarefa');
    return tarefaStorage ? JSON.parse(tarefaStorage) : [];
  });

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
    <main className="relative flex justify-center items-center flex-col h-screen bg-gray-200 overflow-hidden">
      <div className="bg-blue-600 w-12/12 h-fit flex flex-col items-center justify-center p-5 rounded-b-4xl">
        <h1 className="w-8/12 m-5 text-white font-semibold text-2xl">To do List</h1>
        <nav className="bg-white/30 rounded-full w-8/12">
          <ul className="flex justify-between items-center mr-10">
            <li className="text-blue-500 font-semibold bg-white rounded-full p-3 pl-10 pr-10"><a href="#">Todas Tarefas</a></li>
            <li className="text-white/70"><a href="#">Nova</a></li>
            <li className="text-white/70"><a href="#">Aprovado</a></li>
            <li className="text-white/70"><a href="#">Nova Lista</a></li>
            <li className="text-white/70"><a href="#">Carregado</a></li>
          </ul>
        </nav>
      </div>

      <div className="flex justify-between w-6/12">
        <span className="font-semibold text-2xl text-white pt-10 pb-2">Suas tarefas</span>
        <span className="text-white flex items-center pt-10">Mostrar 5 itens <MdKeyboardArrowDown /></span>
      </div>

      {tarefa.map((task) => (
        <span key={task.id} className="w-full flex m-2 justify-center">

          <div className="flex w-6/12">

            <div className={`w-2 h-15 rounded-l-sm ${task.concluido ? 'bg-green-500' : 'bg-red-500'}
`}/>
            <div className="bg-white w-full h-15 rounded-r-sm flex items-center justify-between pr-5 pl-5 shadow-[0px_4px_6px_0px_rgba(0,_0,_0,_0.1)]">
              <p style={{textDecoration: task.concluido ? 'line-through' : 'none', cursor: 'pointer' }}>{task.nomeTarefa}</p>
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

      <NewTask
        onClick={() => setOpen(true)}>
        <HiMiniPlus size={30} />
      </NewTask>
    </main>
  )
}

