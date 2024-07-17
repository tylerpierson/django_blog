import { useState, useEffect } from 'react'
import TodoList from './components/TodoList/TodoList'
import styles from './App.module.scss'


export default function App(){
    const [todos, setTodos] = useState([])
    const [completedTodos, setCompletedTodos] = useState([])
    const [newTodo, setNewTodo] = useState({
        subject: '',
        completed: false
    })

    //createTodos
    const createTodo = async () => {
        const body = {...newTodo}
        try {
            const response = await fetch('34.203.226.236:8000/todos/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            const createdTodo = await response.json()
            const todosCopy = [createdTodo,...todos]
            setTodos(todosCopy)
            setNewTodo({
                subject: '',
                completed: false
            })
        } catch (error) {   
            console.error(error)
        }
    }
    //deleteTodos
    const deleteTodo = async (id) => {
        try {
            await fetch(`34.203.226.236:8000/todos/${id}/`, {
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

    //moveToCompleted
    const moveToCompleted = async (id) => {
        try {
            const index = todos.findIndex((todo) => todo.id === id)
            const todosCopy = [...todos]
            const subject = todosCopy[index]
            subject.completed = true 
            const response = await fetch(`34.203.226.236/todos/${id}/`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subject)
            })
            const updatedTodo = await response.json()
            const completedTDsCopy = [updatedTodo, ...completedTodos]
            setCompletedTodos(completedTDsCopy)
            todosCopy.splice(index, 1)
            setTodos(todosCopy)
        } catch (error) {
            console.error(error)
        }
    }
    //getTodos
    const getTodos = async () => {
        try {
            const response = await fetch('34.203.226.236:8000/todos/');
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
        getTodos()
    }, [])
    return(
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
    )
}