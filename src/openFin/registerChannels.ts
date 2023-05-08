import {CHANNELS} from "./channels";

export async function registerChannels() {
    await Promise.all(Object
        .entries(CHANNELS)
        .filter(([_, details]) => details.isGlobal)
        .map(async ([channelName]) => {
            const connection = await window.fin.InterApplicationBus.Channel.create(channelName);
            connection.setDefaultAction((topic: string, payload: unknown) => {
                connection.publish(topic, payload);
                return 'Ok';
            });
            return 'ok'
        }));
}
