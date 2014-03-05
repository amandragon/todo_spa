SpaApp.Views.TodosShow = Backbone.View.extend({
  className: function() {
    if (this.model.completed) {
      return 'done done-true';
      // what does done done true mean?
    } else {
      return 'done';
    }
  },
  // what is the purpose of this function
  
  template: HandlebarsTemplates['todos/show'],

  events: {
    'click input[type="checkbox"]':   'complete',
    'click .removeTodo':              'removeTodo'
  },
  // above are the events you can do to the todo item

  render: function() {
    $(this.el).html(this.template(this.model));
    // why does the show page have 'this model'

    return this;
  },

  complete: function(event) {
    var checkbox = event.target;
    // event.target returns the element that triggered the event

    this.model.completed = checkbox.checked;
    // what is a model?

    $.ajax({
      context: this,
      type: 'patch',
      url: '/todos/' + this.model.id + '.json',
      data: {
        todo: this.model
      }
    }).done(function (data) {
      $(this.el).toggleClass("done-true");
    });
  },

  removeTodo: function(event) {
    $.ajax({
      context: this,
      type: 'delete',
      url: '/todos/' + this.model.id
    }).done(function (data) {
      this.remove();
    });
  }

});
