import {ChangeEvent, useEffect, useState} from "react";
import ChannelClient from "@openfin/core/src/api/interappbus/channel/client";
import {CHANNELS} from "../../openFin/channels";
import {getCurrentCtx, updateContext} from "../../openFin/interop";

export const NewFile = () => {
    const [connection, setConnection] = useState<ChannelClient | undefined>();
    const [fileName, setFileName] = useState<string>('');

    const [userName, setUserName] = useState<string>('');

    function handle() {
        if (!connection) return;
        window.fin.InterApplicationBus.publish(
            'files',
            fileName,
        )
        // connection.dispatch(
        //     CHANNELS.files.topics.onNewFile.name,
        //     fileName,
        // );
        setFileName('');
    }

    const handleUserNameChange = (e: ChangeEvent<HTMLInputElement>) => {
        setUserName(e.target.value);
        updateContext(e.target.value);
    }

    const initializeChannel = async () => {
        const connection = await window.fin.InterApplicationBus.Channel.connect(CHANNELS.files.title);
        setConnection(connection);
        const ctx = await getCurrentCtx();
        console.log('CTX', ctx);
    }
    useEffect(() => {
        initializeChannel();
    }, []);

    const createNewTab = (position: string) => async () => {
        const currentStack = await window.fin.me.getCurrentStack();
        await currentStack.createAdjacentStack([
            {url: 'http://localhost:3000/files'},
        ], {position});
    }

    return (
        <div>
            <input value={fileName} onChange={(e) => setFileName(e.target.value)}/>
            <button onClick={handle}>add new file</button>
            <br/>
            <button onClick={createNewTab('top')}>top</button>
            <button onClick={createNewTab('right')}>right</button>
            <button onClick={createNewTab('left')}>left</button>
            <button onClick={createNewTab('bottom')}>bottom</button>
            <br/>
            <span>Update ctx user: </span><input value={userName} onChange={handleUserNameChange}/>
        </div>
    )
};
