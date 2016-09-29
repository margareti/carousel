// customElements.define('x-carousel', class Carousel extends HTMLElement {
//   constructor() {
//   	super();

//   	console.log(this);
//   	console.log("ready");
//   	const shadowRoot = this.attachShadow({mode: 'closed'});
//   	shadowRoot.innerHTML = `
// 		<div class="slide"><slot name="slide"></slot></div>
// 		<div class="slide"><slot name="slide"></slot></div>
// 		<div class="slide"><slot name="slide"></slot></div>
//   	`;
//   	shadowRoot.
//   }
// });


document.registerElement('x-carousel', class Carousel extends HTMLElement {
	createdCallback() {
		console.log(this);
    console.log("ready");
    const shadowRoot = this.attachShadow({mode: 'closed'});
  	shadowRoot.innerHTML = `
		<div><slot name="slide"></slot></div>
		<div><slot name="slide"></slot></div>
		<div><slot name="slide"></slot></div>
  	`;
	}
})