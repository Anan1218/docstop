import { ListItem, ListItemButton } from "@mui/material"
import List from "@mui/material/List"

const generateRecommendations = (input) => {
    // make some API call
    const recs = []
    for (let i = 0; i < 4; i++) {
        recs.push(
            <ListItemButton>
                test completion
            </ListItemButton>
        )
    }
    return recs
}

const Dropdown = (props) => {
    return <List style={{
        borderStyle: "outset", backgroundColor: "white",
        width: "18em", position: "absolute", zIndex: "1", marginLeft: "1.5em"
    }} >
        {generateRecommendations()}
    </List>
}

export default Dropdown;