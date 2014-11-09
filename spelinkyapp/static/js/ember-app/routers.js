/**
 * Created by Tim Martin on 11/1/2014.
 */

Spelinky.Router.map(function() {
    this.resource('home', { path: '/'}, function(){
        this.resource('links', { path: '/links' });
        this.resource('profile', { path: '/profile' }, function(){
            this.resource('ad', { path: '/adcontrol' });
        });
    });
});

Spelinky.HomeRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('link');
    }
});

Spelinky.ProfileRoute = Ember.Route.extend({
    model: function(){
        var userId = $('meta#userId').attr('content');
        return this.store.find('user', userId);
    }
});

Spelinky.AdRoute = Ember.Route.extend({
    model: function(params){
        alert(JSON.stringify(params));
        return this.store.find('adControl', params.id);
    }
});

Spelinky.LinksRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('link');
    }
});

Spelinky.LinksUserRoute = Ember.Route.extend({
    model: function(params){
        return this.store.findQuery('link', params);
    }
});