import { ApiRequest } from "../../assets/js/request.js";

var myModal = new bootstrap.Modal(document.getElementById('editComputerModal'));
/** Clase que representa al componente computador */
class Computador {

  constructor() { }

  /** Actualiza el listado de computadores en la tabla */
  static get() {
    ApiRequest.get('Caracteristicas', 'getAll').then(response => {
      /** Referencia del cuerpo de la tabla */
      const tbody = document.querySelector('#list-table tbody');
      tbody.innerHTML = ''; // Limpia la tabla

      response.data.forEach(item => {
        const inactiveComputer = Number(item.gce_estado)===1 ? '' : 'inactive-computer';
        tbody.innerHTML += `<tr class="${inactiveComputer}">
          <td>${item.gce_nombre_equipo}</td>
          <td>${item.gce_board}</td>
          <td>${item.gce_case}</td>
          <td>${item.gce_procesador}</td>
          <td>${item.gce_grafica}</td>
          <td>${item.gce_ram}</td>
          <td>${item.gce_disco_duro}</td>
          <td>${item.gce_teclado}</td>
          <td>${item.gce_mouse}</td>
          <td>${item.gce_pantalla}</td>
          <td>
            <div class="form-check form-switch">
              <input class="form-check-input" type="checkbox" role="switch" ${Number(item.gce_estado) === 1 ? 'checked' : ''}
                onchange="Computador.updateStatus(${item.gce_id}, event.target.checked)">
            </div>
          </td>
          <td>
            <button type="button" class="edit-button" onclick="Computador.computerToEdit(${item.gce_id})">
              <i class="fa fa-pencil" aria-hidden="true"></i>
            </button>
            <button type='button' class="delete-button" onclick="Computador.computerToDelete(${
              item.gce_id
            })">
             <i class="fa fa-trash buttonDelete" aria-hidden="true"></i>
            </button>  
          </td>
        </tr>`; // Añade la fila a la tabla
      });
    }).catch(error => console.log('Ha ocurrido un error', error));
  }

  /** Registra un computador en la base de datos */
  static add = (event) => {
    event.preventDefault(); // Cancela el restablecimiento de la página

    /** Formulario de registro */
    const registerForm = event.target;

    const parameters = {
      gce_nombre_equipo: registerForm.querySelector('[name="gce_nombre_equipo"]').value,
      gce_board: registerForm.querySelector('[name="gce_board"]').value,
      gce_case: registerForm.querySelector('[name="gce_case"]').value,
      gce_procesador: registerForm.querySelector('[name="gce_procesador"]').value,
      gce_grafica: registerForm.querySelector('[name="gce_grafica"]').value,
      gce_ram: registerForm.querySelector('[name="gce_ram"]').value,
      gce_disco_duro: registerForm.querySelector('[name="gce_disco_duro"]').value,
      gce_teclado: registerForm.querySelector('[name="gce_teclado"]').value,
      gce_mouse: registerForm.querySelector('[name="gce_mouse"]').value,
      gce_pantalla: registerForm.querySelector('[name="gce_pantalla"]').value,
      gce_estado: registerForm.querySelector('[name="gce_estado"]').value,
    };

    ApiRequest.post('Caracteristicas', 'addOne', parameters).then((response) => {
      console.log('Añadir', response, response.data);
      this.get();
    }).catch(error => console.log('Ha ocurrido un error', error));

  };

  /** Actualiza un computador en la base de datos */
  static update = (event) => {
    event.preventDefault(); // Cancela el restablecimiento de la página

    /** Formulario de registro */
    const updateForm = event.target;

    const parameters = {
      gce_id: updateForm.querySelector('[name="gce_id"]').value,
      gce_nombre_equipo: updateForm.querySelector('[name="gce_nombre_equipo"]').value,
      gce_board: updateForm.querySelector('[name="gce_board"]').value,
      gce_case: updateForm.querySelector('[name="gce_case"]').value,
      gce_procesador: updateForm.querySelector('[name="gce_procesador"]').value,
      gce_grafica: updateForm.querySelector('[name="gce_grafica"]').value,
      gce_ram: updateForm.querySelector('[name="gce_ram"]').value,
      gce_disco_duro: updateForm.querySelector('[name="gce_disco_duro"]').value,
      gce_teclado: updateForm.querySelector('[name="gce_teclado"]').value,
      gce_mouse: updateForm.querySelector('[name="gce_mouse"]').value,
      gce_pantalla: updateForm.querySelector('[name="gce_pantalla"]').value,
      gce_estado: updateForm.querySelector('[name="gce_estado"]').value,
    };

    ApiRequest.post('Caracteristicas', 'updateComputer', parameters).then((response) => {
      myModal.hide();
      this.get();
    }).catch(error => console.log('Ha ocurrido un error', error));

  };

  /**
   * Actualiza el estado de un computador
   * @param {number} id Identificador del computador
   * @param {status} boolean Nuevo estado
   */
  static updateStatus = (id, status) => {
    ApiRequest.post('Caracteristicas', 'updateStatus', {id:id,status:status} ).then(response => {
      console.log('Actualizar estado', response);
      this.get();
    }).catch((error) => console.log("Ha ocurrido un error", error));
  };
    

  static computerToEdit = (id) => {
    ApiRequest.get('Caracteristicas', 'getOne', `?gce_id=${id}`).then(response => {
      console.log(response);
      
      const computer = response.data[0];
      const updateForm = document.getElementById("update-form");
      updateForm.querySelector('[name="gce_id"]').value = computer.gce_id
      updateForm.querySelector('[name="gce_nombre_equipo"]').value = computer.gce_nombre_equipo
      updateForm.querySelector('[name="gce_board"').value = computer.gce_board
      updateForm.querySelector('[name="gce_procesador"]').value = computer.gce_procesador
      updateForm.querySelector('[name="gce_ram"]').value = computer.gce_ram
      updateForm.querySelector('[name="gce_disco_duro"]').value = computer.gce_disco_duro
      updateForm.querySelector('[name="gce_grafica"]').value = computer.gce_grafica
      updateForm.querySelector('[name="gce_pantalla"]').value = computer.gce_pantalla
      updateForm.querySelector('[name="gce_case"]').value = computer.gce_case
      updateForm.querySelector('[name="gce_teclado"]').value = computer.gce_teclado
      updateForm.querySelector('[name="gce_mouse"]').value = computer.gce_mouse
      updateForm.querySelector('[name="gce_estado"]').value = computer.gce_estado
      myModal.show();

    }).catch(error => console.log('Ha ocurrido un error', error));
  }

  static computerToDelete = (id) => {
    if(confirm("Desea eliminar el registro #"+id)){
      ApiRequest.post("Caracteristicas", "deleteComputer", {id:id}).then(response => {
        this.get();
      }).catch(error => console.log("Ha ocurrido un error", error));
    }
  }

}

// Evento que espera a que cargue el contenido HTML 
document.addEventListener('DOMContentLoaded', () => {
  Computador.get(); // Actualiza la tabla de computadores
});


(function () { // Habilita el uso de las clases en el archivo HTML
  this.Computador = Computador;
  this.ApiRequest = ApiRequest;
}).apply(window);
