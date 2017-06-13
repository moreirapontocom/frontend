MyBlog.module('Entities', function(Entities, MyBlog, Backbone, Marionette, $, _) {

    // Model
    Entities.postModel = Backbone.Model.extend({
        defaults: {
            ID: 0,
            post_date: '',
            post_content: '',
            post_title: '',
            post_excerpt: '',
            post_name: '',
            menu_order: 0,
            comment_count: 0
        },
        idAttribute: 'post_name',
        sync: function(method, model, options) {
            var that = this,
                params = _.extend({
                    method: 'GET',
                    dataType: 'jsonp',
                    url: that.url,
                    processData: false
                }, options);

            return $.ajax( params );
        }
    });

    // Collection de models
    Entities.postCollection = Backbone.Collection.extend({
        model: Entities.postModel
    });

    var API = {

        fetchPosts: function() {
            if ( !posts || posts === undefined ) {

                var posts;
                var defer = $.Deferred();

                posts = new Entities.postCollection();
                posts.fetch({
                    method: 'GET',
                    dataType: 'jsonp',
                    processData: false,
                    url: 'http://api.lucasmoreira.com.br/post',
                    success: function(collection, response, options) {

                        posts = response;
                        defer.resolve( posts );

                    },
                    error: function(err, xhr) {
                        console.log('error');
                    }
                });

                return defer.promise();

            } else
                return posts;
        },

        fetchSingle: function(post_name) {

            // Make sure that posts already exists

            if ( !posts || posts === undefined ) {

                console.log('posts DONT exists. Fetch single: ', post_name);

                // var thePost;
                // var deferPost = $.Deferred();

                // thePost = new Entities.postCollection();
                // thePost.fetch({
                //     method: 'GET',
                //     dataType: 'jsonp',
                //     processData: false,
                //     url: 'http://api.lucasmoreira.com.br/post/' + post_name,
                //     success: function(collection, response, options) {

                //         thePost = response;
                //         deferPost.resolve( thePost );

                //     },
                //     error: function(err, xhr) {
                //         console.log('error');
                //     }
                // });

                // return deferPost.promise();

            } else {

                // get the existent $posts > get() > display
                console.log('posts already exists. Just get() the correct model and display it');

            }

        }
    
    };

    MyBlog.reqres.setHandler('entities:get:posts', function() {
        return API.fetchPosts();
    });

    MyBlog.reqres.setHandler('entities:get:single', function(post_name) {
        return API.fetchSingle(post_name);
    });
});