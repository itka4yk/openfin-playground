import React from "react";
import {Files} from "./files/Files";
import {App} from "@openfin/workspace";
import {NewFile} from "./newFile/NewFile";

export type AppDefinition = {
    title: string;
    path: string;
    component: React.FC;

    appId: string;
    manifest: string;
} & App;

export const apps: AppDefinition[] = [
    {
        appId: 'files',
        title: 'Files list',
        path: '/files',
        component: Files,
        manifest: 'http://localhost:3000/manifests/files.manifest.json',
        manifestType: 'view',
        publisher: 'itka4yk',
        icons: [
            {
                src: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/2008px-Google_%22G%22_Logo.svg.png"
            }
        ],
        secondaryButtons: [
            {
                title: "Open Web Site",
                action: {
                    id: "open-web-site",
                    customData: {
                        url: "https://www.experoinc.com/"
                    }
                }
            }
        ]
    },
    {
        appId: 'newFile',
        title: 'New file',
        path: '/new-file',
        component: NewFile,
        manifest: 'http://localhost:3000/manifests/newFile.manifest.json',
        manifestType: 'view',
        publisher: 'itka4yk',
        icons: [
            {
                src: "https://cdn.iconscout.com/icon/free/png-256/free-plus-1439731-1214303.png?f=webp&w=256"
            }
        ],
    }
]
