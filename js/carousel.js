
  function Carousel() {}

  Carousel.prototype.init = function init() {
    this.carousel = document.querySelector('.carousel');
    this.carouselWrapper = this.carousel.querySelector('.carousel__inner-wrap');
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

  const slider = new Carousel;
  slider.init();
