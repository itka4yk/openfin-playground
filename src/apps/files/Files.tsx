import {useEffect, useState} from "react";
import {subscribeToContext} from "../../openFin/interop";

export const Files = () => {
    const [files, setFiles] = useState<string[]>([
        '1',
        '2',
        '3',
        '4',
    ]);
    const [ctx, setCtx] = useState<any>({});

    const initializeChannel = async () => {
        window.fin.InterApplicationBus.subscribe(
            {uuid: '*'},
            'files',
            (t: string) => {
                setFiles((prev) => [...prev, t as string]);
            }
        );
        await subscribeToContext((ctx) => {
            console.log('ctx updated', ctx);
            setCtx(ctx?.data?.currentUser);
        });
    }
    useEffect(() => {
        initializeChannel();

        window.fin.Application.getCurrent().then((c: any) => c.getChildWindows()).then((w: any) => {
            w.map((a: any) => console.log(a.identity))
        })

    }, []);

    const createNewTab = (position: string) => async () => {
        const currentStack = await window.fin.me.getCurrentStack();
        await currentStack.createAdjacentStack([
            {url: 'http://localhost:3000/new-file'},
        ], {position});
    }

    return (
        <div>
            Files:
            <ul>
                {files.map((f: any) => (
                    <li>{f}</li>
                ))}
            </ul>
            <button onClick={createNewTab('top')}>top</button>
            <button onClick={createNewTab('right')}>right</button>
            <button onClick={createNewTab('left')}>left</button>
            <button onClick={createNewTab('bottom')}>bottom</button>
            <br/>
            Current user name: {JSON.stringify(ctx)}
        </div>
    )
}
