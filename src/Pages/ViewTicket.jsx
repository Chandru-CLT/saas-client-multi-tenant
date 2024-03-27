import React, { useEffect, useState } from 'react'
import Header from '../Components/Header'
import Ticket from '../Components/Ticket'
// import { findMyTodoListApi } from '../api/Todo'
// import { useDispatch, useSelector } from 'react-redux'
// import { setTaskList } from '../store/taskSlice'
// import Logout from '../components/Logout/Logout'

const ViewTicket = () => {
    const userId = localStorage.getItem("userId")
    const [taskList, settaskList] = useState()
    // const taskList = useSelector(state => state.task.taskList);
    const [apiDate, setapiDate] = useState()
    // const dispatch = useDispatch()

    // const fetchData = () => {
    //     if (taskList.length !== 1) {
    //         findMyTodoListApi(userId).then(res => {
    //             dispatch(setTaskList(res.data.myTodoList))
    //             setapiDate(res.data.myTodoList)
    //         }).catch(err => {
    //             console.log(err);
    //         })
    //     }
    // }

    // useEffect(() => {
    //     fetchData()
    // })

    // console.log("This value is from redux", taskList);

    return (
        <div className='Home_styles'>
            <div className='home_containerInner'>
                <Header />

                {taskList ? (
                    taskList.map((data, index) => (
                        <Ticket
                            key={index}
                            sno={index + 1}
                            content={data.title}
                            date={data.deadlineDate}
                            status={data.status}
                            listId={data._id}
                        />
                    ))
                ) : (
                    // apiDate.map((data, index) => (
                    //     <TodoList
                    //         key={index}
                    //         sno={index + 1}
                    //         content={data.title}
                    //         date={data.deadlineDate}
                    //         status={data.status}
                    //         listId={data._id}
                    //     />
                    // ))
                    <div>Loading...</div>
                )}

            </div>
            {/*<Logout /> */}
        </div>
    )
}

export default ViewTicket