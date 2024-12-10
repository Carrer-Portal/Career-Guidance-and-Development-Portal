import React from 'react'
import "./Homepage.css"
import DeleteIcon from '@mui/icons-material/Delete';
function Skillitem(props:any) {
    return (
        <div>
            <div>
                <p className="skill" >{props.item}
                    <DeleteIcon onClick={()=>{
                        props.onSelect(props.id);
                    }} />
                </p>
            </div>
        </div>
    )
}

export default Skillitem
