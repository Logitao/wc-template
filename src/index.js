/**
 * Import LitElement base class, html helper function,
 * and TypeScript decorators
 **/
import { LitElement, html, customElement, property } from "lit-element";

/**
 * Use the customElement decorator to define your class as
 * a custom element. Registers <my-element> as an HTML tag.
 */
@customElement("my-element")
export class MyElement extends LitElement {
  /**
   * Create an observed property. Triggers update on change.
   */
  @property({ type: Number })
  count = 1;

  @property({ type: Array })
  todos = [];

  @property({ type: Boolean })
  loading = false;

  increment() {
    if (!this.loading) this.count++;
  }

  decrement() {
    if (!this.loading) this.count--;
  }

  async fetchItems() {
    this.loading = true;

    const response = await fetch(
      `https://jsonplaceholder.typicode.com/todos/${this.count}`
    );
    const json = await response.json();

    this.todos = [...this.todos, json];
    this.count++;
    this.loading = false;
  }
  /**
   * Implement `render` to define a template for your element.
   */
  render() {
    /**
     * Use JavaScript expressions to include property values in
     * the element template.
     */
    return html`
      <h1>${this.count}</h1>
      <button ?disabled="${!this.loading}" @click="${this.increment}">+</button>
      <button ?disabled="${!this.loading}" @click="${this.decrement}">-</button>

      ${this.loading
        ? html`
            <span>loading...</span>
          `
        : html`
            <button @click="${this.fetchItems}">fetch</button>
          `}
    `;
  }
}
