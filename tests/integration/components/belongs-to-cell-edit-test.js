import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('belongs-to-cell-edit', 'Integration | Component | belongs to cell edit', {
  integration: true
});

test('it renders', function(assert) {
  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{belongs-to-cell-edit}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#belongs-to-cell-edit}}
      template block text
    {{/belongs-to-cell-edit}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});
