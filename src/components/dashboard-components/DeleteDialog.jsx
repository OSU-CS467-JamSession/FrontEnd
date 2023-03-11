import * as React from "react";
import Button from "@mui/material/Button";


export default function DeleteDialog({ ...props }) {

    const [attributeID, setAttributeID] = React.useState(null);
    const { userID } = props;
    const { setAttributeAdded } = props;
    const { title } = props;
    const {row} = props;
    const {name} = props;

    const handleClick = (event) => {
    
    event.preventDefault();
    const base_url = 'https://jamsession-cs467-w2023.uw.r.appspot.com/users/'
    const UserID_str = JSON.stringify(userID)

    const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", 'mode':'no-cors'},
    };

    var attributeID = null

    if (title == "instruments"){
    console.log(row.instrument_id)
    attributeID = row.instrument_id
    }
    if (title == "genres"){
    console.log(row.genre_id)
    attributeID = row.genre_id
    }

    const end_point = `${base_url}${UserID_str}/${title}/${attributeID}`
    console.log(end_point)
    const options = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'mode':'no-cors'},
      };

    fetch(
    end_point,
    options
    )
    .then((response) => setAttributeAdded(true))
    .catch((err) => console.error(err));
}

    return (
        setAttributeAdded(false),
        (
          <div>
            <Button onClick={handleClick}>Delete</Button>
          </div>
        )
      );

};
