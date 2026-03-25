async function loadComponent(id, file) {
  const res = await fetch(file);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

async function init() {
  await loadComponent("nav", "./src/components/nav.html");
  await loadComponent("hero", "./src/components/hero.html");
  await loadComponent("about", "./src/components/about.html");
  await loadComponent("accommodation", "./src/components/accommodation.html");
  await loadComponent("gallery", "./src/components/gallery.html");
  await loadComponent("testimonials", "./src/components/testimonials.html");
  await loadComponent("contact", "./src/components/contact.html");
  await loadComponent("footer", "./src/components/footer.html");

  // 🚨 RUN ORIGINAL CODE ONLY AFTER COMPONENTS LOAD
  runApp();
}

init();

function runApp() {

  // Default config
  const defaultConfig = {
    hero_title: 'La Vue',
    hero_subtitle: 'Port Shepstone',
    hero_tagline: 'Where the ocean meets quiet luxury',
    about_heading: 'A Coastal Sanctuary',
    about_text: 'Perched along the KwaZulu-Natal South Coast...',
    accommodation_heading: 'The Experience',
    contact_heading: 'Begin Your Stay',
    contact_email: 'lavue.portshepstone@gmail.com',
    contact_phone: '+27 76 163 2064',
    background_color: '#FAF8F5',
    surface_color: '#FFFFFF',
    text_color: '#1A1A1A',
    primary_action_color: '#C9A96E',
    secondary_action_color: '#A89F94',
    font_family: 'Playfair Display',
    font_size: 16
  };

  // Element SDK
  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (config) => {
        const c = { ...defaultConfig, ...config };

        document.getElementById('hero-title').textContent = c.hero_title;
        document.getElementById('hero-subtitle').textContent = c.hero_subtitle;
        document.getElementById('hero-tagline').textContent = c.hero_tagline;
        document.getElementById('about-heading').textContent = c.about_heading;
        document.getElementById('about-text').textContent = c.about_text;
        document.getElementById('accommodation-heading').textContent = c.accommodation_heading;
        document.getElementById('contact-heading').textContent = c.contact_heading;
        document.getElementById('contact-email-display').textContent = c.contact_email;
        document.getElementById('contact-phone-display').textContent = c.contact_phone;

        document.getElementById('app-root').style.backgroundColor = c.background_color;
      }
    });
  }

  // Scroll reveal
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // Mobile nav
  document.getElementById('menu-toggle')?.addEventListener('click', () => {
    document.getElementById('mobile-nav').classList.add('open');
  });

  document.getElementById('menu-close')?.addEventListener('click', () => {
    document.getElementById('mobile-nav').classList.remove('open');
  });

  // Form
  document.getElementById('contact-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = {
      name: document.getElementById('cf-name').value,
      email: document.getElementById('cf-email').value,
      dates: document.getElementById('cf-dates').value,
      message: document.getElementById('cf-message').value
    };

    try {
      await fetch('https://formspree.io/f/mdokqnpv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      alert("Message sent!");
      e.target.reset();
    } catch (err) {
      alert("Failed to send.");
    }
  });

  // Icons
  if (window.lucide) lucide.createIcons();
}