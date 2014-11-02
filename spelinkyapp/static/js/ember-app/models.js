/**
 * Created by Tim Martin on 11/1/2014.
 */
Spelinky.User = DS.Model.extend({
    username: DS.attr('string'),
    first_name: DS.attr('string'),
    last_name: DS.attr('string'),
    email: DS.attr('string'),
    active: DS.attr('boolean', {defaultValue: true}),

    roles: DS.hasMany('role'),
    links: DS.hasMany('link')
});

Spelinky.Role = DS.model.extend({
    name: DS.attr('string'),

    users: DS.hasMany('user')
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