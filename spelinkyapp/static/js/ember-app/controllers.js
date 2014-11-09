/**
 * Created by Tim Martin on 11/1/2014.
 */

Spelinky.HomeIndexController = Ember.ArrayController.extend({
    actions: {
        postLink: function(){
            var url = this.get('newUrl');
            if(!url){return false;}
            if(!url.trim()){return;}

            //TODO: Make it actually grab the title and description etc.
            var newLink = this.store.createRecord('link', {
                url: url,
                title: 'A New Link',
                description: 'Hey look this is a link',
                img_url: 'data:image/jpeg;base64,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',
                date_uploaded: new Date(),

                owner: 0
            });

            newLink.save();
            this.set('newUrl', '');
        }
    },
    sortProperties: ['date_uploaded'],
    sortAscending: false
});