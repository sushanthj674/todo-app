import { Component } from "react";
import "./App.css";

class ListItem extends Component {
  render() {
    const { task, done, toggle } = this.props;
    return (
      <div>
        <input
          type="checkbox"
          checked={done}
          onChange={toggle}
        />
        <span style={{ textDecoration: done ? "line-through" : "none" }}>
          {task}
        </span>
      </div>
    );
  }
}

class TasksList extends Component {
  render() {
    return (
      <>
        {this.props.tasks.map((task) => (
          <ListItem
            key={task.taskId}
            task={task.task}
            done={task.done}
            toggle={() => this.props.toggle(task.taskId)}
          />
        ))}
      </>
    );
  }
}

class TodoCat extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: props.taskName,
      tasks: props.tasks,
      nextTaskId: 0,
    };
    this.addTask = this.addTask.bind(this);
    this.toggleTask = this.toggleTask.bind(this);
  }

  addTask(task) {
    this.setState((prev) => ({
      tasks: [
        ...prev.tasks,
        { taskId: prev.nextTaskId, task, done: false },
      ],
      nextTaskId: prev.nextTaskId + 1,
    }));
  }

  toggleTask(id) {
    this.setState((prev) => ({
      tasks: prev.tasks.map((t) =>
        t.taskId === id ? { ...t, done: !t.done } : t
      ),
    }));
  }

  render() {
    return (
      <div className="task-list">
        <h2>{this.state.taskName}</h2>
        <Input onSubmit={this.addTask} />
        <TasksList tasks={this.state.tasks} toggle={this.toggleTask} />
      </div>
    );
  }
}

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
    this.onChange = this.onChange.bind(this);
    this.onKeyDown = this.onKeyDown.bind(this);
  }

  onChange(event) {
    this.setState({ value: event.target.value });
  }

  onKeyDown(event) {
    if (event.key === "Enter") {
      if (this.state.value.trim() !== "") {
        this.props.onSubmit(this.state.value.trim());
        this.setState({ value: "" });
      }
    }
  }

  render() {
    return (
      <input
        placeholder="Enter to add"
        onChange={this.onChange}
        onKeyDown={this.onKeyDown}
        value={this.state.value}
      />
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        {
          taskName: "don things",
          tasks: [],
        },
      ],
    };
    this.addTodo = this.addTodo.bind(this);
  }

  addTodo(todo) {
    this.setState((prev) => ({
      todos: [...prev.todos, { taskName: todo, tasks: [] }],
    }));
  }

  render() {
    return (
      <div className="app">
        <h1>My Todo App</h1>
        <Input onSubmit={this.addTodo} />
        {this.state.todos.map((todo, index) => (
          <TodoCat
            key={index}
            taskName={todo.taskName}
            tasks={todo.tasks}
          />
        ))}
      </div>
    );
  }
}

export default App;
