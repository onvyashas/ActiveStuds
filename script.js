document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});
// Function to add the roll-in effect to the button
function addRollInEffect() {
    var btn = document.getElementById('create-csv-btn');
    btn.classList.add('roll-in-blurred-right');
    // Remove the class after the animation ends
    btn.addEventListener('animationend', function() {
      btn.classList.remove('roll-in-blurred-right');
    });
  }
  
  // Add event listener to the "Main" link in the navbar
  document.querySelector('a[href="#main-section"]').addEventListener('click', function() {
    addRollInEffect();
  });
  