import React, {useCallback, useEffect, useState} from 'react';
import "./Form.css"
import {useTelegram} from "../../hooks/useTelegram";

const Form = () => {
    const [country, setCountry] = useState();
    const [subject, setSubject] = useState('physical');
    const [street, setStreet] = useState();
    const {tg} = useTelegram();

    const onSendData = useCallback(() => {
        const data = {
            country,
            street,
            subject
        }
        tg.sendData(JSON.stringify(data))
    }, [country, street, subject])

    useEffect(() => {
        tg.onEvent('mainButtonClicked', onSendData)
        return () => {
            tg.offEvent('mainButtonClicked', onSendData)

        }
    }, []);

    useEffect(() => {
        tg.MainButton.setParams({
            text: 'Отправить данные'
        })
    }, []);

    useEffect(() => {
        if(!country || !street) {
            tg.MainButton.hide()
        } else {
            tg.MainButton.show()
        }
    }, [country, street])

    const onCountryChange = (e) => {
        setCountry(e.target.value)
    }

    const onSubjectChange = (e) => {
        setSubject(e.target.value)
    }

    const onStreetChange = (e) => {
        setStreet(e.target.value)
    }


    return (
        <div className={'form'}>
            <h3>Введите ваши данные</h3>
            <input className={'input'} type="text" placeholder={"Страна"} value={country} onChange={onCountryChange}/>
            <input className={'input'} type="text" placeholder={"Улица"} value={street} onChange={onStreetChange}/>
            <select className={"select"} value={subject  } onChange={onSubjectChange}>
                <option value={"physical"}>Юр. лицо</option>
                <option value={"legal"}>Физ. лицо</option>
            </select>
        </div>
    );
};

export default Form;