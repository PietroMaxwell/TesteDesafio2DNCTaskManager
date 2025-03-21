import { CheckIcon, Trash2Icon } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Separator } from "../../components/ui/separator";

// Task data structure
interface Task {
  id: number;
  title: string;
  label: string;
  createdAt: string;
  completed: boolean;
}

export const Main = (): JSX.Element => {
  // State for tasks and form inputs
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: 1,
      title: "Implementar tela de listagem de tarefas",
      label: "frontend",
      createdAt: "21/08/2024",
      completed: false,
    },
    {
      id: 2,
      title: "Criar endpoint para cadastro de tarefas",
      label: "backend",
      createdAt: "21/08/2024",
      completed: false,
    },
    {
      id: 3,
      title: "Implementar protótipo da listagem de tarefas",
      label: "ux",
      createdAt: "21/08/2024",
      completed: true,
    },
  ]);

  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskLabel, setNewTaskLabel] = useState("");

  // Handle task completion
  const handleCompleteTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: true } : task
    ));
  };

  // Handle deleting completed tasks
  const handleDeleteTask = (taskId: number) => {
    setTasks(tasks.filter(task => task.id !== taskId));
  };

  // Handle adding new task
  const handleAddTask = () => {
    if (!newTaskTitle.trim()) return;

    const newTask: Task = {
      id: Math.max(0, ...tasks.map(t => t.id)) + 1,
      title: newTaskTitle,
      label: newTaskLabel || "sem etiqueta",
      createdAt: new Date().toLocaleDateString("pt-BR"),
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
    setNewTaskLabel("");
  };

  // Count completed tasks
  const completedTasksCount = tasks.filter((task) => task.completed).length;

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Card className="flex flex-col w-[650px] items-start gap-6 px-8 py-6 rounded-2xl">
        <h1 className="w-fit mt-[-1.00px] font-['Rubik',Helvetica] font-semibold text-[#11175e] text-[40px] tracking-[0.40px] leading-normal whitespace-nowrap">
          Board de tarefas
        </h1>

        <div className="flex items-center justify-center gap-4 self-stretch w-full">
          <Input
            className="h-[50px] px-6 py-4 flex-1 rounded-lg border border-solid border-[#eeeeee]"
            placeholder="Nome da tarefa"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />

          <Input
            className="h-[50px] px-6 py-4 flex-1 rounded-lg border border-solid border-[#eeeeee]"
            placeholder="Etiqueta"
            value={newTaskLabel}
            onChange={(e) => setNewTaskLabel(e.target.value)}
          />

          <Button 
            className="w-[48px] h-[48px] p-4 bg-[#2d70fd] rounded text-white text-lg"
            onClick={handleAddTask}
          >
            +
          </Button>
        </div>

        <div className="flex flex-col items-center justify-center gap-2 self-stretch w-full">
          {tasks.map((task) => (
            <Card
              key={task.id}
              className="flex items-center gap-2 px-8 py-6 self-stretch w-full border border-solid border-[#eeeeee] rounded-2xl"
            >
              <CardContent className="flex items-center justify-between p-0 w-full">
                <div className="flex flex-col items-start justify-center gap-4 flex-1">
                  <div
                    className={`self-stretch mt-[-1.00px] font-['Inter',Helvetica] font-medium text-base tracking-[0.16px] leading-[17.6px] ${
                      task.completed
                        ? "text-[#8f98a7] line-through"
                        : "text-[#001747]"
                    }`}
                  >
                    {task.title}
                  </div>

                  <div className="inline-flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="px-2 py-1 bg-white rounded-2xl border border-solid border-[#b1bacb]"
                    >
                      <span className="font-['Inter',Helvetica] font-medium text-[#b1bacb] text-xs tracking-[0.12px] leading-[13.2px]">
                        {task.label}
                      </span>
                    </Badge>

                    <div className="font-['Inter',Helvetica] font-medium text-[#b1bacb] text-sm tracking-[0.14px] leading-[15.4px] whitespace-nowrap">
                      Criado em: {task.createdAt}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {task.completed ? (
                    <>
                      <div className="w-8 h-8 bg-[#00d8a7] rounded-2xl flex items-center justify-center">
                        <CheckIcon className="w-4 h-4 text-white" />
                      </div>
                      <Button
                        variant="destructive"
                        size="icon"
                        className="w-8 h-8"
                        onClick={() => handleDeleteTask(task.id)}
                      >
                        <Trash2Icon className="w-4 h-4" />
                      </Button>
                    </>
                  ) : (
                    <Button 
                      className="px-6 py-3 bg-[#2d70fd] rounded text-white text-lg"
                      onClick={() => handleCompleteTask(task.id)}
                    >
                      Concluir
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Separator className="w-full h-px" />

        <footer className="flex items-center justify-end gap-2.5 self-stretch w-full">
          <div className="font-['Inter',Helvetica] font-normal text-[#b1bacb] text-base tracking-[0.16px] leading-[17.6px] whitespace-nowrap">
            {completedTasksCount} {completedTasksCount === 1 ? 'tarefa concluída' : 'tarefas concluídas'}
          </div>
        </footer>
      </Card>
    </div>
  );
};