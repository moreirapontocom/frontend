_.templateSettings = {
    interpolate: /\{\{(.+?)\}\}/g
};

var MyBlog = new Marionette.Application();

MyBlog.addRegions({
    mainRegion: '.js-main-region'
});

MyBlog.on('start', function() {

    MyBlog.Loading.Show.loading();

    if ( Backbone.history )
        Backbone.history.start({ pushState: false });

    if ( Backbone.history.fragment === '' )
        MyBlog.trigger('posts:get:all');
    else
        MyBlog.trigger('posts:get:single', Backbone.history.fragment);

});