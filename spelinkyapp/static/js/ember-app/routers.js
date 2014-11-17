/**
 * Created by Tim Martin on 11/1/2014.
 */

Spelinky.Router.map(function() {
    this.resource('home', { path: '/'}, function(){
        this.resource('links', { path: '/links' });
        this.resource('profile', { path: '/profile/:id' });
    });
});

Spelinky.HomeRoute = Ember.Route.extend({
    model: function(){
        return this.store.find('link');
    },
    renderTemplate: function(){
        this.render();
        this.render("nav", {
            outlet: "nav",
            into: "home"
        })
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