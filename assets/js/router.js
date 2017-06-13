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

            // Defining ItemView
            var myItemView = Marionette.ItemView.extend({
                template: '#single-post-in-list-template',
                tagName: 'li',
                events: {
                    'click .js-read-more': 'openSingle'
                },
                openSingle: function() {
                    console.log('open: ', this.model);
                }
            });

            // Defining CollectionView
            var collectionViews = Marionette.CollectionView.extend({
                tagName: 'ul',
                className: 'post-list',
                childView: myItemView
            });

            // Instancing CollectionView passing Collection of models (from fetch)
            var views = new collectionViews({
                collection: posts
            });

            MyBlog.mainRegion.show( views );

        });

    },

    listSinglePost: function(model) {

        console.log('Exibe o post único: ', model);

    }
}