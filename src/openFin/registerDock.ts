import {
    Dock,
    DockProvider
} from "@openfin/workspace";
import {apps} from "../apps/apps";

export async function registerDock() {
    const cliProvider: DockProvider = {
        title: 'Das catalog',
        id: 'dock',
        icon: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png',
        workspaceComponents: {},
        buttons:
            apps.map((a) => ({
                tooltip: a.title,
                iconUrl: a.icons[0].src,
                action: {
                    id: 'launch-app',
                    customData: {
                        appId: a.appId,
                    }
                }
            }))
    }

    await Dock.register(cliProvider);
}

export async function showDock() {
    return Dock.show();
}
