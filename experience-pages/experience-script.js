function highlightNavLink() {

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    let scrollPosition = window.scrollY || window.pageYOffset;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;

        if (scrollPosition >= sectionTop - sectionHeight / 3 &&
            scrollPosition < sectionTop + sectionHeight - sectionHeight / 3) {
            const id = section.getAttribute('id');
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${id}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

document.addEventListener('DOMContentLoaded', function() {


    window.addEventListener('scroll', highlightNavLink);
    highlightNavLink(); // Initial call to highlight the active link on page load

    // Load content when the page is loaded
    loadContent();
});

// Function to load external content
function loadContent() {
    fetch('content/meril-content.html')
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.text();
        })
        .then(data => {
            document.getElementById('main-content').innerHTML = data;
            const sections = document.querySelectorAll('section');
            const navLinks = document.querySelectorAll('.nav-links a');
            highlightNavLink(); // Highlight the active link after loading new content

            // Manage scroll event listener
            window.removeEventListener('scroll', highlightNavLink);
            window.addEventListener('scroll', highlightNavLink);
        })
        .catch(error => {
            console.error('There was a problem with the fetch operation:', error);
            document.getElementById('main-content').innerHTML = '<p>Error loading content. Please try again later.</p>';
        });
}
