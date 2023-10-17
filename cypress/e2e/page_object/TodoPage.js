

export class TodoPage{
    OpenPage(){
        cy.visit('https://todomvc.com/examples/angularjs/#/')
    }


    addtodo(todoText){
        cy.get('.new-todo').type(todoText+'{enter}');
    }

    filters(){
        return(cy.get('.filters li'));
    }
 
    itemList(){
        return  (cy.get('.todo-list li'));

       }

    itembyposition(number){

        return  (cy.get('.todo-list li label').eq(number));
        
    }

    addTodos(...todos){ //recibe más de un item para su registro
        todos.forEach(
            todo => this.addtodo(todo)
        )
    }

    todoElement(text){ //retorna el elemento de la lista que contenga el texto solcitado
        return(cy.contains('.todo-list li', text))
    }

    completeItem(text){ //marca como completado un item
        this.todoElement(text).within(
            $listItem => { cy.get('.toggle').click() }
        )

    }

    deleteItem(text){
        this.todoElement(text).within(
            $listItem => { cy.get('.destroy').invoke('show').click() }
        )

    /*cy.get('.destroy').then(($delete_item) => {
        cy.wrap($delete_item)// Convierte el elemento del DOM de jQuery a un objeto de Cypress
        .invoke('show') // Invoca el método 'show' en el elemento para asegurarse de que es visible
        .click() // Simula un evento de clic en el elemento
      });*/

    }

    deleteOption(text){
        this.todoElement(text).within(
            $listItem => { cy.get('.destroy').invoke('show').should('be.visible') }
        )

         /*cy.get('.destroy').then(($delete_item) => {
      cy.wrap($delete_item) // Convierte el elemento del DOM de jQuery a un objeto de Cypress
      .invoke('show') // Invoca el método 'show' en el elemento para asegurarse de que es visible
      .trigger('mouseover') // Simula el evento mouseover sobre el elemento
      .should('be.visible') // valida que el elemento eliminar está visible
    })*/
    }

    filtrado(text){
        cy.contains('a', text).click()
    }


}