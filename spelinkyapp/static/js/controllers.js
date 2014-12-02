/**
 * Created by Tim Martin on 11/1/2014.
 */
Spelinky.HomeController = Ember.ObjectController.extend({});

Spelinky.LinksController = Ember.ArrayController.extend({
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

});

Spelinky.ProfileController = Ember.ObjectController.extend({
    isCurrentUser: function(){
        var currentViewingId = this.get('model.id');
        var currentUserId = parseInt($('meta#userId').attr('content'));
        return currentViewingId == currentUserId;
    }.property('isCurrentUser'),
    needs: ['links', 'link'],
    actions: {
        postLink: function(url){
            this.get('controllers.links').send('postLink', url);
        },
        toggleComments: function(){
            this.get('controllers.link').send('toggleComments');
        },
        postComment: function(comment){
            this.get('controllers.link').send('postComment', comment);
        }
    }
});