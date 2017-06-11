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
    template: '#single-post-in-list-template',
    tagName: 'li'
});

// ItemCollection
MyBlog.collectionViews = Marionette.CollectionView.extend({
    tagName: 'ul',
    className: 'post-list',
    childView: MyBlog.myItemView
});
