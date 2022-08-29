state-manager
=============

versatile state managing abstraction

### usage

```js
    /* ============ example #1 ============ 
        basic usage
    =====================================*/

    var StateManager = require('state-manager')
    var myStates = StateManager.create()
        .add('state1', {
            create: function () {
                console.log('hello from state 1')
            }
        })
        .add('state2', {
            create: function () {
                console.log('hello from state 2')
            }
        })

    // to activate a state
    myStates.go('state1')
    
    // some time later perhaps from within state1 itself
    myState.go('state2')


    /* ============ example #2 ============ 
        optional state methods
    =====================================*/

    var StateManager = require('state-manager')
    var myStates = StateManager.create()
        .add('state1', {
            preload: function (done) {
                // call done() to move onto 'create'
                done()
            },
            create: function () {
            },
            destroy: function () {
                // called when you switch to another state
            }
        })


    /* ============ example #3 ============ 
        pattern #1
    =====================================*/
    
    var StateManager = require('state-manager')
    var myStates = StateManager.create()
        .add('state1', state1())
    
    function state1 () {
        var foo = 123
        return {
            create: function () {
                console.log(foo)
            }
        }
    }

```