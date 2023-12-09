import React, { useState, useContext, useEffect } from 'react';
import '../../index.css'
import SearchIcon from '@mui/icons-material/Search';
import { InputAdornment, TextField } from '@mui/material';


export default function SearchBar({state, setState, handleSearch, handleClearSearch, searchTerm, setSearchTerm }) {
    
    const [filteredSuggestions, setFilteredSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    
    const uniqueCoffeeNames = Array.from(new Set(state.map((object) => object.name))).sort();

    const handleInputChange = (event) => {
        const text = event.target.value;
        setSearchTerm(text);
        if (text === '') {
            handleClearSearch()

        } else {
            const filtered = state.filter((suggestion) =>
                suggestion.name.toLowerCase().includes(text.toLowerCase())
            );
            setFilteredSuggestions(filtered);
            handleSearch(filtered)
        }
        setShowSuggestions(true);
    };

    const handleSuggestionClick = (suggestion) => {
        setSearchTerm(suggestion.name);
        setShowSuggestions(false);
    };
    
    return (
        <div className="autocomplete">
            <div>
                <input
                    type="text"
                    value={searchTerm}
                    onChange={handleInputChange}
                    placeholder={"Type to search..."}
                    className='autofill-search-bar'
                />
                <span className='magnifying-glass'><SearchIcon /></span>          
            </div>
            {showSuggestions && (
                searchTerm !== '' && (
                    <div className="suggestions">
                        {filteredSuggestions.length === 0 ? (
                            <p>No matching coffees found.</p>
                        ) : (                           
                            filteredSuggestions.map((suggestion, index) => (
                                <p
                                key={index}
                                onClick={() => handleSuggestionClick(suggestion)}
                                >
                                {suggestion.name}
                                </p>
                                ))
                                )}
                    </div>
                )
            )}
        </div>
    );
}
