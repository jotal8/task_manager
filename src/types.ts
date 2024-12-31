import { Dispatch } from "react";

interface Task {
    idtask: number;
    title: string;
    description: string;
    completed: boolean;
}

interface BtnAddProps {
tasks: Task[];
setTasks: Dispatch<React.SetStateAction<Task[]>>;
}

interface SessionState {
token: string;
}

interface RootState {
session: SessionState;
}

export type { Task, BtnAddProps, SessionState, RootState };