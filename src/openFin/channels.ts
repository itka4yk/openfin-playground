type Channel = {
    title: string;
    isGlobal: boolean;
    topics: Record<string, {
        name: string;
    }>;
}

export const CHANNELS: Record<string, Channel> = {
    files: {
        title: 'files',
        isGlobal: true,
        topics: {
            onNewFile: {
                name: 'on-new-file'
            },
        }
    }
}
