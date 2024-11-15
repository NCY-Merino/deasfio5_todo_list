let tareas = [];
let count = 0;


function agregar() {
    const tarea = document.getElementById("nueva-tarea").value;

    if(tarea === '') return;

    const obj = {
        id: count++,
        descripcion: tarea,
        completado: false
    };

    agregarTabla(obj);
}

const tablaTarea =  document.getElementById("tabla-tareas");

function agregarTabla(tarea) {
    tareas.push(tarea);

    const nuevaTarea = document.createElement('tr');
    nuevaTarea.id = `${tarea.id}-tarea`; 

    const tareaId = document.createElement('td');
    tareaId.innerText = tarea.id;
    nuevaTarea.appendChild(tareaId);

    const descripcion = document.createElement('td');
    descripcion.className = 'descripcion';
    descripcion.innerText = tarea.descripcion;
    nuevaTarea.appendChild(descripcion);

    const check_content = document.createElement('td');

    const check = document.createElement('input');
    check.type = 'checkbox';
    check.className = 'check';
    check.addEventListener( 'click', function(){
        checked(tarea.id);
      });
      
    check_content.appendChild(check);
    nuevaTarea.appendChild(check_content);

    const borrar_content = document.createElement('td');
    const borrar = document.createElement('button');
    borrar.className = 'btn-borrar';
    borrar.addEventListener( 'click', function(){
        borrarTarea(tarea.id);
      });

      const borrarIcon = document.createElement('i');
      borrarIcon.className = 'fa-regular fa-trash-can';

      borrar.appendChild(borrarIcon);

    borrar_content.appendChild(borrar);
    nuevaTarea.appendChild(borrar_content);
    tablaTarea.appendChild(nuevaTarea);
    document.getElementById("nueva-tarea").value = '';
    contar();
}

function checked(_id) {
    let tarea = tareas.find( tarea => tarea.id === _id);
    if(tarea){
        tarea.completado = !tarea.completado;
    }
    contar();
}

function borrarTarea(_id) {
    const tarea = tareas.find( tarea => tarea.id === _id);
    const index = tareas.indexOf(tarea);
    tareas.splice(index, 1);

    const element =  document.getElementById(`${_id}-tarea`);
    element.remove();
    contar();
}

const totalSpan =  document.getElementById("total");
const realizadasSpan =  document.getElementById("realizadas");

totalSpan.innerText = 0;
realizadasSpan.innerText = 0;


function contar() {
    let realizadas = tareas.filter( tarea => tarea.completado === true).length;
    let total = tareas.length;

    totalSpan.innerText = total;
    realizadasSpan.innerText = realizadas;
}