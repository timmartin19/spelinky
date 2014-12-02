/**
 * Created by Tim Martin on 11/18/2014.
 */
Spelinky.LinksContainerComponent = Ember.Component.extend({
    linksGrouping: function(){
        var toReturn = [];
        var tempArray = null;
        for(var i=0; i < this.get('links.length'); i++){
            if(i % 2 == 0){
                if(tempArray != null){
                    toReturn.push(tempArray);
                }
                tempArray = [];
            }
            tempArray.push(this.get('links').objectAt(i));
        }
        if(tempArray.length > 0){
            toReturn.pushObject(tempArray);
        }
        return toReturn;
    }.property('links')
});

Spelinky.IndvLinkComponent = Ember.Component.extend({
    actions: {
        toggleComments: function(){
            this.set('viewingComments', !this.get('viewingComments'));
        }
    },
    viewingComments: false
});

Spelinky.CommentsContainerComponent = Ember.Component.extend({
    actions: {
        postComment: function(comment){
            if(!comment){return false;}
            if(!comment.trim()){return;}
            var store = this.get('store');
            var comments = this.get('comments');
            var self = this;
            var userId = $('meta#userId').attr('content');
            store.find('user', userId).then(function(owner){
                var new_comment = store.createRecord('comment', {
                    comment_text: comment,
                    owner: owner
                });
                comments.pushObject(new_comment);
                new_comment.save();
                self.set('newComment', '');
            })
        }
    }
});