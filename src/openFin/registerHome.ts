import {
    Home,
    HomeDispatchedSearchResult,
    HomeProvider,
    HomeSearchListenerRequest,
    HomeSearchListenerResponse,
    HomeSearchResponse
} from "@openfin/workspace";

declare global {
    interface Window {
        fin: any;
    }
}

export async function getConfiguredSettings() {
}

export async function registerHome() {
    const homeProvider = {
        "id": "customize-home-templates",
        "title": "My custom home component",
        description: "test description",
        inputPlaceholder: "input placeholder",
        "icon": "http://localhost:8080/favicon.ico",
        listTitle: "Custom list title"
    }

    let lastResponse: HomeSearchListenerResponse;
    const onUserInput = async (
        request: HomeSearchListenerRequest,
        response: HomeSearchListenerResponse,
    ): Promise<HomeSearchResponse> => {
        const queryLower = request.query.toLowerCase();

        if (lastResponse) {
            lastResponse.close();
        }
        lastResponse = response;
        lastResponse.open();

        const searchResults: HomeSearchResponse = {
            results: []
        }

        return searchResults;
    }

    const onSelection = async (result: HomeDispatchedSearchResult) => {
    }

    const cliProvider: HomeProvider = {
        title: homeProvider.title,
        id: homeProvider.id,
        icon: homeProvider.icon,
        onUserInput,
        onResultDispatch: onSelection,
        dispatchFocusEvents: true,
    }

    const registrationInfo = await Home.register(cliProvider);
    return registrationInfo;
}

export async function show() {
    return Home.show();
}

export async function hide() {
    return Home.hide();
}
