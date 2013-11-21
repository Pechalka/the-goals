//define(["knockout","jquery", "ko.validation"], function(ko, $){

     ko.extenders.localStorage = function(target, opt){
        var key = opt.key;

        if (localStorage.hasOwnProperty(key)) {
            try{
              var initialValue = JSON.parse(localStorage.getItem(key));
              if (opt.map){
                initialValue = ko.utils.arrayMap(initialValue, function(d){ return new opt.map(d); });
              }
              target(initialValue);
            }catch(e){
                console.log('can`t read data from local storage');
            };
        }

        target.subscribe(function(newValue){
            console.log('save');
             localStorage.setItem(key, ko.toJSON(newValue));
        });

        target.save = function(){
          localStorage.setItem(key, ko.toJSON(target));
        }

        return target;
     }


     ko.extenders.fetch = function(target, opt){
        var source = opt.source;
        
        var reload = function(){};


        if (source && (typeof source == 'string' || source instanceof String)) { //string
          reload = function(data){
            data = data || {};
            $.get(source, data, function(data){
              if (opt.type)
                data = ko.utils.arrayMap(data, function(json){
                    return new opt.type(json);
                });
              target(data);
            });
          }
          if (!opt.params)
            reload();
        } else { //not string
            var data = opt.source;
            if (opt.type)
              data = ko.utils.arrayMap(data, function(json){
                  return new opt.type(json);
              });

          target(data);
        }
        target.reload = reload;
        
        if (opt.params){
          var cc = ko.computed(function(){
            var data = ko.toJS(opt.params);
           
           // if (!cc) return;

            reload(data);
          })
        }

        return target;
     }
//})

