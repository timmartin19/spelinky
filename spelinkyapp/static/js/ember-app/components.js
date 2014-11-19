/**
 * Created by Tim Martin on 11/18/2014.
 */
Spelinky.LinksContainerComponent = Ember.Component.extend({
    actions: {
        postLink: function(url){
            if(!url){return false;}
            if(!url.trim()){return;}
            var store = this.get('store');
            var userId = $('meta#userId').attr('content');
            var self = this;
            store.find('user', userId).then(function(owner){
                var newLink = store.createRecord('link', {
                    url: url,
                    owner: owner
                });
                newLink.save().then(function(link){
                    owner.get('links').pushObject(link);
                });
                self.set('newUrl', '');
            });
        }
    }
});

Spelinky.CommentsContainerComponent = Ember.Component.extend({
    actions: {
        toggleComments: function(){
            this.set('viewingComments', !this.get('viewingComments'));
        },
        postComment: function(comment){
            if(!comment){return false;}
            if(!comment.trim()){return;}
            var store = this.get('store');
            var link = this.get('model');
            var self = this;
            var userId = $('meta#userId').attr('content');
            store.find('user', userId).then(function(owner){
                var new_comment = store.createRecord('comment', {
                    comment_text: comment,
                    owner: owner,
                    link: link
                });
                new_comment.save();
                self.set('newComment', '');
            })
        }
    },
    viewingComments: false
});