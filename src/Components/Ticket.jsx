import React from 'react'
import { GrInProgress } from "react-icons/gr";
import { MdOutlineDoneOutline } from "react-icons/md";
import { PiArchiveTrayBold } from "react-icons/pi";
import { Link } from 'react-router-dom';

const Ticket = ({ listId, sno, content, date, status, viewTaskModalState }) => {
    return (
        <Link className='TodoList_container' to={`/view-task/${listId}`} onClick={viewTaskModalState}>
            <div>{sno}</div>
            <div className='TodoList_container__content'>
                <h5>{content}</h5>
                <h6>{date}</h6>
            </div>
            <h5>
                {status === "completed" ? (
                    <MdOutlineDoneOutline className='globalGreen' size={25} />
                ) : status === "aborted" ? (
                    <PiArchiveTrayBold className='globalRed' size={25} />
                ) : (
                    <GrInProgress className='globalYellow' size={25} />
                )}
            </h5>
        </Link>
    )
}

export default Ticket