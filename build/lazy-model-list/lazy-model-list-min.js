YUI.add("lazy-model-list",function(h){var g=h.Attribute.prototype,b=YUI.namespace("Env.Model"),f=h.Lang,e=h.Array,d="add",a="error",c="reset";h.LazyModelList=h.Base.create("lazyModelList",h.ModelList,[],{destructor:function(){this._clear();},get:function(i){if(this.attrAdded(i)){return g.get.apply(this,arguments);}return e.map(this._items,function(j){return j[i];});},getAsHTML:function(i){if(this.attrAdded(i)){return h.Escape.html(g.get.apply(this,arguments));}return e.map(this._items,function(j){return h.Escape.html(j[i]);});},getAsURL:function(i){if(this.attrAdded(i)){return encodeURIComponent(g.get.apply(this,arguments));}return e.map(this._items,function(j){return encodeURIComponent(j[i]);});},indexOf:function(i){return e.indexOf(i._isYUIModel?this._models:this._items,i);},reset:function(i,j){i||(i=[]);j||(j={});var k=h.merge({src:"reset"},j);i=i.map(this._modelToObject);k.models=i;if(j.silent){this._defResetFn(k);}else{if(this.comparator){i.sort(h.bind(this._sort,this));}this.fire(c,k);}return this;},toJSON:function(){return this.toArray();},revive:function(k){var j=f.isNumber(k)?k:this.indexOf(k),i;if(j<0){return null;}k=this._items[j];if(!k){return null;}i=this._models[j];if(!i){i=new this.model(k);this._attachList(i);this._models[j]=i;}return i;},_add:function(k,i){var j;i||(i={});k=this._modelToObject(k);if(!("clientId" in k)){k.clientId=this._generateClientId();}if(this._isInList(k)){this.fire(a,{error:"Model is already in the list.",model:k,src:"add"});return;}j=h.merge(i,{index:"index" in i?i.index:this._findIndex(k),model:k});i.silent?this._defAddFn(j):this.fire(d,j);return k;},_clear:function(){e.each(this._models,this._detachList,this);this._clientIdMap={};this._idMap={};this._items=[];this._models=[];},_generateClientId:function(){b.lastId||(b.lastId=0);return this.model.NAME+"_"+(b.lastId+=1);},_isInList:function(i){return !!(("clientId" in i&&this._clientIdMap[i.clientId])||("id" in i&&this._idMap[i.id]));},_modelToObject:function(i){if(i._isYUIModel){i=i.getAttrs();delete i.destroyed;delete i.initialized;}return i;},_remove:function(j,i){if(j._isYUIModel){j=this.indexOf(j);}return h.ModelList.prototype._remove.call(this,j,i);},_defAddFn:function(j){var i=j.model;this._clientIdMap[i.clientId]=i;if(f.isValue(i.id)){this._idMap[i.id]=i;}this._items.splice(j.index,0,i);},_defRemoveFn:function(l){var j=l.index,k=l.model,i=this._models[j];delete this._clientIdMap[k.clientId];if("id" in k){delete this._idMap[k.id];}if(i){this._detachList(i);this._models.splice(j,1);}this._items.splice(j,1);}});},"@VERSION@",{requires:["model-list"]});