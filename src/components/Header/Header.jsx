import React from 'react';
import Button from '../Button'

const Header = () => {
    const tg = window.Telegram.WebApp;
    const onClose = () => {
        tg.close();
    }

    return (
        <div className={'header'}>
            <Button onCLick={onClose}>Закрыть</Button>
            <span className={'username'}>
                {tg.initDataUnsafe?.user?.username}
            </span>
        </div>
    );
};

export default Header;