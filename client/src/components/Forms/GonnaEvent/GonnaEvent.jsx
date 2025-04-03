import React, {useState} from 'react';
import classes from './styles/GonnaEvent.module.css';
import CommonButton from "../../Buttons/CommonButton/CommonButton";
import CommonLabel from "../../Inputs/Labels/CommonLabel/CommonLabel";
import TextInput from "../../Inputs/TextInput/TextInput";
import RadioInput from "../../Inputs/RadioInput/RadioInput";
import eventService from "../../../api/services/EventService";

const GonnaEvent = ({eventId, eventName}) => {
    const [name, setName] = useState('');
    const [adult, setAdult] = useState(true);
    const [quantity, setQuantity] = useState(1);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const visitorData = {
            name,
            adult,
            quantity: Number(quantity) + 1,
            event: eventId,
        };

        try {
            const res = await eventService.registerVisitor(visitorData);

            if (res?.data) {
                alert('Вы успешно записаны, увидимся на мероприятии!');
            } else {
                console.error('Ошибка при записи:', res);
                alert('Ошибка при записи.');
            }
        } catch (error) {
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
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>
            <div className={classes.form__inputs}>
                <CommonLabel>Вы родитель или ребенок?</CommonLabel>
                <div className={classes.form__radioGroup}>
                    <RadioInput
                        name="adult"
                        value={true}
                        checked={adult === true}
                        onChange={(e) => setAdult(e.target.value === 'true')}
                    >
                        Родитель
                    </RadioInput>
                    <RadioInput
                        name="adult"
                        value={false}
                        checked={adult === false}
                        onChange={(e) => setAdult(e.target.value === 'true')}
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
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                />
            </div>
            <CommonButton type="submit">Записаться на мероприятие</CommonButton>
        </form>
    </div>);
};

export default GonnaEvent;