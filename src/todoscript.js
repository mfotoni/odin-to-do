class Todo {
  constructor(title, description, dueDate, priority) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;

    // adicionar id unico
  }
}

class Project {
  constructor(name, description, todoList) {
    this.name = name;
    this.description = description;
    this.todoList = [];
  }
}

class TodoManager {
  markComplete() {}
  updatePriority() {}

  // adicionar um array de projetos
}

// Pense em um ProjectManager que é responsável apenas por operações relacionadas a projetos: criar, deletar, encontrar, listar projetos. Ele mantém o array de projetos e conhece todas as operações que você pode fazer com projetos, mas não se preocupa com como os to-dos individuais funcionam.

// Paralelamente, cada projeto individual pode ter sua própria lógica para gerenciar seus to-dos. A classe Project seria responsável por adicionar, remover e organizar to-dos dentro de si mesma. Ela não precisa saber como outros projetos funcionam ou como a aplicação toda está estruturada.
