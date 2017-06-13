_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

var MyBlog = new Marionette.Application();

MyBlog.addRegions({
    mainRegion: '#js-main-region'
});

MyBlog.on('start', function() {

    // ItemView Loading
    MyBlog.loadingView = Marionette.ItemView.extend({});
    var theLoadingView = new MyBlog.loadingView({
        template: '#loading-template'
    });
    MyBlog.mainRegion.show( theLoadingView );


    if ( Backbone.history )
        Backbone.history.start();

    if ( Backbone.history.fragment == '' )
        API.listAllPosts();
    else
        API.listSinglePost( Backbone.history.fragment );

});