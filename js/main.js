/**
 * The Interior Hub - Fast, lightweight UI interactions
 * Zero-bloat vanilla JavaScript + WhatsApp Integration & Material Calculator
 */

document.addEventListener('DOMContentLoaded', () => {
  const WHATSAPP_PHONE = '917006437148';

  // Mobile Navigation Toggle
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const isOpen = mobileDrawer.classList.contains('open');
      mobileToggle.setAttribute('aria-expanded', isOpen);
    });

    // Close mobile drawer when clicking any link
    const drawerLinks = mobileDrawer.querySelectorAll('a');
    drawerLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Material Category Filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter || category.includes(filter)) {
          card.style.display = 'flex';
          card.style.opacity = '1';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Material Quantity & Area Estimator (Useful Practical Tool)
  const calcMaterial = document.getElementById('calcMaterial');
  const calcWidth = document.getElementById('calcWidth');
  const calcHeight = document.getElementById('calcHeight');
  const calcResultValue = document.getElementById('calcResultValue');
  const calcResultSub = document.getElementById('calcResultSub');
  const calcWaBtn = document.getElementById('calcWaBtn');

  function updateEstimate() {
    if (!calcMaterial || !calcWidth || !calcHeight || !calcResultValue) return;

    const w = parseFloat(calcWidth.value) || 0;
    const h = parseFloat(calcHeight.value) || 0;
    const area = Math.round(w * h);
    const material = calcMaterial.value;

    let qtyText = "--";
    let subText = "Enter dimensions above to view estimate";

    if (area > 0) {
      if (material === 'louvers') {
        const panels = Math.ceil((w / 0.42) * 1.05);
        qtyText = `~${panels} Louver Panels`;
        subText = `Wall Area: ${area} sq.ft (includes 5% cutting buffer)`;
      } else if (material === 'pvc_marble') {
        const sheets = Math.ceil((area / 32) * 1.05);
        qtyText = `~${sheets} Marble Sheets`;
        subText = `Wall Area: ${area} sq.ft (Standard 8ft x 4ft sheets)`;
      } else if (material === 'fluted') {
        const panels = Math.ceil((w / 0.5) * 1.05);
        qtyText = `~${panels} Fluted Panels`;
        subText = `Wall Area: ${area} sq.ft (includes 5% cutting buffer)`;
      } else if (material === 'flooring') {
        const sqft = Math.round(area * 1.08);
        const boxes = Math.ceil(sqft / 20);
        qtyText = `~${sqft} Sq.Ft (${boxes} Boxes)`;
        subText = `Floor Area: ${area} sq.ft + 8% installation margin`;
      } else if (material === 'wallpaper') {
        const rolls = Math.ceil(area / 50);
        qtyText = `~${rolls} Wallpaper Rolls`;
        subText = `Wall Area: ${area} sq.ft (Standard European rolls)`;
      }

      const matName = calcMaterial.options[calcMaterial.selectedIndex].text;
      const waMsg = `Hello Azaim,\nI used your website material calculator:\n- Product: ${matName}\n- Dimensions: ${w} ft (Width) x ${h} ft (Height) = ${area} sq.ft\n- Estimated Quantity: ${qtyText}\nPlease share available designs, catalogue options, and your best quotation.`;
      if (calcWaBtn) {
        calcWaBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMsg)}`;
      }
    } else {
      if (calcWaBtn) {
        calcWaBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Hello Azaim, I want to inquire about materials for my interior project in Srinagar.")}`;
      }
    }

    calcResultValue.textContent = qtyText;
    calcResultSub.textContent = subText;
  }

  if (calcMaterial && calcWidth && calcHeight) {
    calcMaterial.addEventListener('change', updateEstimate);
    calcWidth.addEventListener('input', updateEstimate);
    calcHeight.addEventListener('input', updateEstimate);
    updateEstimate();
  }

  // Floating WhatsApp Interactive Widget
  const waTriggerBtn = document.getElementById('waTriggerBtn');
  const waChatCard = document.getElementById('waChatCard');
  const waCloseBtn = document.getElementById('waCloseBtn');
  const waCustomInput = document.getElementById('waCustomInput');
  const waSendBtn = document.getElementById('waSendBtn');

  if (waTriggerBtn && waChatCard) {
    waTriggerBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      waChatCard.classList.toggle('open');
    });

    if (waCloseBtn) {
      waCloseBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        waChatCard.classList.remove('open');
      });
    }

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!waChatCard.contains(e.target) && !waTriggerBtn.contains(e.target)) {
        waChatCard.classList.remove('open');
      }
    });

    // Custom input send
    function sendWaCustom() {
      const text = waCustomInput.value.trim();
      if (!text) return;
      const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent("Hello Azaim, " + text)}`;
      window.open(url, '_blank', 'noopener,noreferrer');
      waCustomInput.value = '';
      waChatCard.classList.remove('open');
    }

    if (waSendBtn) {
      waSendBtn.addEventListener('click', sendWaCustom);
    }
    if (waCustomInput) {
      waCustomInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') sendWaCustom();
      });
    }

    // Quick chips
    document.querySelectorAll('.wa-chip-btn').forEach(chip => {
      chip.addEventListener('click', () => {
        const prompt = chip.getAttribute('data-msg');
        const url = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(prompt)}`;
        window.open(url, '_blank', 'noopener,noreferrer');
        waChatCard.classList.remove('open');
      });
    });
  }

  // Quick Spec Modal
  const modalOverlay = document.getElementById('specModal');
  const modalClose = document.getElementById('modalClose');
  const modalTitle = document.getElementById('modalTitle');
  const modalDesc = document.getElementById('modalDesc');
  const modalSpecs = document.getElementById('modalSpecs');
  const modalWaBtn = document.getElementById('modalWaBtn');

  const productData = {
    louvers: {
      title: "WPC & Charcoal Louvers",
      desc: "High-density exterior & interior fluted battens designed for weather resilience, term-resistance, and modern dimensional depth.",
      specs: [
        "100% Waterproof & Termite-proof",
        "Charcoal and natural wood grain finishes",
        "Suitable for accent walls, facades, and ceilings",
        "Concealed clip interlocking installation"
      ]
    },
    fluted: {
      title: "Fluted Wall Panels",
      desc: "Contemporary linear texture panels for luxury interior accents, television consoles, foyer entries, and master bedroom backdrops.",
      specs: [
        "Lightweight high-grade polymer composition",
        "Pre-finished contemporary matte & satin coatings",
        "Enhanced acoustic sound dampening properties",
        "Seamless tongue & groove joints"
      ]
    },
    pvc: {
      title: "PVC & UV Marble Wall Panels",
      desc: "Ultra-luxury marble and slate sheet claddings providing authentic stone aesthetics with 1/10th the weight and effortless maintenance.",
      specs: [
        "High-gloss scratch & UV-resistant coating",
        "Available with brass and gold accent T-profiles",
        "Zero water absorption, ideal for moisture-prone areas",
        "Instant adhesive installation over existing walls"
      ]
    },
    wallpapers: {
      title: "Designer Luxury Wallpapers",
      desc: "Imported textures, woven metallic threads, botanical accents, and bespoke architectural motifs for elevated living rooms and bedrooms.",
      specs: [
        "Heavyweight vinyl & non-woven breathable backings",
        "Washable and colorfast pigments",
        "Custom seamless wall mural sizing available",
        "Professional dust-free installation in Srinagar"
      ]
    },
    flooring: {
      title: "Laminated Wooden Flooring",
      desc: "European-standard AC4/AC5 heavy commercial & residential grade wood planks with authentic beveled edges and natural grain feel.",
      specs: [
        "AC4 / AC5 Heavy-Duty Scratch Resistance",
        "Click-lock glueless installation system",
        "Thermal & moisture insulation underlay compatibility",
        "Multiple shades: Natural Honey Oak, Walnut, Nordic Ash"
      ]
    },
    hardware: {
      title: "Architectural Hardware & Edge Banding",
      desc: "Precision-crafted brushed brass, champagne gold, and matte black handles, knurled knobs, concealed hinges, and color-matched edge bands.",
      specs: [
        "Solid brass & premium zinc alloy construction",
        "Durable PVD gold and electroplated coatings",
        "PVC & ABS matching edge banding tapes (0.8mm - 2mm)",
        "Flawless fit for modular wardrobes and cabinetry"
      ]
    }
  };

  document.querySelectorAll('.view-spec-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const key = btn.getAttribute('data-product');
      const item = productData[key];
      if (item && modalOverlay) {
        modalTitle.textContent = item.title;
        modalDesc.textContent = item.desc;
        modalSpecs.innerHTML = item.specs.map(s => `<li><span style="color:var(--c-gold-600);margin-right:6px;">✦</span>${s}</li>`).join('');
        
        const waMsg = `Hello Azaim, I am interested in specifications & pricing for ${item.title}. Can you share catalogue options?`;
        modalWaBtn.href = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(waMsg)}`;

        modalOverlay.classList.add('open');
      }
    });
  });

  if (modalClose && modalOverlay) {
    modalClose.addEventListener('click', () => {
      modalOverlay.classList.remove('open');
    });

    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        modalOverlay.classList.remove('open');
      }
    });
  }

  // Header scroll shadow
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.style.boxShadow = '0 4px 20px rgba(10, 27, 21, 0.08)';
    } else {
      navbar.style.boxShadow = 'none';
    }
  });
});
