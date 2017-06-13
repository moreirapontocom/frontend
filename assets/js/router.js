MyBlog.Router =  Marionette.AppRouter.extend({
    routes: {
        '': 'listPosts',
        ':post_name': 'listSingle'
    },

    listPosts: function() {
        console.log('router listPosts()');
        API.listAllPosts();
    },
    listSingle: function(model) {
        console.log('router listSingle(model)');
        API.listSinglePost(model);
    }
});

var API = {

    listAllPosts: function() {

        if ( !posts || posts === undefined ) {

            var fetch = MyBlog.fetchPosts();
            $.when( fetch ).done(function() {

                // Defining ItemView
                var myItemView = Marionette.ItemView.extend({
                    template: '#single-post-in-list-template',
                    tagName: 'li',
                    events: {
                        'click .js-read-more': 'openSingle'
                    },
                    openSingle: function(e) {
                        e.preventDefault();
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

        } else {

            var collection = new MyBlog.myCollection( posts );

            var views = new MyBlog.collectionViews({
                collection: collection
            });

            MyBlog.mainRegion.show( views );

        }

        Backbone.history.navigate('/');

    },

    listSinglePost: function(model) {

        var post_id = model

        if ( !posts || posts === undefined ) {

            var fetchOne = MyBlog.fetchSingle( post_id );
            $.when( fetchOne ).done(function() {

                var itemView = Marionette.ItemView.extend({
                    template: '#single-post-full-template'
                });
                var collectionView = Marionette.CollectionView.extend({
                    childView: itemView
                });

                var theView = new collectionView({
                    collection: singlePost
                });

                var navigate_to = post_id;

                MyBlog.mainRegion.show( theView );

            });

        } else {

            var single = new MyBlog.myCollection( model );
            var showSingle = single.get( model.id );

            var navigate_to = model.id;

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

        Backbone.history.navigate( navigate_to );

    }
}

MyBlog.addInitializer(function() {
    console.log('initializer');

    new MyBlog.Router({
        controller: API
    });

});