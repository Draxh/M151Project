using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TodoApi.Models;
using Pomelo.EntityFrameworkCore;
using System;

namespace TodoApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController] //Only return values (JSON object,JSON Arrays(Lists))
    public class TodoController : ControllerBase
    {
        private readonly TodoContext _context;

        public TodoController(TodoContext context)                              // <-- Constructor. Context word mittels Dependency Injection "injected"
        {
            _context = context;

            if (_context.TodoItems.Count() == 0)
            {
                // Create a new TodoItem if collection is empty,
                // which means you can't delete all TodoItems.
                _context.TodoItems.Add(new TodoItem { 
                    Name = "Item1",
                    Date = setDate(),
                    Importance = "",
                    Operator = "Operator"  });
                _context.SaveChanges();
            }
        } 

        public string setDate(){
            string day = DateTime.Today.Day.ToString();
            string month = DateTime.Today.Month.ToString();
            string year = DateTime.Today.Year.ToString();
            string Date = day + "-" + month + "-" + year; 
            return Date;
        }

        //----------------------------------------------GET----------------------------------------------
        // GET: api/Todo GetTodoItems - Alle Items anzeigen: (https://localhost:5001/api/todo/).
        [HttpGet]
        public async Task<ActionResult<IEnumerable<TodoItem>>> GetTodoItem() {return await _context.TodoItems.ToListAsync();}

        // GET: api/Todo/ GetTodoItems - Bestimmtes Item anzeigen: (https://localhost:5001/api/todo/->id<-)
        [HttpGet("{id}")] //Parameter für ID in der URL
        public async Task<ActionResult<TodoItem>> GetTodoItem(long id)
        {
            var todoItem = await _context.TodoItems.FindAsync(id);

            if (todoItem == null)
            {
                return NotFound();
            }

            return todoItem;
        }

        //----------------------------------------------POST----------------------------------------------
        // POST: api/Todo PostTodoItem - Item erstellen und anzeigen. Keine ID in der URL eingeben: (https://localhost:5001/api/todo/) & {"ID":11,"name":"testname","isComplete":true}
        [HttpPost]
        public async Task<ActionResult<TodoItem>> PostTodoItem(TodoItem todoItem)
        {
            _context.TodoItems.Add(todoItem);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetTodoItem", new { id = todoItem.Id }, todoItem);
        }

        //----------------------------------------------PUT----------------------------------------------
        // PUT: api/Todo/ PutTodoItem - Item bearbeiten, ID muss auch in der URL sein! (https://localhost:5001/api/todo/->id/2<-) & in Postman {"ID":2,"name":"testname","isComplete":true}
        [HttpPut("{id}")] //Parameter für ID in der URL
        public async Task<IActionResult> PutTodoItem(long id, TodoItem todoItem)
        {

            _context.Entry(todoItem).State = EntityState.Modified;
            await _context.SaveChangesAsync();

            return NoContent();
        }

        //----------------------------------------------DELETE----------------------------------------------
        // DELETE: api/Todo/ DeleteTodoItem - Item löschen, ID in der URL eingeben reicht: (https://localhost:5001/api/todo/->id<-)
        [HttpDelete("{id}")] //Parameter für ID in der URL
        public async Task<ActionResult<TodoItem>> DeleteTodoItem(long id)
        {
        var todoItem = await _context.TodoItems.FindAsync(id);
        if (todoItem == null)
        {
            return NotFound();
        }

        _context.TodoItems.Remove(todoItem);
        await _context.SaveChangesAsync();

        return todoItem;
        }


    }
}   