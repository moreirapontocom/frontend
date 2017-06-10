_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

var MyBlog = new Marionette.Application();

MyBlog.addRegions({
    mainRegion: '#js-main-region'
});

var API = {

    listAllPosts: function() {

        var fetchFromAPI = MyBlog.fetchPosts();
        $.when( fetchFromAPI ).done(function(fetchFromAPI) {

            // Instancio a collection de ItemViews
            // A collection posts vem lá da promise()
            var list = new MyBlog.listPosts({
                collection: posts
            });

            Backbone.history.navigate('/');
            MyBlog.mainRegion.show( list );

        });

    },

    listSinglePost: function(model) {

        var singleModel = Backbone.Model.extend({});
        var singleCollection = Backbone.Collection.extend({
            model: singleModel
        });

        var single = Marionette.ItemView.extend({
            template: '#single-post-full-template'
        });
        var viewCollection = Marionette.CollectionView.extend({
            childView: single
        });

        var collection = new singleCollection( model );
        var view = new viewCollection({
            collection: collection
        });

        Backbone.history.navigate( model.id );
        MyBlog.mainRegion.show( view );

    }
}

MyBlog.Router =  Marionette.AppRouter.extend({
    appRoutes: {
        '': 'listPosts',
        ':post_name': 'listSingle'
    },

    listPosts: function() {
        API.listAllPosts();
    },
    listSingle: function(model) {
        API.listSinglePost(model);
    }
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
    template: '#single-post-in-list-template',
    events: {
        'click .js-read-more': 'openSinglePost'
    },
    openSinglePost: function(e) {
        e.preventDefault();
        e.stopPropagation();

        API.listSinglePost( this.model );
    }
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

    if ( !posts || posts == '' ) {

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
    
    } else
        return posts;

}


MyBlog.on('start', function() {

    // ItemView Loading
    MyBlog.loadingView = Marionette.ItemView.extend({
        template: '#loading-template'
    });
    var theLoadingView = new MyBlog.loadingView();
    MyBlog.mainRegion.show( theLoadingView );

    if ( Backbone.history )
        Backbone.history.start();

    if ( Backbone.history.fragment == '' )
        API.listAllPosts();
    else
        API.listSinglePost( Backbone.history.fragment );

});