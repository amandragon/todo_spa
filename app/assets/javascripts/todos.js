  $(function(){

        $("#addTodo").on("submit", function(event){
            event.preventDefault();
            console.log("Form submitted");
            

            var newTodo = {
                title: $("#todo_title").val(),
                completed: false
            };
            console.log(newTodo);

            $.post('/todos.json', {todo: newTodo})
                .done(function(data){
                console.log(data);
                var todoHTML = HandlebarsTemplates.todo(data);
                $("#todos").append(todoHTML);
                    
                });           
            
        });
              $.get("/todos.json").done(function(data){
              $(data).each(function(index, someTodo){
              var todoHTML = HandlebarsTemplates.todo(someTodo);
              $("#todos").append(todoHTML);
            });
        });

              $("#todos").on("click", ".todo", function(event){
              console.log(event);
              console.log(event.target);  
              var _this = this;
                if(event.target.id === "todo_completed"){
                  var checkbox = event.target;
                  var updated_todo = {};
                  updated_todo.completed = checkbox.checked;
                  updated_todo.id = this.dataset.id;

                    $.ajax({
                    type: 'patch',
                    url: '/todos/'+updated_todo.id+'.json',
                    data: {todo: updated_todo}
                }).done(function(data){
                  $(_this).toggleClass("done-true");
                });

                
            }
            if(event.target.id === "removeTodo") {
                var _this = this;
                var id = this.dataset.id;
                
            $.ajax({
                type: 'delete',
                url: '/todos/' + id
                })
                .done(function (data) {
                    $(_this).remove();
                });
            }
       });
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
        
        
    });
