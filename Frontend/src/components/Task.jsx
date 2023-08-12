import '../index.css'
import axios from 'axios'
import { useState } from 'react'
function Task({tache,fait,idd,Finies, updateFin,tasks, updatetasks,Crees,updateCreation}) {
    //Faitt is to know if the task is done or not 
    const [Faitt, updateFait] = useState(fait)
    //this is the same logic used in the envoi function
    const [isRequesting,setIsRequesting] = useState(false)
   
    async function toggleCheck() {
        // If a request is ongoing , do nothing.
        if (isRequesting) return;
    
        setIsRequesting(true);
    
        try {
            //when a task is checked or unchecked we modify the 'done' value of the object in our database
            await axios.put(`http://localhost:3000/api/todo/${idd}`);
            //we change the value depending on if it was checked or unchecked , we can know it thanks to Faitt's state
            if (Faitt) { 
                updateFait(false);
                console.log(tache);
                updateFin(Finies - 1);
            } else { 
                updateFait(true);
                console.log(tache);
                updateFin(Finies + 1);
            }
        } catch (error) {
            console.error("Error in toggleCheck:", error);
        }
    
        setIsRequesting(false);
    }
    
   

    async function sup() {
    // we delete the task from the database
    await axios.delete(`http://localhost:3000/api/todo/${idd}`);

    // Update the state of tasks by filtering the deleted task
    const newtasks = [...tasks].filter((task) => {
      return task._id !== idd;
    });
    //if the deleted task was done we also modify the state of 'Finies'
    if (Faitt){
        updateFin(Finies-1);
    }
    //we update the state of tasks and Crees
    updatetasks(newtasks);
    updateCreation(Crees-1)
    
  };
    

//the style depends on if the task was checked or not
return !Faitt? (
    <div className="w-[50%] bg-indigo-500 mt-4 mx-auto rounded p-2">
    <div className="flex items-center w-[100%] justify-between">
    <img className="h-[100%] w-[auto] cursor-pointer" alt='check' src="/Layer 1.png" onClick={toggleCheck}></img>
    <div className='w-[50%] md:w-[80%] text-center'>
    <p className="text-white text-[14px] md:text-[16px] break-words kk">{tache}</p>
    </div>
    <img className="h-4 md:h-6 w-[auto] mx-2 md:mx-4 cursor-pointer" alt='check' src="/supprimer.png" onClick={sup}></img>
    </div>
    </div>
) : (
    <div className="w-[50%] bg-indigo-500 mt-4 mx-auto rounded p-2">
    <div className="flex items-center w-[100%] justify-between">
    <img className="h-[100%] w-[auto] cursor-pointer" alt='check' src="/Layer 1(1).png" onClick={toggleCheck}></img>
    <div className='w-[50%] md:w-[80%] text-center'>
    <p className="text-white break-words line-through text-[#333333] text-[14px] md:text-[16px] kk" >{tache}</p>
    </div>
    <img className="h-4 md:h-6 w-[auto] mx-2 md:mx-4 cursor-pointer" alt='check' src="/supprimer.png" onClick={sup}></img>
    </div>
    </div>
)
}

export default Task