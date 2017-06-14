MyBlog.module('Posts', function(Posts, MyBlog, Backbone, Marionette, $, _) {

    MyBlog.on('posts:get:all', function() {

        Backbone.history.navigate('');

        var fetch = MyBlog.request('entities:get:posts');

        $.when( fetch ).done(function(posts) {

            var list = new MyBlog.Entities.postCollection( posts );
            var view = new MyBlog.Views.listCollectionViews({
                collection: list
            });

            MyBlog.mainRegion.show( view );

        });

    });

    MyBlog.on('posts:get:selected', function(model) {

        Backbone.history.navigate( model.id );

        var fetch = MyBlog.request('entities:get:selected', model);

        var collection = new MyBlog.Entities.postCollection( fetch );
        var item = new MyBlog.Views.singleCollectionViews({
            collection: collection
        });

        MyBlog.mainRegion.show( item );

    });

});