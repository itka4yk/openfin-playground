import {useEffect, useState} from "react";
import {getConfiguredSettings, registerHome} from "../openFin/registerHome";
import {registerDock, showDock} from "../openFin/registerDock";
import {BrowserInitConfig, getCurrentSync, init} from "@openfin/workspace-platform";
import {apps} from "../apps/apps";
import {registerChannels} from "../openFin/registerChannels";

const initializePlatform = async (cb: () => void) => {
    const platform = window.fin.Platform.getCurrentSync();
    await platform.once("platform-api-ready", async () => {
        await getConfiguredSettings();
        await registerHome();
        await registerDock();
        await registerChannels();
        showDock();
        cb();
    });

    const browser: BrowserInitConfig = {};
    await init({
        browser,
        customActions: {
            'launch-app': async (payload: any) => {
                const app = apps.find((a) => a.appId === payload.customData.appId);
                if (app) {
                    const platform = getCurrentSync();
                    await platform.launchApp({app});
                }
            }
        }
    })
}

export const OpenFinProvider = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        initializePlatform(() => {
            setIsLoading(false);
        });
    }, []);

    return (
        <div>
            {isLoading ? 'Is loading ...' : (
                <>
                    <button onClick={async () => {
                        const platform = getCurrentSync();
                        const app = apps.find((a) => a.appId === 'newFile')!;
                        platform.launchApp({
                            app
                        })
                    }}>Create new file
                    </button>
                </>
            )}
        </div>
    )
}
