// MyBlog.Router =  Marionette.AppRouter.extend({
//     appRoutes: {
//         '': 'listPosts',
//         ':post_name': 'listSingle'
//     },

//     listPosts: function() {
//         API.listAllPosts();
//     },
//     listSingle: function(model) {
//         API.listSinglePost(model);
//     }
// });

var API = {

    listAllPosts: function() {

        var fetch = MyBlog.fetchPosts();
        $.when( fetch ).done(function() {

            // O fetch retorna uma collection de models (Backbone.Collection)

            var itens = new MyBlog.collectionViews({
                collection: posts
            });

            MyBlog.mainRegion.show( itens );

        });

    },

    listSinglePost: function(model) {

        console.log('Exibe o post único: ', model);

    }
}