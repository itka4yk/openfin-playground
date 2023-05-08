export const initializeInterop = async () => {
    const broker = window.fin.Interop.connectSync(window.fin.me.uuid, {});
    const ctxGroups = await broker.getContextGroups();
    await broker.joinContextGroup(ctxGroups[0].id);
    await broker.setContext({
        id: ctxGroups[0],
        data: {
            currentUser: 'itka4yk'
        },
        type: "set"
    });
}

export const getCurrentCtx = async () => {
    const broker = window.fin.Interop.connectSync(window.fin.me.uuid, {});
    await broker.joinContextGroup('user');
    return await broker.getCurrentContext();
}

export const updateContext = async (newUser: string) => {
    try {
        const broker = window.fin.Interop.connectSync(window.fin.me.uuid, {});
        const ctxGroups = await broker.getContextGroups();
        await broker.joinContextGroup(ctxGroups[0].id);
        await broker.setContext({
            id: ctxGroups[0],
            data: {
                currentUser: newUser,
            },
            type: 'update'
        });
    } catch (e) {
        console.log('Failed to update context with value ' + newUser, e);
    }
}

export const subscribeToContext = async (cb: (ctx: any) => void) => {
    try {
        const broker = window.fin.Interop.connectSync(window.fin.me.uuid, {});
        await broker.joinContextGroup('user');
        await broker.addContextHandler(cb);
    } catch (e) {
        console.log('failed to subscribe to the ctx', e);
    }
    console.log('Subscribed to ctx');
}
