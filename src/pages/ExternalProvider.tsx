import {useEffect, useState} from "react";

export const ExternalProvider = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [userName, setUserName] = useState('');

    const subscribe = async () => {
        try {
            const externalBroker = await window.fin.Interop.connectSync('Main');
            const ctxGroups = await externalBroker.getContextGroups();
            await externalBroker.joinContextGroup(ctxGroups[0].id);
            await externalBroker.addContextHandler(async (ctx: any) => {
                console.log('Received new context', ctx);
                setUserName(ctx?.data?.currentUser);
            })

            console.log('Subscribed to external platform context');
        } catch (e) {
            console.log('Failed to subscribe to external platform context', e);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        subscribe();
    }, []);

    return (
        <div>
            External provider: {window.fin.me.uuid}
            <br/>
            {isLoading ? 'Is loading ...' : (
                <>
                    External plaftorm username: {userName}
                </>
            )}
        </div>
    )
}
