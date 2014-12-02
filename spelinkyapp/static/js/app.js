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

Spelinky.ProfileView = Ember.View.extend({
    didInsertElement: function(){
        var self = this;
        Ember.run.next(function(){
            self.$('#adLevelSlider').slider({
                min: 0,
                max: 100,
                value: $('input#adLevelInput').val(),
                change: function(event, ui){
                    $('input#adLevelInput').val(ui.value);
                },
                slide: function(event, ui){
                    Spelinky.UIHelpers.setAdIndicatorControls(ui.value);
                },
                create: function(event, ui){
                    Spelinky.UIHelpers.setAdIndicatorControls($('input#adLevelInput').val())
                }
            });
        });
    }
});

Spelinky.UIHelpers = {
    setAdIndicatorControls: function(value){
        //var red = parseInt((100 - value) * 255 / 100);
        //var green = 255 - red;
        var relativeSize = (50 - value) / 150;
        //$('#adLevelSlider').css('background-color', "rgb(" + red + ', ' + green + ', 50)');
        $('#lessAdsIndicator').css('font-size', (1 + relativeSize) + 'em');
        $('#moreAdsIndicator').css('font-size', (1 - relativeSize) + 'em');
    },
    userId: function(){
        return parseInt($('meta[name="currentUser"]').attr('content'));
    }
};

