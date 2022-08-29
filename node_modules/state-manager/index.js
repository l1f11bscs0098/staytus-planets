
(function (factory) {

  if (typeof exports === 'object'){
    module.exports = factory()
  }else{
    this.StateManager = factory()
  }

}(function () {

  var ERRORS = {
    STATE_EXISTS : 'Attempting to add state that already exists.',
    STATE_DOES_NOT_EXIST : 'Attempting to activate a state that does not exist.'
  }

  /**
   * @constructor
   * each 'state' is expected to have a 'create' method. 'preload' and 'destroy' methods are optional
   */
  function StateManager (){

    /**
     * @property {Hash#state}
     */
    this.states = {}

    /**
     * @property {Object#state}
     */
    this.currentState

  }

  /**
   * @method
   * @param {String}
   * @param {Object#state}
   */
  StateManager.prototype.add = function(name, obj) {

    if(this.states[name]) {
      console.warn(ERRORS.STATE_EXISTS)
    }

    this.states[name] = obj

    return this

  }

  /**
   * @method
   * @param {String}
   */
  StateManager.prototype.go = function(name) {

    if(!this.states[name]){
      console.warn(ERRORS.STATE_DOES_NOT_EXIST)
    } else {

      if(this.currentState && this.currentState.destroy){
        this.currentState.destroy()
      }

      this.currentState = this.states[name]

      if(this.currentState.preload){
        var self = this
        this.currentState.preload(function () { self.currentState.create() })
      } else {
        this.currentState.create()
      }
    }
    return this
  }

  return {
    create: function () {
      return new StateManager()
    }
  }

}))
