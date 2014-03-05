SpaApp.Views.TodosIndex = Backbone.View.extend({
  id: 'todos',

  template: HandlebarsTemplates['todos/index'],

  events: {
    'submit #addTodo':                'add'
  },
  // mentions the events that will happen on this page
  // 'this' refers to the above
  // references the closest object it's associated with

  render: function() {
    $(this.el).html(this.template());

    var todoView;
    _.each(this.collection, function (someTodo) {
      todoView = new SpaApp.Views.TodosShow({ model: someTodo} );
      this.$el.append(todoView.render().el);
    }, this);

    return this;
  },
  // just rendering the view
  // is 'model' the individual todo item?

// linking from here to the describe view
  description: function(param){
    var view = new App.Views.Other({model: param});
    $('#main').html(view.render().$el);
  },

  add: function(event) {
    event.preventDefault();
    // what is prevent default doing?
    
    var newTodo = {
      title: $("#todo_title").val(),
      completed: false
    };
    // adding a new todo

    $.ajax({
      type: "POST",
      url: '/todos.json',
      context: this,
      data: {todo: newTodo}
    }).done(function (todo) {
      var todoView = new SpaApp.Views.TodosShow({ model: todo });
      this.$el.append(todoView.render().el);
    });
  }
});
// ajax is making a request to the post route-kind of like a form but in JS
// getting data from the server
// can send and recieve data on the same page
// it's being called for the add function