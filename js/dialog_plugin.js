(function() {
  var root = this;
  class DialogModelPlugin extends Phaser.Plugins.ScenePlugin {
    constructor (scene, pluginManager) {
      super(scene, pluginManager);

      // this.texture;
      // this.canvas;
      // this.context;
    }

    boot() {
      var eventEmitter = this.systems.events;
      eventEmitter.on('update', this.update, this);
      eventEmitter.on('destroy', this.destroy, this);
    }

    update() {
      //console.log("in dialog plugin update");
    }

    destroy() {
      //console.log("in dialog plugin destroy");
    }

  }

  if (typeof exports !== 'undefined') {
        if (typeof module !== 'undefined' && module.exports) {
            exports = module.exports = DialogModelPlugin;
        }
        exports.DialogModelPlugin = DialogModelPlugin;
    } else if (typeof define !== 'undefined' && define.amd) {
        define('DialogModelPlugin', (function() { return root.DialogModelPlugin = DialogModelPlugin; })() );
    } else {
        root.DialogModelPlugin = DialogModelPlugin;
    }

    return DialogModelPlugin;
}).call(this);




// var DialogModelPlugin = function (scene) {
//   // the scene that owns the plugin
//   this.scene = scene;
//   this.systems = scene.sys;
 
//   if (!scene.sys.settings.isBooted) {
//     scene.sys.events.once('boot', this.boot, this);
//   }
// };
 
// // Register this plugin with the PluginManager
// DialogModelPlugin.register = function (PluginManager) {
//   PluginManager.register('DialogModelPlugin', DialogModelPlugin, 'dialogModel');
// };
 
// DialogModelPlugin.prototype = {
//   // called when the plugin is loaded by the PluginManager
//   boot: function () {
//     var eventEmitter = this.systems.events;
//     eventEmitter.on('shutdown', this.shutdown, this);
//     eventEmitter.on('destroy', this.destroy, this);
//   },
 
//   //  Called when a Scene shuts down, it may then come back again later
//   // (which will invoke the 'start' event) but should be considered dormant.
//   shutdown: function () {},
 
//   // called when a Scene is destroyed by the Scene Manager
//   destroy: function () {
//     this.shutdown();
//     this.scene = undefined;
//   }
// };