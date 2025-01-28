import React, { useState } from 'react';
import styled from 'styled-components';
import { API_URL } from '../config/API_CONFIG';

const RecordBox = styled.div`
  width: 100%;
  max-width: 687px;
  height: 100%;
  min-height: 424px;
  font-family: var(--font-family);
  padding: 20px;
`;

const RecordHeader = styled.h2`
  font-size: 32px;
  font-weight: 400;
  color: var(--dark-night);
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 20px;
  width: 100%;
  height: 87.26415094339623%;
  min-height: 298px;
`;

const Label = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: var(--dark-night);
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 25px;
  border: 1px solid #ccc;
  width: 100%;
  box-sizing: border-box;
`;

const RadioGroup = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
`;

const RadioLabel = styled.label`
  font-size: 20px;
  font-weight: bold;
  color: var(--dark-night);
  display: flex;
  align-items: center;
  gap: 5px;
`;

const RadioInput = styled.input`
  opacity: 0;
  position: absolute;

  &:checked + span {
    background-color: var(--pure-white);
    border: 1px solid var(--dark-night);
  }

  &:checked + span::before {
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: var(--sunset-orange);
    margin: 4px;
  }
`;

const CustomRadio = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  border: 1px solid var(--royal-lilac);
  border-radius: 50%;
  transition: background-color 0.3s, border-color 0.3s;
  position: relative;
`;

const Button = styled.button`
  padding: 15px 20px;
  font-size: 16px;
  border: none;
  border-radius: 25px;
  background-color: var(--royal-lilac);
  color: var(--pure-white);
  font-family: var(--font-family);
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: var(--sunset-orange);
  }
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  height: 19.81132075471698%;
`;

const RecordBlock = ({ eventId, eventName }) => {
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
                body: JSON.stringify({ data: clientData }),
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

    return (
        <RecordBox>
            <RecordHeader>Запись на мероприятие</RecordHeader>
            <Form onSubmit={handleSubmit}>
                <InputWrapper>
                    <Label>Ваше имя:</Label>
                    <Input
                        type="text"
                        placeholder="Иванов Иван Иванович"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        required
                    />
                </InputWrapper>
                <InputWrapper>
                <Label>Вы родитель или ребенок?</Label>
                    <RadioGroup>
                        <RadioLabel>
                            <RadioInput
                                type="radio"
                                name="age"
                                value="parent"
                                checked={age === 'parent'}
                                onChange={(e) => setAge(e.target.value)}
                            />
                            <CustomRadio />
                            Родитель
                        </RadioLabel>
                        <RadioLabel>
                            <RadioInput
                                type="radio"
                                name="age"
                                value="child"
                                checked={age === 'child'}
                                onChange={(e) => setAge(e.target.value)}
                            />
                            <CustomRadio />
                            Ребенок
                        </RadioLabel>
                    </RadioGroup>
                </InputWrapper>
                <InputWrapper>
                <Label>Сколько детей придет с вами?</Label>
                    <Input
                        type="number"
                        placeholder="1"
                        value={count}
                        onChange={(e) => setCount(e.target.value)}
                        required
                    />
                </InputWrapper>
                <Button type="submit">Записаться на мероприятие</Button>
            </Form>
        </RecordBox>
    );
};

export default RecordBlock;
