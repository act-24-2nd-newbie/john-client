import styles from './Dropdown.module.css';
import {useEffect, useRef, useState} from "react";
import commonUtil from "../../utils/commonUtil.js";

export default function Dropdown({options, selectedOptionKey, onSelect}) {
    const [isOpen, setIsOpen] = useState(false);
    const dropDownRef = useRef(null);
    const selectedOption = options.find(option => option.key === selectedOptionKey);

    useEffect(() => {
        return commonUtil.registerOutsideClickHandler(dropDownRef, () => {
            setIsOpen(false);
        });
    }, []);

    function handleDropdownClick() {
        setIsOpen((prev) => !prev);
    }

    function handleDropdownItemClick(key) {
        setIsOpen(false);
        onSelect?.(key);
    }

    return (
        <div ref={dropDownRef} className={`${styles['dropdown']} ${isOpen && styles['opened']}`}>
            <div className={styles['dropdown-item-wrapper']} onClick={handleDropdownClick}>
                <div className={styles['dropdown-label']}>
                    {selectedOption.label}
                </div>
                <div className={`${styles['dropdown-button-wrapper']} ${isOpen ? styles['up'] : styles['down']}`}/>
            </div>
            {isOpen && <div className={styles['dropdown-item-container']}>
                {
                    options.map((option) => (
                        <div
                            className={`${styles['dropdown-item-wrapper']} ${option.key === selectedOptionKey && styles['selected']}`}
                            key={option.key}
                            onClick={() => {
                                handleDropdownItemClick(option.key)
                            }}>
                            {option?.label}
                        </div>
                    ))
                }
            </div>}
        </div>
    )
}