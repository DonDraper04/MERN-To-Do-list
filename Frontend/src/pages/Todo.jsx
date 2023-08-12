import '../index.css'
import { useState , useEffect , useRef } from 'react'
import List from '../components/List'
import axios from 'axios'

function Todo() {
    //for the count of created tasks
    const [Crees, updateCreation] = useState(0)
    //for the count of done tasks
    const [Finies, updateFin] = useState(0)
    //array that contains the object from the database
    const [tasks, updatetasks] = useState([])
    //this is the input's state
    const [Env, updateEnv] = useState('')
    //this is to don't let the user send a request before the previous request has been submitted
    const [isSubmitting, setIsSubmitting] = useState(false);
    //A hook to control inputs
    const inputRef = useRef(null);
    
    //we execute the fetchTodo function in every refresh
    useEffect(() => {
        fetchTodo();
      }, []);
    
     async function fetchTodo() {
        // Fetch the tasks
        const res = await axios.get("http://localhost:3000/api/Todo");
    
        // Set the state of created tasks , done tasks, and tasks
        updatetasks(res.data.things);
        updateFin(res.data.things.filter(task => task.done).length);
        updateCreation(res.data.things.length);

      };
      

      // this is a function that will handle the submit of the form
      async function envoi(randpara) {
        const equalbool = tasks.map(t=> t.task === randpara);
        // verifying if the typed task already exists
        const equalboolvalid = equalbool.every(t => t === false);
        //if the input isn't empty and the added task doesn't exist and the previous request has been done we execute the function
          if (randpara !== '' && !isSubmitting && equalboolvalid) {
              setIsSubmitting(true);
              
              const objj = {
                  task: randpara,
                  done: false
              }
              
              try {
                 const res = await axios.post("http://localhost:3000/api/todo", objj);
                  updatetasks(cur => [...cur, res.data.thing]);
                  updateCreation(Crees + 1);
              } catch (error) {
                  console.error("Error while submitting:", error);
              }
              inputRef.current.value='';
              setIsSubmitting(false);
          }
          if (!equalboolvalid && !isSubmitting && randpara !== '') {
            inputRef.current.value='';
            inputRef.current.placeholder='This task already exists'
            setTimeout(() => {
                inputRef.current.placeholder = 'Add a task';
            }, 1000);

          }
      }


    return(
        <div className="h-screen flex flex-col">
        <div className="text-center bg-black">
            <div className='p-10'>
                <span className="text-[#4EA8DE] text-[40px]">TO-DO</span>
            </div>
            <div className='mb-2'>
                <form onSubmit={(e) => { e.preventDefault(); envoi(Env); }}>
                    <input type='text' placeholder='Add a task' name="Task" ref={inputRef} className='bg-[#262626] p-4 text-white h-9 rounded w-[35%]' onChange={e => updateEnv(e.target.value)}></input>
                    <button type="submit" className='bg-[#1E6F9F] w-16 ml-4 p-2 cursor-pointer rounded' disabled={isSubmitting}>
                        {isSubmitting ? 'Adding..' : 'Add'}
                    </button>
                </form>
            </div>
        </div>
        <div className="flex-1 overflow-y-auto bg-[#1A1A1A]">
            <div className='w-[40%] mx-auto pt-4 md-pt-8'>
                <div className='flex justify-between'>
                    <div className='flex text-[#4EA8DE] gap-2'>
                        <span className='text-[13px] md:text-[15px] jj'>Added</span>
                        <span className='bg-white jj rounded px-1 text-black text-[13px] md:text-[15px]'> {Crees} </span>
                    </div>
                    <div className='gap-2 text-[#4EA8DE] flex'>
                        <span className='jj text-[13px] md:text-[15px]'>Done</span>
                        <span className='bg-white jj rounded px-1 text-black text-[13px] md:text-[15px]'>{Finies}</span>
                    </div>
                </div>
            </div>
            <List tasks={tasks} Crees={Crees} updateCreation={updateCreation} updatetasks={updatetasks} Finies={Finies} updateFin={updateFin} />
        </div>
    </div>
            
        )
    }
    
    export default Todo