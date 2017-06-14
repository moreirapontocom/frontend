MyBlog.module('Router', function(Router, MyBlog, Backbone, Marionette, $, _) {

    Router.Router =  Marionette.AppRouter.extend({
        routes: {
            '': 'listAll'
        },

        listAll: function() {
            MyBlog.trigger('posts:get:all');
        },

        onRoute: function(name, path, args) {

            MyBlog.Loading.Show.loading();

        }
    });

    MyBlog.addInitializer(function() {

        new Router.Router();

    });

});