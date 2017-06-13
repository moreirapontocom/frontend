MyBlog.module('Views', function(Views, MyBlog, Backbone, Marionette, $, _) {

    // List ItemView
    Views.listItemView = Marionette.ItemView.extend({
        template: '#single-post-in-list-template',
        tagName: 'li',
        events: {
            'click .js-read-more': 'openPost'
        },
        openPost: function() {
            console.log('(views.js) Open the post: ', this.model);
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