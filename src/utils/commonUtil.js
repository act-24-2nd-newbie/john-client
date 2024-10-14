function registerOutsideClickHandler(ref, onClickOutside) {
    function handleOutsideClick(e) {
        if (ref.current && !ref.current.contains(e.target)) {
            onClickOutside?.();
        }
    }

    document.addEventListener('click', handleOutsideClick);
    return () => {
        document.removeEventListener('click', handleOutsideClick);
    }
}

export default {
    registerOutsideClickHandler,
}