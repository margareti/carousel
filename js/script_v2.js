class Carousel extends HTMLElement {
  constructor() {
    super();
  }

  init() {

  	const shadowRoot = this.attachShadow({ mode: 'closed' });
  	// <article class="carousel__slide">
			// 				<img src="http://placehold.it/700x300">
			// 			</article>
			// 			<article class="carousel__slide">
			// 				<img src="http://placehold.it/700x300">
			// 			</article>
			// 			<article class="carousel__slide">
			// 				<img src="http://placehold.it/700x300">
			// 			</article>
			// 			<article class="carousel__slide">
			// 				<img src="http://placehold.it/700x300">
			// 			</article>
  	shadowRoot.innerHTML = `
	  	<section class='carousel'>
		  	<div class="carousel__inner-wrapper">
					<div class="carousel__inner">
						<slot name="s1"></slot>
						<slot name="s2"></slot>
						<slot name="s3"></slot>
					</div>
				</div>
  	
			</section>
  	`;
  	shadowRoot.innerHTML += `
		<style>
			body {
				margin: 0;
				padding: 0;
				font-family: Helvetica, Arial, sans-serif;
				color: #333;
				padding-top: 100px;
			}

			.carousel {
				max-width: 700px;
				margin: 0 auto;

				position: relative;
			}
			.carousel__inner-wrapper {
					overflow: hidden;
			}
			.carousel__inner {
			  white-space: nowrap;
			  font-size: 0;
			  position: relative;
			  transition: 0.2s;
			  transition-timing-function: ease-in;
			  left: 0;
			}
			.carousel__inner > ::slotted(.carousel__slide){
			  display: inline-block !important;
			  font-size: 16px;
			}
			.carousel__controls button {
			    
			    font-size: 42px;
			    line-height: 40px;
			    padding: 10px 10px;

			    position: absolute;
			    top: 50%;
			    transform: translateY(-50%);
			}
			.carousel__controls .next {
				right: -39px;
				border-left: none;
			}
			.carousel__controls .prev {
			    left: -39px;
			    border-right: none;
			}
			.carousel__play button {
			    margin-right: 10px;
			    width: 40px;
			    height: 40px;
			    border-radius: 50%;
			}
			.carousel button {
				cursor: pointer;
				color: #333;
				box-sizing: border-box;
				background: none;
				border: 3px solid pink;
				display: inline-block;
			  font-family: Tahoma, sans-serif;
			}
			.carousel button:focus {
				outline: none;
			}
		</style>
  	`;
  	this.timeout = parseInt(this.getAttribute('timeout'), 10) * 1000;
  	console.log('this is ', this)
    this.carousel = shadowRoot.querySelector('.carousel');
    this.carouselWrapper = this.carousel.querySelector('.carousel__inner-wrap');
    this.innerCarousel = this.carousel.querySelector('.carousel__inner');

    console.log('shadow root ', shadowRoot);
    console.log('this carousel ', this.carousel);
    console.log('this caoursel-wrap ', this.carouselWrapper);

    const slides = [...this.innerCarousel.children];
    const playWrap = document.createElement('div');
    playWrap.classList.add('carousel__play');

    const controls = document.createElement('div');
    const prevBtn = document.createElement('button');
    const nextBtn = document.createElement('button');
    const playBtn = document.createElement('button');
    const pauseBtn = document.createElement('button');

    this.slidesNum = slides.length;
    this.activeSlide = 0;

    prevBtn.classList.add('prev');
    nextBtn.classList.add('next');
    prevBtn.innerHTML = '&lsaquo;';
    nextBtn.innerHTML = '&rsaquo;';

    playBtn.innerHTML = '►';
    pauseBtn.innerHTML = '❚❚';
    playBtn.classList.add('play');
    pauseBtn.classList.add('pause');

    playWrap.appendChild(playBtn);
    playWrap.appendChild(pauseBtn);

    controls.appendChild(prevBtn);
    controls.appendChild(nextBtn);

    controls.classList.add('carousel__controls');
    this.carousel.appendChild(controls);
    this.carousel.appendChild(playWrap);

    const currentObj = this;
    console.log("this is ", this)

    prevBtn.addEventListener('click', () => {
      currentObj.prev();
    });
    nextBtn.addEventListener('click', () => {
      currentObj.next();
    });

    playBtn.addEventListener('click', () => {
      currentObj.play();
    });

    pauseBtn.addEventListener('click', () => {
      currentObj.pause();
    });


    this.slideEvent = new Event("slidechange", {
  		//detail: this.activeSlide,
  		bubbles: true,
		});

    this.pausedEvent = new Event("stopped", {
    	bubbles: true,
  		// detail: {
		  //   playing: false,
		  // }
		});
    this.playEvent = new Event("started", {
    	bubbles: true,
  		// detail: {
		  //   playing: true,
		  // }
		});
  };


  next() {
    const nextSlide = this.activeSlide + 1 < this.slidesNum ? this.activeSlide + 1 : 0;
    this.move(nextSlide);
  };

  prev() {
    const nextSlide = this.activeSlide - 1 >= 0 ? this.activeSlide - 1 : this.slidesNum - 1;
    this.move(nextSlide);
  };

  move(num) {
    const offset = num * this.carousel.offsetWidth * -1;
    this.innerCarousel.style.left = `${offset}px`;
    this.activeSlide = num;

    this.dispatchEvent(this.slideEvent);
  };

  pause() {
    const obj = this;
    clearInterval(obj.playing);
    this.dispatchEvent(this.pausedEvent);
  };

	play() {
    const obj = this;
    const interval = this.trigger(obj, this.timeout);
    this.playing = interval;
    this.dispatchEvent(this.playEvent);
  };



  trigger(obj, seconds) {
    return setInterval(() => {
      obj.next();
    }, seconds);
  }

  createdCallback() {
  	console.log(this);
  	this.init();
  }
}


document.registerElement('x-carousel', Carousel);

document.querySelector('body').addEventListener('started', function(e) { 
	//process(e.detail);
	console.log('started');
});

document.querySelector('body').addEventListener('stopped', function(e) { 
	//process(e.detail);
	console.log('paused');
});
document.querySelector('body').addEventListener('slidechange', function(e) { 
	console.log('slidechange ' + JSON.stringify(e));
	//process(e.detail) 
});