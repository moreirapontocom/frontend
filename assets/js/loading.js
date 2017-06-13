MyBlog.module('Loading', function(Loading, MyBlog, Backbone, Marionette, $, _) {

    Loading.Show = {

        loading: function() {
            var loadingView = Marionette.ItemView.extend({});

            var theLoadingView = new loadingView({
                template: '#loading-template'
            });

            MyBlog.mainRegion.show( theLoadingView );

        }

    };

});