SpaApp.Views.TodosDescription = Backbone.View.extend({

  template: HandlebarsTemplates['todos/description'],

  events: {
        'click input[type="link"]':   'describe',
  },
  // can link be a type?


  tagname: "div",
  render: function(){
    var text = "{#@todo.title}";
    if(this.model){
      text += ".  Param is: " + this.model;
    }
    this.$el.text(text);
    return this;
  }



  });