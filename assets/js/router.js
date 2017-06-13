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
                    API.listSinglePost( this.model );
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

        if ( !posts || posts === undefined )
            console.log('Fetch all posts');
        else {

            var single = new MyBlog.myCollection( model );
            var showSingle = single.get( model.id );

            Backbone.history.navigate( model.id );

            // 

            // Defining Collection of models
            var collection = Backbone.Collection.extend({});

            // Defining ItemView
            var itemView = Marionette.ItemView.extend({
                template: '#single-post-full-template'
            });

            // Defining Collection of views
            var collectionView = Marionette.CollectionView.extend({
                childView: itemView
            });

            // Instancing collection of models passing the model (single-selected model)
            var theModel = new collection( showSingle );

            // Instancing the collection of views passing the collection of models to display
            var collectionViews = new collectionView({
                collection: theModel
            });

            MyBlog.mainRegion.show( collectionViews );

        }

    }
}