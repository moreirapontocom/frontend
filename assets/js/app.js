_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

var MyBlog = new Marionette.Application();

MyBlog.addRegions({
    mainRegion: '#main-region'
});

// Model
MyBlog.myModel = Backbone.Model.extend({
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
MyBlog.myCollection = Backbone.Collection.extend({
    model: MyBlog.myModel
});

// ItemView
MyBlog.myItemView = Marionette.ItemView.extend({
    tagName: 'li',
    template: '#single-post-in-list-template'
});
// ItemCollection
MyBlog.listPosts = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'post-list',
    childView: MyBlog.myItemView
});

var posts;
var defer = $.Deferred();
MyBlog.fetchPosts = function() {

    posts = new MyBlog.myCollection();
    posts.fetch({
        method: 'GET',
        dataType: 'jsonp',
        processData: false,
        url: 'http://api.lucasmoreira.com.br/post',
        success: function(collection, response, options) {

            posts = response;
            defer.resolve( posts );

            return defer.promise();

        },
        error: function(err, xhr) {
            console.log('error');
        }
    });

}

// ItemView Loading
MyBlog.loadingView = Marionette.ItemView.extend({
    template: '#loading-template'
});
var theLoadingView = new MyBlog.loadingView();
MyBlog.mainRegion.show( theLoadingView );

MyBlog.on('start', function() {

    if ( !posts || posts == '' ) {

        var fetchFromAPI = MyBlog.fetchPosts();
        $.when( fetchFromAPI ).done(function(fetchFromAPI) {

            // Instancio a collection de ItemViews
            // A collection posts vem lá da promise()
            var list = new MyBlog.listPosts({
                collection: posts
            });

            MyBlog.mainRegion.show( list );

        });

    }

});