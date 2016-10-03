function Carousel() {}

Carousel.prototype = Object.create(HTMLElement.prototype);

Carousel.prototype.init = function init() {
  this.carousel = shadowRoot.querySelector('.carousel');
  this.carouselWrapper = this.carousel.querySelector('.carousel__inner-wrapper');
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

  const currentObj = this;

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
};

Carousel.prototype.next = function next() {
  const nextSlide = this.activeSlide + 1 < this.slidesNum ? this.activeSlide + 1 : 0;
  this.move(nextSlide);
};

Carousel.prototype.prev = function prev() {
  const nextSlide = this.activeSlide - 1 >= 0 ? this.activeSlide - 1 : this.slidesNum - 1;
  this.move(nextSlide);
};

Carousel.prototype.move = function move(num) {
  const offset = num * this.carousel.offsetWidth * -1;
  this.innerCarousel.style.left = `${offset}px`;
  this.activeSlide = num;
};

Carousel.prototype.pause = function stop() {
  const obj = this;
  clearInterval(obj.playing);
};

function trigger(obj) {
  return setInterval(() => {
    obj.next();
  }, 4000);
}

Carousel.prototype.play = () => {
  const obj = this;
  const interval = trigger(obj);

  this.playing = interval;
};


document.registerElement('x-carousel', class XCarousel extends Carousel {
	createdCallback() {


  console.log(this);
  console.log("ready");
  const shadowRoot = this.attachShadow({ mode: 'closed' });
  shadowRoot.innerHTML = ``;
  
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
			.carousel__inner > *{
			  display: inline-block;
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
  	 new Promise(res => {
  	 	res(shadowRoot.innerHTML += `
	  	<section class='carousel'>
		  	<div class='carousel__inner-wrapper'>
					<slot name="slide"></slot>
				</div>
			</section>
	  	`);
  	 })
  	 .then(() => {
  	 	// const slider = new Carousel;
  	 	// slider.init();
  	 	console.log('added')
  	 })

  // const controls = document.createElement('div');
  // const prevBtn = document.createElement('button');
  // const nextBtn = document.createElement('button');
  // const playBtn = document.createElement('button');
  // const pauseBtn = document.createElement('button');
  // const playWrap = document.createElement('div');
  // playWrap.classList.add('carousel__play');

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
  // shadowRoot.querySelector('.carousel__inner-wrapper').appendChild(controls);
  // shadowRoot.querySelector('.carousel').appendChild(playWrap);


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
  
	}
});
