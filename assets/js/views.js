MyBlog.module('Views', function(Views, MyBlog, Backbone, Marionette, $, _) {

    // List ItemView
    Views.listItemView = Marionette.ItemView.extend({
        template: '#single-post-in-list-template',
        tagName: 'li',
        events: {
            'click .js-read-more': 'openPost'
        },
        openPost: function(post_name) {
            console.log('(views.js) Open the post: ', post_name);
        }
    });

    // List ItemCollection
    Views.listCollectionViews = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'post-list',
        childView: Views.listItemView
    });


    // Single ItemView
    Views.singleMyItemView = Marionette.ItemView.extend({
        template: '#single-post-in-list-template',
        tagName: 'li'
    });

    // Single ItemCollection
    Views.singleCollectionViews = Marionette.CollectionView.extend({
        tagName: 'ul',
        className: 'post-list',
        childView: Views.singleMyItemView
    });

});