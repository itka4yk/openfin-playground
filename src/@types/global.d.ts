import Fin from "@openfin/core/src/api/fin";

declare global {
    interface Window {
        fin: Fin;
    }
}
