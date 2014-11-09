/**
 * Created by Tim Martin on 11/1/2014.
 */
window.Spelinky = Ember.Application.create();

Spelinky.ApplicationAdapter = DS.FixtureAdapter.extend();

Spelinky.NavView = Ember.View.extend({
    tagName: 'li',
    classNameBindings: ['active'],

    active: function(){
        return this.get('childView.firstObject.active');
    }.property()
});

