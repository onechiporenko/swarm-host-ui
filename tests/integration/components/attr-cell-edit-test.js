import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('attr-cell-edit', 'Integration | Component | attr cell edit', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{attr-cell-edit}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#attr-cell-edit}}
      template block text
    {{/attr-cell-edit}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
