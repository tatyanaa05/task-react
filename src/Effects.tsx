import React, { useEffect, useState, useRef } from 'react';
import { subscribe, unsubscribe } from './resources/API';

const getName = (id: string): string => `Источник ${id}`;

interface Props {
    sourceId: string;
}

export const SourceInfo: React.FC<Props> = ({ sourceId }) => {
    const [message, setMessage] = useState<number>(-1);
    const [name, setName] = useState<string>('');

    const callbackRef = useRef<(payload: number) => void>(() => {});

    useEffect(() => {
        setName(getName(sourceId));
        setMessage(-1);

        const handleMessage = (payload: number) => {
            setMessage(payload);
        };

        callbackRef.current = handleMessage;

        subscribe(sourceId, handleMessage);

        return () => {
            try {
                unsubscribe(sourceId, callbackRef.current);
            } catch (e) {
                console.error('Ошибка отписки:', e);
            }
        };
    }, [sourceId]);

    return (
        <div>
            {name}: {message}
        </div>
    );
};
