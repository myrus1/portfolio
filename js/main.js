document.addEventListener('DOMContentLoaded', () => {

  // --- Typewriter Effect ---
  const textElement = document.getElementById('typewriter-text');
  const texts = ["Estudiante de Sistemas", "Backend & Infra", "DevOps"];
  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 100;

  function typeWriter() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      textElement.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 50;
    } else {
      textElement.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 100;
    }

    if (!isDeleting && charIndex === currentText.length) {
      isDeleting = true;
      typeSpeed = 2000; // Pause at end
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before new word
    }

    setTimeout(typeWriter, typeSpeed);
  }

  // Start typewriter if element exists
  if (textElement) typeWriter();


  // --- Tabs Logic ---
  const tabButtons = document.querySelectorAll('[data-tab-target]');
  const tabContents = document.querySelectorAll('[data-tab-content]');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = document.querySelector(button.dataset.tabTarget);

      // Deactivate all
      tabButtons.forEach(btn => btn.classList.remove('active', 'text-blue-400'));
      tabButtons.forEach(btn => btn.classList.add('text-gray-400'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Activate clicked
      button.classList.add('active', 'text-blue-400');
      button.classList.remove('text-gray-400');
      target.classList.add('active');

      // Trigger animations for charts if switching to home
      if (button.dataset.tabTarget === '#inicio' && window.myChart) {
        // simple re-render to animate
        window.myChart.update();
      }
    });
  });


  // --- Inner Tabs (Experience/Projects) ---
  const innerTabs = document.querySelectorAll('[data-inner-tab-target]');
  const innerTabContents = document.querySelectorAll('[data-inner-tab-content]');

  innerTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = document.querySelector(tab.dataset.innerTabTarget);

      innerTabContents.forEach(tc => {
        tc.classList.add('hidden');
        tc.classList.remove('animate-fade-in');
      });
      innerTabs.forEach(t => t.classList.remove('bg-blue-600', 'text-white'));
      innerTabs.forEach(t => t.classList.add('text-gray-400', 'hover:text-white'));

      tab.classList.remove('text-gray-400', 'hover:text-white');
      tab.classList.add('bg-blue-600', 'text-white');

      target.classList.remove('hidden');
      target.classList.add('animate-fade-in');
    });
  });


  // --- Skills Filter ---
  const skillButtons = document.querySelectorAll('[data-skill-group]');
  const skillItems = document.querySelectorAll('.skill-item');

  skillButtons.forEach(button => {
    button.addEventListener('click', () => {
      const group = button.dataset.skillGroup;

      // Update buttons state
      skillButtons.forEach(btn => btn.classList.remove('active', 'bg-blue-600', 'text-white'));
      skillButtons.forEach(btn => btn.classList.add('bg-gray-800', 'text-gray-300'));

      button.classList.remove('bg-gray-800', 'text-gray-300');
      button.classList.add('active', 'bg-blue-600', 'text-white');

      // Filter items
      skillItems.forEach(item => {
        const itemGroup = item.dataset.group;
        if (group === 'all' || itemGroup === group) {
          item.style.display = 'block';
          // Trigger fade in
          item.style.opacity = '0';
          setTimeout(() => item.style.opacity = '1', 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });


  // --- Chart.js Configuration ---
  const ctx = document.getElementById('impactChart');
  if (ctx) {
    Chart.defaults.color = '#94a3b8';
    Chart.defaults.font.family = "'Inter', sans-serif";

    window.myChart = new Chart(ctx.getContext('2d'), {
      type: 'bar',
      data: {
        labels: ['Reducción Tareas Manuales', 'Mejora Confiabilidad', 'Setup Entorno (30m -> 5m)', 'Ahorro Tiempo/Semana'],
        datasets: [{
          label: 'Mejora Impacto %',
          data: [40, 60, 85, 12], // Normalized some data for visualization
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)', // Blue
            'rgba(16, 185, 129, 0.7)', // Green
            'rgba(139, 92, 246, 0.7)', // Purple
            'rgba(245, 158, 11, 0.7)', // Amber
          ],
          borderColor: [
            '#3b82f6',
            '#10b981',
            '#8b5cf6',
            '#f59e0b'
          ],
          borderWidth: 2,
          borderRadius: 5,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.9)',
            titleColor: '#f1f5f9',
            bodyColor: '#cbd5e1',
            borderColor: 'rgba(59, 130, 246, 0.3)',
            borderWidth: 1,
            padding: 10,
            displayColors: false,
          }
        },
        scales: {
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(255, 255, 255, 0.05)'
            },
            ticks: {
              callback: function (value) {
                return value + '%';
              }
            }
          },
          x: {
            grid: {
              display: false
            }
          }
        },
        animation: {
          duration: 2000,
          easing: 'easeOutQuart'
        }
      }
    });
  }

});
