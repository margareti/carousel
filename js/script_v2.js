class Carousel extends HTMLElement {

  init() {
    const shadowRoot = this.attachShadow({ mode: 'closed' });
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
				margin-bottom: 30px;
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
    this.carousel = shadowRoot.querySelector('.carousel');

    this.innerCarousel = this.carousel.querySelector('.carousel__inner');
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

    prevBtn.addEventListener('click', () => {
      this.prev();
    });
    nextBtn.addEventListener('click', () => {
      this.next();
    });

    playBtn.addEventListener('click', () => {
      this.play();
    });

    pauseBtn.addEventListener('click', () => {
      this.pause();
    });


    this.slideEvent = new CustomEvent('slidechange', {
      detail: {
        slideNum: this.activeSlide,
      },
      bubbles: true,
    });

    this.pausedEvent = new Event('stopped', {
      bubbles: true,
    });
    this.playEvent = new Event('started', {
      bubbles: true,
    });
  }


  next() {
    const nextSlide = this.activeSlide + 1 < this.slidesNum ? this.activeSlide + 1 : 0;
    this.move(nextSlide);
  }

  prev() {
    const nextSlide = this.activeSlide - 1 >= 0 ? this.activeSlide - 1 : this.slidesNum - 1;
    this.move(nextSlide);
  }

  move(num) {
    const offset = num * this.carousel.offsetWidth * -1;
    this.innerCarousel.style.left = `${offset}px`;
    this.activeSlide = num;

    this.dispatchEvent(this.slideEvent);
  }

  pause() {
    clearInterval(this.playing);
    this.dispatchEvent(this.pausedEvent);
  }

  play() {
    const interval = this.trigger(this, this.timeout);
    this.playing = interval;
    this.dispatchEvent(this.playEvent);
  }

  trigger(obj, seconds) {
    return setInterval(() => {
      obj.next();
    }, seconds);
  }

  createdCallback() {
    this.init();
  }
}

