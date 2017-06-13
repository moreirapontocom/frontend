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

    MyBlog.on('posts:get:single', function(post_name) {

        Backbone.history.navigate( post_name );

        console.log('posts.js - Get single: ', post_name);
    });

});