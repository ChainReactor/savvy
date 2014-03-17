#savvy

> A mobile-first Javascript wrapper built on top of Zynga core. Consider it your jQuery / Zepto Replacement if you understand javascript and want something powerful yet lightweight.

## Dependencies:

   I recommend using [grunt-dependency-resolver] (https://github.com/zynga/grunt-dependency-resolver) as it pulls in classes only when needed. You could also try JASY, or just include the packages you need.  
   If you don't go with the dependency resolver, you will need [core] (https://github.com/zynga/core) at least.  

## High-Level Features:

### Widget - View - Resource Framework (Similar to MVC)
   Widgets control logic. [Widget] (https://github.com/ChainReactor/savvy/blob/master/source/class/widget/Widget.js)  
   Views control DOM. [View] (https://github.com/ChainReactor/savvy/blob/master/source/class/widget/View.js)  
   Resources control Data. [Resource] (https://github.com/ChainReactor/savvy/blob/master/source/class/common/Resource.js)  
### Event Emitters/Listeners and a Global EventBus.
   Emitters can emit / bind / unbind. [Emitter] (https://github.com/ChainReactor/savvy/blob/master/source/class/common/Emitter.js)  
   EventBus wraps Emitter in Module. [EventBus] (https://github.com/ChainReactor/savvy/blob/master/source/class/EventBus.js)  

### Basic Platform Detection
   Bad Androids, Mobile vs Desktop, etc [Platform] (https://github.com/ChainReactor/savvy/blob/master/source/class/Platform.js)  

### Laconic Dom Support
   savvy.Dom.div({className: 'MYCLASS') vs $('div').className() [Dom]  (https://github.com/ChainReactor/savvy/blob/master/source/class/Dom.js)  

### Pointer Handling:
   Touch / Mouse normalization. [Pointer] (https://github.com/ChainReactor/savvy/blob/master/source/class/Pointer.js)  

### Network Handling:
   Common XHR solutions handled. [Network] (https://github.com/ChainReactor/savvy/blob/master/source/class/Network.js)  

### Deep / Simple Recursion Support
   You control the levels, or let it detect. [Extend] (https://github.com/ChainReactor/savvy/blob/master/source/class/Extend.js)  

### Some additional niceties.
   A Page / PageView example [Page] (https://github.com/ChainReactor/savvy/blob/master/source/class/page/Page.js) 
   [PageView] (https://github.com/ChainReactor/savvy/blob/master/source/class/page/PageView.js)  

   A common Dialog Class [Dialog] (https://github.com/ChainReactor/savvy/blob/master/source/class/Dialog.js)  
   A common Button Class [Button] (https://github.com/ChainReactor/savvy/blob/master/source/class/Button.js)  
   A common Notif Class [Notif] (https://github.com/ChainReactor/savvy/blob/master/source/class/Notif.js)  

## More To Come

### Resource
> A Resource is a Controller for data.
> An EventedResource emits events when its data is loaded, updated, or destroyed.

### Widget
> A Widget is a Controller for a View. It can contain Child Widgets. It typically receives Resources / Events and Updates / Renders its View based on changes.
> An EventedWidget is meant for Parent / Child widgets to bind to.
