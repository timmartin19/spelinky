/**
 * Created by Tim Martin on 10/23/2014.
 */

Spelinky = {
    resources: {
        allLinks: null,
        linksDiv: null
    },
    mappings: {
        users: {

        },
        links: {
            'objects': {
                key: function(data){
                    return ko.utils.unwrapObservable(data.id);
                },
                create: function(options){
                    return new Spelinky.models.Link(options.data);
                }
            }
        }
    },
    models: {
        User: function(data){

        },
        Link: function(data){
            var self = this;
            ko.mapping.fromJS(data, {}, self);
        }
    },
    retrieve: {
        links: function(){
            url = '/api/link?q=' + JSON.stringify({'order_by': [{field: 'date_uploaded', direction: 'desc'}]});
            $.getJSON(url, function(data){
                if(Spelinky.resources.allLinks == null){
                    Spelinky.resources.allLinks = ko.mapping.fromJS(data, Spelinky.mappings.links);
                    ko.applyBindings(Spelinky.resources.allLinks, Spelinky.resources.linksDiv[0]);
                }else{
                    ko.mapping.fromJS(data, Spelinky.resources.allLinks);
                }
            });
        }
    }
};