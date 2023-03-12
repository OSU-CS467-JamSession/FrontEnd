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
 
    var UserID_str = JSON.stringify(userID)

    const requestOptions = {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json', "Access-Control-Allow-Origin": "*", 'mode':'no-cors'},
    };
    let base_url = 'https://jamsession-cs467-w2023.uw.r.appspot.com/'
    var attributeID = null
  
    if (title == "instruments"){
    console.log(row.instrument_id)
    attributeID = row.instrument_id
    base_url = base_url + 'users/'
    }
    if (title == "genres"){
    console.log(row.genre_id)
    attributeID = row.genre_id
    base_url = base_url + 'users/'
    }
    if (title == "posts"){
    console.log(row.post_id)
    attributeID = row.post_id
    UserID_str = "";
    }

    console.log(title)

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
