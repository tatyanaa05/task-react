import { subscribe, unsubscribe } from './resources/API';
import React, { useEffect, useRef, useState } from 'react';

interface Props {
    sourceId: string;
}

export const Effects: React.FC<Props> = ({ sourceId }) => {
    const [message, setMessage] = useState<number>(-1);
    const callbackRef = useRef<(payload: number) => void>(() => {});

    useEffect(() => {
        setMessage(-1);

        const handler = (payload: number) => {
            setMessage(payload);
        };

        // Сохраняем ссылку на текущий callback
        callbackRef.current = handler;

        // Подписываемся на новый источник
        subscribe(sourceId, handler);

        // Отписка при изменении sourceId или размонтировании
        return () => {
            try {
                unsubscribe(sourceId, callbackRef.current);
            } catch (e) {
                console.error(e);
            }
        };
    }, [sourceId]);

    return (
        <div>
            {sourceId}: {message}
        </div>
    );
};
