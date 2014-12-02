/**
 * Created by Tim Martin on 11/1/2014.
 */

Spelinky.Router.map(function() {
    this.resource('home', { path: '/'}, function(){
        this.resource('links', { path: '/' });
        this.resource('profile', { path: '/profile/:id' }, function(){});
    });
});

Spelinky.HomeRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('user', Spelinky.userId);
    }
});

Spelinky.ProfileRoute = Ember.Route.extend({
    model: function(params){
        var userId = null;
        if(params == null || params.id == null) {
            userId = $('meta#userId').attr('content');
        }else{
            userId = params.id;
        }
        return this.store.find('user', userId);
    }
});

Spelinky.ProfileIndexRoute = Ember.Route.extend({
    model: function(params){
        var userId = null;
        if(params == null || params.id == null) {
            userId = $('meta#userId').attr('content');
        }else{
            userId = params.id;
        }
        this.store.filter('link', function(link){
            var linkId = link.get('owner').get('id');
           return  linkId === userId;
        });
    }
});

Spelinky.LinksRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('link');
    }
});