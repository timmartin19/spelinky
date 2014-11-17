/**
 * Created by Tim Martin on 11/1/2014.
 */

Spelinky.HomeIndexController = Ember.ArrayController.extend({
    itemController: 'link',
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
    },
    sortProperties: ['date_uploaded'],
    sortAscending: true
});

Spelinky.LinkController = Ember.ObjectController.extend({
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

Spelinky.ProfileController = Ember.ObjectController.extend({
    needs: ['home_index', 'link'],
    actions: {
        postLink: function(url){
            this.get('controllers.home_index').send('postLink', url);
        },
        toggleComments: function(){
            this.get('controllers.link').send('toggleComments');
        },
        postComment: function(comment){
            this.get('controllers.link').send('postComment', comment);
        }
    }
});