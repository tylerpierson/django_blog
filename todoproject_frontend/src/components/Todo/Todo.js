import styles from './Todo.module.scss'


export default function Todo({ todo, buttonAction, buttonText}){
    return(
        <div className={styles.todo}> {todo.subject}
            <button 
                className={styles.button}
                onClick={() => buttonAction(todo.id)}
            >
                {buttonText}
            </button>
        </div>
    )
}