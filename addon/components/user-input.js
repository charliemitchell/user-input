import Ember from 'ember';
import layout from '../templates/components/user-input';

export default Ember.Component.extend({
    layout,
    classNameBindings : ['userInputError:user-input-errors'],
    userInputErrorBinding : "errorScope.userInputError",
    inputId: Ember.computed('elementId', function() {
        return "form-input-component-" + this.elementId;
    }),
    errorScope : {
      userInputError : false
    },
    value: '',
    bind_css: null,
    float: false,
    watchVal: Ember.observer('value', function() {
        var val = this.get("value");
        if (val || val === 0) {
            this.set('float', true);
        } else {
            this.set('float', false);
        }
    }),

    didInsertElement () {
        // Sync the input incase there is already a value in it
        Ember.run.scheduleOnce('afterRender', this, () => {
            Ember.run.next(this, 'watchVal');
        });
    }
});
