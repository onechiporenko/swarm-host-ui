import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('relationship-cell-edit', 'Integration | Component | relationship cell edit', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{relationship-cell-edit}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#relationship-cell-edit}}
      template block text
    {{/relationship-cell-edit}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
