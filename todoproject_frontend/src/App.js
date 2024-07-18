import { useState, useEffect } from 'react';
import TodoList from './components/TodoList/TodoList';
import styles from './App.module.scss';

const API_BASE_URL = 'http://34.203.226.236:8000';

export default function App() {
    const [todos, setTodos] = useState([]);
    const [completedTodos, setCompletedTodos] = useState([]);
    const [newTodo, setNewTodo] = useState({
        subject: '',
        completed: false
    });

    const createTodo = async () => {
        const body = { ...newTodo };
        try {
            const response = await fetch(`${API_BASE_URL}/todos/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            const createdTodo = await response.json();
            const todosCopy = [createdTodo, ...todos];
            setTodos(todosCopy);
            setNewTodo({
                subject: '',
                completed: false
            });
        } catch (error) {
            console.error(error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            await fetch(`${API_BASE_URL}/todos/${id}/`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const updatedCompletedTodos = completedTodos.filter(todo => todo.id !== id);
            setCompletedTodos(updatedCompletedTodos);
        } catch (error) {
            console.error('Error deleting todo:', error);
        }
    };

    const moveToCompleted = async (id) => {
        try {
            const index = todos.findIndex(todo => todo.id === id);
            const todosCopy = [...todos];
            const subject = todosCopy[index];
            subject.completed = true;
            const response = await fetch(`${API_BASE_URL}/todos/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            });
            const updatedTodo = await response.json();
            const completedTDsCopy = [updatedTodo, ...completedTodos];
            setCompletedTodos(completedTDsCopy);
            todosCopy.splice(index, 1);
            setTodos(todosCopy);
        } catch (error) {
            console.error(error);
        }
    };

    const getTodos = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/todos/`);
            const todosData = await response.json();
            const foundTodos = todosData.filter(todo => !todo.completed);
            const foundCompletedTodos = todosData.filter(todo => todo.completed);
            setTodos(foundTodos.reverse());
            setCompletedTodos(foundCompletedTodos.reverse());
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        getTodos();
    }, []);

    return (
        <>
            <div className={styles.banner}>
                <h1>Todo List</h1>
            </div>
            <TodoList
                newTodo={newTodo}
                setNewTodo={setNewTodo}
                createTodo={createTodo}
                todos={todos}
                moveToCompleted={moveToCompleted}
                completedTodos={completedTodos}
                deleteTodo={deleteTodo}
            />
        </>
    );
}
