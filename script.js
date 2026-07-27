// 1. Bekleme Ekranı (Preloader) İşlevi (Minimum Süre Garantili)
document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.getElementById('preloader');

    if (preloader) {
        const minLoadingTime = 1500; // 1.5 Saniye minimum görünme süresi

        window.addEventListener('load', function() {
            setTimeout(function() {
                preloader.style.opacity = '0';
                preloader.style.visibility = 'hidden';
                setTimeout(function() {
                    preloader.style.display = 'none';
                }, 500); // Opaklık geçişi bitince DOM'dan tamamen kaldır
            }, minLoadingTime);
        });
    }
});

// 2. Slider İşlevi (Otomatik + Manuel Geri/İleri + Noktalar)
document.addEventListener('DOMContentLoaded', function() {
    const slides = document.querySelectorAll('.slider-container .slide');
    const prevBtn = document.getElementById('sliderPrev');
    const nextBtn = document.getElementById('sliderNext');
    const dotsContainer = document.getElementById('sliderDots');
    let currentSlide = 0;
    const slideIntervalTime = 5000; // 5 Saniye
    let slideTimer = null;

    console.log("Bulunan slayt sayısı:", slides.length);

    if (slides.length === 0) return;

    // Başlangıçta hangi slayt "active" ise ondan başla
    slides.forEach(function(slide, index) {
        if (slide.classList.contains('active')) {
            currentSlide = index;
        }
    });

    // Noktaları (dots) dinamik olarak oluştur
    let dots = [];
    if (dotsContainer) {
        slides.forEach(function(slide, index) {
            const dot = document.createElement('button');
            dot.classList.add('slider-dot');
            dot.setAttribute('aria-label', 'Slayt ' + (index + 1));
            if (index === currentSlide) dot.classList.add('active');
            dot.addEventListener('click', function() {
                goToSlide(index);
                restartAutoplay();
            });
            dotsContainer.appendChild(dot);
            dots.push(dot);
        });
    }

    function updateDots() {
        dots.forEach(function(dot, index) {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    function goToSlide(index) {
        slides[currentSlide].classList.remove('active');
        currentSlide = (index + slides.length) % slides.length;
        slides[currentSlide].classList.add('active');
        updateDots();
    }

    function nextSlide() {
        goToSlide(currentSlide + 1);
    }

    function prevSlide() {
        goToSlide(currentSlide - 1);
    }

    function startAutoplay() {
        slideTimer = setInterval(nextSlide, slideIntervalTime);
    }

    function restartAutoplay() {
        clearInterval(slideTimer);
        startAutoplay();
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            nextSlide();
            restartAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            prevSlide();
            restartAutoplay();
        });
    }

    startAutoplay();
});

// 3. Hizmet Kutuları Tıklama Animasyonu (Phone-Pulse)
document.addEventListener('DOMContentLoaded', function() {
    const serviceLinks = document.querySelectorAll('.service-link');
    const phoneBtn = document.getElementById('floatingPhone');

    if (phoneBtn) {
        serviceLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Sayfanın zıplamasını engeller

                phoneBtn.classList.add('phone-pulse');

                setTimeout(function() {
                    phoneBtn.classList.remove('phone-pulse');
                }, 800);
            });
        });
    }
});

// 4. Sayaç (Counter) İşlevi
document.addEventListener("DOMContentLoaded", function() {
    const counters = document.querySelectorAll('.counter');
    let speed = 150; // Sayım hızı (küçüldükçe hızlanır)

const runCounter = (counter) => {
    const target = +counter.getAttribute('data-target');
    let count = 0;

    const updateCount = () => {
        const increment = target / speed;
        if (count < target) {
            count += increment;
            counter.innerText = Math.ceil(count);
            setTimeout(updateCount, 20);
        } else {
            counter.innerText = target;
        }
    };
    updateCount();
};

const observerOptions = {
    root: null,
    threshold: 0.1
};

const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetCounter = entry.target;
            if(!targetCounter.classList.contains('started')) {
                targetCounter.classList.add('started');
                runCounter(targetCounter);
            }
        }
    });
}, observerOptions);

counters.forEach(counter => {
    observer.observe(counter);
});
});

// 5. Animasyonlu Mobil Menü (Yeni Eklenen)
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menuToggle');
    const navList = document.getElementById('navList');

    if (menuToggle && navList) {
        menuToggle.addEventListener('click', function() {
            // Menü açılıp kapanma class'ı
            const isOpen = navList.classList.toggle('nav-open');
            // İkona animasyon ekleyen class
            menuToggle.classList.toggle('is-active');

            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');

            // X ve Bars geçişi
            menuToggle.innerHTML = isOpen
            ? '<i class="fa-solid fa-xmark"></i>'
            : '<i class="fa-solid fa-bars"></i>';
        });

        // Bir menü linkine tıklanınca mobil menüyü animasyonlu kapat
        navList.querySelectorAll('a').forEach(function(link) {
            link.addEventListener('click', function() {
                navList.classList.remove('nav-open');
                menuToggle.classList.remove('is-active');
                menuToggle.setAttribute('aria-expanded', 'false');
                menuToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });
    }
});
