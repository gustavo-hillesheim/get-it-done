export enum TaskStatus {
  TODO,
  IN_PROGRESS,
  DONE,
}

export interface TaskConstructorArgs {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export class Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  isExpanded = false;

  constructor(parameters: TaskConstructorArgs) {
    this.id = parameters.id;
    this.title = parameters.title;
    this.description = parameters.description;
    this.status = parameters.status;
  }
}
