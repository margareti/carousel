class Carousel extends HTMLElement {
  constructor() {
    super();
  }

  init() {

  	const shadowRoot = this.attachShadow({ mode: 'closed' });
  	shadowRoot.innerHTML = ``;
  	shadowRoot.innerHTML += `
	  	<section class='carousel'>
		  	<div class='carousel__inner'>
					<article>
						<img src="http://placehold.it/700x300">
					</article> 
					<article>
						<img src="http://placehold.it/700x300">
					</article>
					<article >
						<img src="http://placehold.it/700x300">
					</article>
				</div>
			</section>
  	`;

    this.carousel = shadowRoot.querySelector('.carousel');
    this.carouselWrapper = this.carousel.querySelector('.carousel__inner-wrap');
    this.innerCarousel = this.carousel.querySelector('.carousel__inner');

    console.log('shadow root ', shadowRoot);
    console.log('this carousel ', this.carousel);
    console.log('this caoursel-wrap ', this.carouselWrapper);

    // const slides = [...this.innerCarousel.children];
    // const playWrap = document.createElement('div');
    // playWrap.classList.add('carousel__play');

    // const controls = document.createElement('div');
    // const prevBtn = document.createElement('button');
    // const nextBtn = document.createElement('button');
    // const playBtn = document.createElement('button');
    // const pauseBtn = document.createElement('button');

    // this.slidesNum = slides.length;
    // this.activeSlide = 0;

    // prevBtn.classList.add('prev');
    // nextBtn.classList.add('next');
    // prevBtn.innerHTML = '&lsaquo;';
    // nextBtn.innerHTML = '&rsaquo;';

    // playBtn.innerHTML = '►';
    // pauseBtn.innerHTML = '❚❚';
    // playBtn.classList.add('play');
    // pauseBtn.classList.add('pause');

    // playWrap.appendChild(playBtn);
    // playWrap.appendChild(pauseBtn);

    // controls.appendChild(prevBtn);
    // controls.appendChild(nextBtn);

    // controls.classList.add('carousel__controls');
    // this.carousel.appendChild(controls);
    // this.carousel.appendChild(playWrap);

    // const currentObj = this;

    // prevBtn.addEventListener('click', () => {
    //   currentObj.prev();
    // });
    // nextBtn.addEventListener('click', () => {
    //   currentObj.next();
    // });

    // playBtn.addEventListener('click', () => {
    //   currentObj.play();
    // });

    // pauseBtn.addEventListener('click', () => {
    //   currentObj.pause();
    // });
  };
  createdCallback() {
  	console.log(this);
  	this.init();
  }
}


document.registerElement('x-carousel', Carousel);