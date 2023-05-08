import {AppDefinition} from "./apps";
import {useEffect} from "react";

export const AppWrapper = (props: AppDefinition) => {
    useEffect(() => {
        document.title = props.title;
    }, []);

    return <props.component/>;
}
