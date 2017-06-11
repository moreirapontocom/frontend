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

            console.log('fez o fetch: ', posts);

            // var singleModel = new MyBlog.myModel( posts );
            var singleCollection = new MyBlog.myCollection({
                model: posts
            });

            // var theItem = new MyBlog.myItemView({
            //     template: '#single-post-in-list-template',
            //     events: {
            //         'click .js-read-more': 'openSinglePost'
            //     },
            //     openSinglePost: function(model) {
            //         console.log( 'API, model: ', model );
            //     }
            // });

            var itens = new MyBlog.collectionViews({
                collection: singleCollection
            });

            MyBlog.mainRegion.show( itens );

        });

    },

    listSinglePost: function(model) {

        console.log('Exibe o post único: ', model);

    }
}