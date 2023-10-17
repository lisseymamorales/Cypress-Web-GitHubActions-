/// <reference types="cypress"/>
import { TodoPage } from "./page_object/TodoPage"


describe('Página todo', () => {

  const todopage = new TodoPage

  beforeEach('Ingreso a la página', ()=>{

    todopage.OpenPage()

  })

  it('Validando elementos de interacción', ()=>{
    cy.get('.new-todo').should('have.attr','placeholder','What needs to be done?').and('be.enabled')
    todopage.filters().contains('a','Active')
    todopage.filters().contains('a','All')
    todopage.filters().contains('a','Completed')
    todopage.itemList().should('have.length', 0)

})


  it('Agregando item a la lista', () => {

    todopage.addtodo('Item 1')
    todopage.itemList().should('have.length', 1)
    todopage.itembyposition(0).should('have.text', 'Item 1')
    
    
  })


  it('Mostrar items de lista en orden de ingreso', ()=>{
    todopage.addTodos('item 1','item 2', 'item 3')
    todopage.itemList().should('have.length', 3)
    todopage.itembyposition(0).should('have.text','item 1')
    todopage.itembyposition(1).should('have.text','item 2')
    todopage.itembyposition(2).should('have.text','item 3')

  })

  it('Marcar un item como completo', () => {

    todopage.addTodos('item 1', 'item 2')
    todopage.completeItem('item 1')
})


it('Aplicando filtrado de items completados',()=>{

  todopage.addTodos('item 1','item 2', 'item 3')
  todopage.itemList().should('have.length', 3)
  todopage.completeItem('item 1')
  todopage.todoElement('item 1').should('have.class', 'completed')
  todopage.filtrado('Completed')
  todopage.itemList().should('have.length', 1)
  todopage.itembyposition(0).should('have.text','item 1')
  todopage.filtrado('All')
  todopage.itemList().should('have.length', 3)

} )



it('Validar despliegue opcion eliminar', ()=>{

  todopage.addtodo('Item 1')
  todopage.deleteOption('Item 1')


})


  it('Eliminar item', ()=>{

    todopage.addtodo('Item 1')
    todopage.itemList().should('have.length', 1)
    todopage.deleteItem('Item 1')
    todopage.itemList().should('have.length', 0) //valida que la lista se encuentre vacía luego de la eliminación del elemento


})




})