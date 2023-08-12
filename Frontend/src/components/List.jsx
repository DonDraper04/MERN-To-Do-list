import '../index.css'
import Task from './Task'

function List({Finies, updateFin,tasks, updatetasks,Crees,updateCreation}){
    //we passed multiple props to this function because we will need them to handle the changes done to every task (deleting it , checking it ...)
 return(
    <div>
    {tasks && tasks.map((va)=>(
        <Task tache={va.task} idd={va._id} fait={va.done} tasks={tasks} Crees={Crees} updateCreation={updateCreation} updatetasks={updatetasks} Finies={Finies} updateFin={updateFin} key={va._id}/>
    ))}
    </div>
 )
}

export default List