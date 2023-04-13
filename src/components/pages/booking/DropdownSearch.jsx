import { ListItem, ListItemButton } from "@mui/material"
import List from "@mui/material/List"
import { useEffect, useState } from "react"
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/SearchOutlined';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';

const generateRecommendations = (input) => {
    // make some API call
    const recs = []
    for (let i = 0; i < Math.floor(Math.random() * 5 + 1); i++) {
        recs.push(
            <ListItemButton key={crypto.randomUUID()}>
                {input}
            </ListItemButton>
        )
    }
    return recs
}

const DropdownSearch = (props) => {
    const [showDropdown, setShowDropdown] = useState(false)
    const [searchQuery, setSearchQuery] = useState("")
    return <>
        <TextField
            placeholder="provider, dentist, procedure, condition"
            InputProps={{
                startAdornment: (
                    <InputAdornment position="start">
                        <SearchIcon />
                    </InputAdornment>
                ),
            }}
            onChange={(e) => {
                if (!e.target.value) {
                    setShowDropdown(false)
                    return
                }
                setSearchQuery(e.target.value)
                setShowDropdown(true)
            }}
            onBlur={(e) => {
                setShowDropdown(false)
            }}
            variant="outlined"
            style={{ width: "21em" }}
        />
        { showDropdown ? 
        <List style={{
            borderStyle: "outset", backgroundColor: "white",
            width: "18em", position: "absolute", zIndex: "1", marginLeft: "1.5em"
        }} >
            {generateRecommendations(searchQuery)}
        </List>
        :
        <></> }
    </>
}

export default DropdownSearch;