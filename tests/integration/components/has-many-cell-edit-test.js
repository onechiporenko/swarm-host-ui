import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('has-many-cell-edit', 'Integration | Component | has many cell edit', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{has-many-cell-edit}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#has-many-cell-edit}}
      template block text
    {{/has-many-cell-edit}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
