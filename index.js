
import { saveTask, getTasks, onGetTasks, deleteTask, getTask, updateTask } from './firebase.js'



//busco el formulario y capturo el evento submit para evitar 
//el comportamiento por defecto que es la recarga de la pagina
const taskForm = document.getElementById('task-form')

const taskContainer = document.getElementById('tasks-container')

let editStatus = false;
let id = ''
// agrego este evento para ejecutar codigo al cargar la pagina
window.addEventListener('DOMContentLoaded', async () => {





    /* esta es la version en la cual importo db, onSnapshot , etc
    se reemplazo por onGetTasks
    
         onSnapshot(collection(db,'tasks'), (querySnapshot)=>{
    
    */
    onGetTasks((querySnapshot) => {
        let html = ''
        querySnapshot.forEach(doc => {
            const task = doc.data()
            const id = doc.id;

            html += `<div>      
                            <h3> ${task.title}</h3>   
                            <p> ${task.description} </p>  
                            <button class="btn-delete" data-id = "${doc.id}">Delete </button>
                             <button class="btn-edit" data-id = "${doc.id}">Edit </button>
                        </div>`

            //   console.log(doc.data())
        });

        taskContainer.innerHTML = html
        const btnsDelete = taskContainer.querySelectorAll('.btn-delete')
        btnsDelete.forEach(btn => {

            //opcion 1
            /*
             btn.addEventListener('click', (event) => { // event es donde recibo los datos del boton al realizar click, en este caso. 
                 btn.addEventListener
                 const id = event.target.dataset.id;
                 console.log(id)
             })
             */

            //opcion 2
            // en este caso en el callback del listener, como se que recibo un objeto event puedo usar
            // las {} para extraer una propiedas, en este caso target, que como tambien es un objeto
            // puedo extraer dataset, asi el codigo queda mas compacto
            btn.addEventListener('click', ({ target: { dataset } }) => { // event es donde recibo los datos del boton al realizar click, en este caso. 

                const id = dataset.id;
                deleteTask(id)
                // console.log(id)
            })
        }

        )


        const btnsEdit = taskContainer.querySelectorAll('.btn-edit')
        btnsEdit.forEach((btn) => {
            btn.addEventListener('click', async ({ target: { dataset } }) => {
                const doc = await getTask(dataset.id)
                
                const task = doc.data()
                taskForm['task-title'].value = task.title
           taskForm['task-description'].value = task.description
                editStatus = true
                id = dataset.id;
                taskForm['btn-task-save'].innerText = 'update'
            }
            )
        }



        )
    })
})

// es fragmento solo trae datos en la carga de la pagina, si agego un dato nuevo no lo 
// muestra por ello modificamos para actualizar la lista cada vez que se produzca un 
// cambio en la coleccion
/* const querySnapshot = await getTasks();    
let html = ''
querySnapshot.forEach(doc => {
  const task = doc.data()
 
    html += `<div>      
                 <h3> ${task.title}</h3>   
                 <p> ${task.description} </p>  
            </div>`
    
    console.log(doc.data())
});

taskContainer.innerHTML = html
*/






taskForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const title = taskForm['task-title']
    const description = taskForm['task-description']

    if (!editStatus) {
        saveTask(title.value, description.value)
        
    }
    else
    {
       updateTask(id, {
           title:title.value,
           description: description.value
       })

       editStatus=false
       taskForm['btn-task-save'].innerText = 'Save'
    }
    

    taskForm.reset()
})

