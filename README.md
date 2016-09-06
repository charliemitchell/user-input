# user-input
Here's a fun little input, with extra attention to user experience. The placeholder is actually a label, and behave in a simliar way to the material design paper-input. I took this a step further and made an input where the placeholder stays on the same field of view when you click on the input. Then after typing in it, it then moves above the input.

## What it looks like
#### State One (Placeholding)
<img src="/images/placehold.png" height="40px">
#### State Two (:focus)
<img src="/images/active.png" height="40px">
#### State Three (Input Has Content)
<img src="/images/content.png" height="50px">

## Usage
```
{{user-input value=model.name}}
```

## Options
- input attributes
  - type `{{user-input type="phone" ...`
  - class  `{{user-input css="my-input-class" ...`
  - value `{{user-input value=model.value ...`
  - required `{{user-input required="true" ...`
  - tabindex `{{user-input tabindex="1" ...` 
  - disabled `{{user-input disabled="true" ...` 
- element attributes
  - class `{{user-input bind_css="some-class some-other-class" ...`
- other options
  - errorScope `{{user-input errorScope=this ...` (see below)

## Validation, other common things we do on inputs
Since there is essentially an endless amount of things people may want to do on an input, there is a full proof way to handle every case, either create a new component, and extend it from user-input like so... (Copy addon/templates/components/user-input.hbs as a base for your new component...)

Older Syntax
```
// Generate another component...
import userInput from 'user-input/components/user-input';
export default userInput.extend({
  doOtherStuff : () {
    console.log('I am a user-input that does other stuff');
  }
});
```

Newer Syntax...
```
// Given another component called my-new-user-input...
import userInput from 'user-input/components/user-input';
import layout from '../templates/components/my-new-user-input'
export default userInput.extend({
  layout,
  doOtherStuff : () {
    console.log('I am a user-input that does other stuff');
  }
});
```

<b>addon/templates/components/user-input.hbs</b>
```
<div {{bind-attr class=":floating-placeholder bind_css float:floating-placeholder-float"}}>
    {{input type=type id=inputId class=css value=value required=required tabindex=tabindex disabled=disabled}}
    <label {{bind-attr for=inputId}}>{{label}} {{#if required}} * {{/if}}</label>
</div>
```


Or pass in a component/controller/singleton/etc... to `errorScope=...` and user-input will look for `userInputError : true` on the value passed in then add/remove a class `user-input-errors` to the component's element so that you can add some css to it's children to notify the user that something went wrong... (See fig.1), lastly if none of these work, fork user-input and build out your own edge case (the code for this addon is dead simple). Validation should happen through Ember's Observer and implemented on the scope that contains this component.

fig.1 (Hiearchy of child-nodes)
```
.user-input-errors
  .floating-placeholder
  input
  label
```

Example of adding error classes based on validation...

template.hbs
```
  {{user-input errorScope=this value=model.name}}
```

js
```
{
  value : '',
  userInputError : false,
  valueIsValid : Ember.observer('value', function() {
      var val = this.get("value");
      if (val || val === 0) {
          this.set('userInputError', false);
      } else {
          this.set('userInputError', true);
      }
  }), 
}
```

## Styling
It will be inevitable that you will need to adjust the styling of this component to match your look and feel. There is a folder named compass that contains the scss file used to generate the css file for this component. If you are using SCSS you can copy this file over to your build and edit it to your liking. If you are looking to just change the colors then the following scss should do the trick.
```
.floating-placeholder {
  &:not(.floating-placeholder-float) input:focus + label {
    color: $colorWhenLabelHasShiftedToTheRight;
  }
}

.floating-placeholder label{
  color: $colorWhenLabelIsPlaceholding;
}

.floating-placeholder-float {
  label {
    color : $colorWhenLabelHasShiftedToTheTop;
  }
}
```

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://ember-cli.com/](http://ember-cli.com/).
