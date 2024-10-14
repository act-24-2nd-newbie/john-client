import {useRecoilState} from "recoil";
import {toastsState} from "../atoms.js";
import {v4} from "uuid";

export function useToast() {
    const [toasts, setToasts] = useRecoilState(toastsState);

    function deleteToast(id) {
        setToasts(prev => prev.filter(toast => (toast.id !== id)));
    }

    function addToast(message, duration = 3000) {
        const id = v4();
        setToasts((prev) => {
            return [{id, message}, ...prev].slice(0, 4);

        })
        setTimeout(() => {
            deleteToast(id);
        }, duration);
    }

    return {toasts, addToast, deleteToast};
}