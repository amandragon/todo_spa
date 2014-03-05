SpaApp.Views.TodosDescription = Backbone.View.extend({

  template: HandlebarsTemplates['todos/description'],

  events: {
        'click input[type="link"]':   'describe',
  },
  // can link be a type?

  render: function() {
    $(this.el).html(this.template(this.model));
    // is this correct for rendering the description?

    return this;
  },

  describe: function(event) {
    var link = event.target;
    // event.target returns the element that triggered the event

    this.model.described = link.clicked;
    // what is a model?

    $.ajax({
      context: this,
      type: 'get',
      url: '/todos/' + this.model.id + '.json',
      data: {
        todo: this.model.describe
      }
    }).done(function (data) {
      $(this.el).toggleClass("done-true");
    });
  },



  });