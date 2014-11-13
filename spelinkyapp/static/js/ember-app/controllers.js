/**
 * Created by Tim Martin on 11/1/2014.
 */

Spelinky.HomeIndexController = Ember.ArrayController.extend({
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

Spelinky.ProfileController = Ember.ObjectController.extend({
    needs: 'home_index',
    actions: {
        postLink: function(url){
            this.get('controllers.home_index').send('postLink', url);
        }
    }
});