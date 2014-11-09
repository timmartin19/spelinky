/**
 * Created by Tim Martin on 11/1/2014.
 */
Spelinky.User = DS.Model.extend({
    username: DS.attr('string'),
    first_name: DS.attr('string'),
    last_name: DS.attr('string'),
    email: DS.attr('string'),
    active: DS.attr('boolean', {defaultValue: true}),
    fullName: function(){
        return this.get('first_name') + " " + this.get('last_name');
    },

    links: DS.hasMany('link'),
    ad_control: DS.belongsTo('adControl', {async: true})
});

Spelinky.Link = DS.Model.extend({
    url: DS.attr('string'),
    title: DS.attr('string'),
    img_url: DS.attr('string'),
    description: DS.attr('string'),
    date_uploaded: DS.attr('date', {
        defaultValue: function(){return new Date();}
    }),

    owner: DS.belongsTo('user')
});

Spelinky.AdControl = DS.Model.extend({
    user: DS.belongsTo('user', {async: true}),
    anonymous: DS.attr('boolean'),
    level: DS.attr('integer')
});