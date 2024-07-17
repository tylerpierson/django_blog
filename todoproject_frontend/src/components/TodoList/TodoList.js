import styles from './TodoList.module.scss';
import Todo from '../Todo/Todo';

export default function TodoList({
    newTodo,
    createTodo,
    setNewTodo,
    todos,
    completedTodos,
    moveToCompleted,
    deleteTodo
}) {
    return (
        <div className={styles.todolist}>
            <h3 className={styles.title}>Todo List</h3>
            <input
                className={styles.input}
                type="text"
                value={newTodo.subject}
                onChange={(e) => setNewTodo({ ...newTodo, subject: e.target.value })}
                onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        createTodo();
                    }
                }}
                placeholder="Add New Todo"
            />
            <div className={styles.todos}>
                <h3 className={styles.subtitle}>Todos</h3>
                {todos.map(todo => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        buttonAction={moveToCompleted}
                        buttonText={'Complete'}
                    />
                ))}
            </div>
            <div className={styles.completedTodos}>
                <h3 className={styles.subtitle}>Completed Todos</h3>
                {completedTodos.map(todo => (
                    <Todo
                        key={todo.id}
                        todo={todo}
                        buttonAction={deleteTodo}
                        buttonText={'Delete'}
                    />
                ))}
            </div>
        </div>
    );
}
