var posts;
var defer = $.Deferred();
MyBlog.fetchPosts = function() {

    if ( !posts || posts == '' ) {

        posts = new MyBlog.myCollection(); // Retorna uma Collection
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

var singlePost;
// var deferSingle = $.Deferred();
MyBlog.fetchSingle = function(post_id) {

    singlePost = new MyBlog.myCollection(); // Retorna uma Collection
    singlePost.fetch({
        method: 'GET',
        dataType: 'jsonp',
        processData: false,
        url: 'http://api.lucasmoreira.com.br/post/' + post_id,
        success: function(collection, response, options) {

            singlePost = response;
            defer.resolve( singlePost );

            return defer.promise();

        },
        error: function(err, xhr) {
            console.log('error');
        }
    });

}