import React, {useState} from 'react';
import classes from './styles/GonnaEvent.module.css';
import CommonButton from "../../Buttons/CommonButton/CommonButton";
import {API_URL} from "../../../config/API_CONFIG";
import CommonLabel from "../../Inputs/Labels/CommonLabel/CommonLabel";
import TextInput from "../../Inputs/TextInput/TextInput";
import RadioInput from "../../Inputs/RadioInput/RadioInput";

const GonnaEvent = ({eventId, eventName}) => {
    const [fullName, setFullName] = useState('');
    const [age, setAge] = useState('parent');
    const [count, setCount] = useState(1);
    // eslint-disable-next-line
    const [dateRegistry, setDateRegistry] = useState(new Date().toISOString());

    const handleSubmit = async (e) => {
        e.preventDefault();

        const clientData = {
            fullName,
            age,
            count,
            dateRegistry,
            idEvent: eventId,
            nameEvent: eventName,
        };

        try {
            const res = await fetch(`${API_URL}/api/clients`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({data: clientData}),
            });

            const result = await res.json();
            if (res.ok) {
                alert('Вы успешно записаны, увидимся на мероприятии!');
            } else {
                console.error('Ошибка при записи:', result);
                alert('Ошибка при записи.');
            }
        } catch (error) {
            console.error('Ошибка при записи:', error);
            alert('Ошибка при записи.');
        }
    };


    return (<div className={classes.container}>
        <h2 className={classes.header}>Запись на мероприятие</h2>
        <form onSubmit={handleSubmit} className={classes.form}>
            <div className={classes.form__inputs}>
                <CommonLabel toward="username">Ваше имя:</CommonLabel>
                <TextInput
                    id="username"
                    type="text"
                    placeholder="Иванов Иван Иванович"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />
            </div>
            <div className={classes.form__inputs}>
                <CommonLabel>Вы родитель или ребенок?</CommonLabel>
                <div className={classes.form__radioGroup}>
                    <RadioInput
                        name="age"
                        value="parent"
                        checked={age === 'parent'}
                        onChange={(e) => setAge(e.target.value)}
                    >
                        Родитель
                    </RadioInput>
                    <RadioInput
                        name="age"
                        value="child"
                        checked={age === 'child'}
                        onChange={(e) => setAge(e.target.value)}
                    >
                        Ребенок
                    </RadioInput>
                </div>
            </div>
            <div className={classes.form__inputs}>
                <CommonLabel toward="childrens">Сколько детей придет с вами?</CommonLabel>
                <TextInput
                    id="childrens"
                    type="number"
                    placeholder="1"
                    value={count}
                    onChange={(e) => setCount(e.target.value)}
                    required
                />
            </div>
            <CommonButton type="submit">Записаться на мероприятие</CommonButton>
        </form>
    </div>);
};

export default GonnaEvent;