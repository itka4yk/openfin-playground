import {useEffect, useState} from "react";
import ChannelClient from "@openfin/core/src/api/interappbus/channel/client";
import {CHANNELS} from "../../openFin/channels";

export const NewFile = () => {
    const [connection, setConnection] = useState<ChannelClient | undefined>();
    const [fileName, setFileName] = useState<string>('');

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

    const initializeChannel = async () => {
        const connection = await window.fin.InterApplicationBus.Channel.connect(CHANNELS.files.title);
        setConnection(connection);
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
        </div>
    )
};
