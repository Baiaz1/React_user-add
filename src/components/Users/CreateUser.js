import React, { useState } from 'react'
import Card from '../UI/Card';
import styles from './CreateUser.module.css'
import Button from '../UI/Button';
import ErrorModal from '../UI/ErrorModal';

function CreateUser(props) {

    const [inputName, setInputName] = useState('')
    const [inputAge, setInputAge] = useState('')
    const [error, setError] = useState()

    const nameChangeHandler = (e) => {
        setInputName(e.target.value)
    }

    const ageChangeHandler = (e) => {
        setInputAge(e.target.value)
    }

    const errorHandler = () => {
        setError(false)
    }

    const createUserHandler = (e) => {
        e.preventDefault();
        if(inputName.trim().length === 0 || inputAge.trim().length === 0){
            setError({
                title: 'Incorrect inputs',
                message: 'This inputs can not be empty'
            })
            return  
        }
        if(+inputAge < 1){
            setError({
                title: 'Incorrect age',
                message: 'Age have to be more then 0'
            })
            return
        }
        props.onCreateUser(inputName, inputAge)
        setInputName('')
        setInputAge('')
    }

    return (
        <>
            {error && <ErrorModal title={error.title} message={error.message} onCloseModal={errorHandler}/>}
            <Card className={styles.input}>
                <form onSubmit={createUserHandler}>
                    <label htmlFor='name'>Name</label>
                    <input type='text' id='name' onChange={nameChangeHandler} value={inputName}/>
                    <label htmlFor='age'>Age</label>
                    <input type='number' id='age' onChange={ageChangeHandler} value={inputAge}/>
                    <Button type='submit'>Add user</Button>
                </form>
            </Card>
        </>
    )
}

export default CreateUser