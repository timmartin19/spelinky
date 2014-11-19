/**
 * Created by Tim Martin on 11/1/2014.
 */

Spelinky.HomeIndexController = Ember.ArrayController.extend({
    sortProperties: ['date_uploaded'],
    sortAscending: true
});

Spelinky.ProfileController = Ember.ObjectController.extend({
    isCurrentUser: function(){
        var currentViewingId = this.get('model.id');
        var currentUserId = parseInt($('meta#userId').attr('content'));
        return currentViewingId == currentUserId;
    }.property('isCurrentUser')
});