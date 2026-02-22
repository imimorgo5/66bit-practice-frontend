import { useRef, useEffect } from 'react';
import { ArrowIcon, CheckIcon } from '../Icons/Icons';
import './FilterDropdown.css';

export const FilterDropdown = ({ title, options, selectedValues, onToggle, isOpen, onOptionChange, align = 'center' }) => {
    const dropdownRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target) && isOpen) {
                onToggle(null);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen, onToggle]);

    return (
        <div className={`filter-dropdown-wrapper align-${align}`} ref={dropdownRef}>
            <button
                className={`filter-dropdown-btn ${isOpen ? 'active' : ''}`}
                onClick={() => onToggle(isOpen ? null : title)}
                type="button"
            >
                <span>{title}</span>
                <ArrowIcon isOpen={isOpen} />
            </button>

            {isOpen && (
                <div className="filter-dropdown-menu">
                    {options.map((option) => (
                        <label key={option.value} className="filter-dropdown-item">
                            <span>{option.label}</span>
                            <input
                                type="checkbox"
                                checked={selectedValues.includes(option.value)}
                                onChange={() => onOptionChange(option.value)}
                            />
                            <span className="custom-checkbox">
                                {selectedValues.includes(option.value) && <CheckIcon />}
                            </span>
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};