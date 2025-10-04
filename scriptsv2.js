document.addEventListener("DOMContentLoaded", function () {
    // Select all elements with either 'fade-in-heading' or 'fade-in-para' classes
    const fadeInElements = document.querySelectorAll('.fade-in-1, .fade-in-2, .fade-in-3, .fade-in-4, .fade-in-5, .fade-in-6');

    // Create an intersection observer
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add the "active" class to trigger fade-in
                entry.target.classList.add('fade-in-active');
                // Stop observing once the animation has triggered
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the element is visible
    });

    // Observe each fade-in element
    fadeInElements.forEach(element => {
        observer.observe(element);
    });

    const bgVideo = document.getElementById("bgVideo");
    const content = document.getElementById("content");

    if (bgVideo) {
        // Check if the video has already been played
        const hasViewedVideo = sessionStorage.getItem("hasViewedVideo");

        if (!hasViewedVideo) {
            // If video hasn't been viewed, disable scrolling and play it
            document.body.style.overflow = "hidden"; 

            bgVideo.onended = () => {
                bgVideo.classList.add("hidden-video");         // Trigger fade-out for video

                setTimeout(() => {
                    bgVideo.style.display = "none";            // Hide video after fade-out
                    content.classList.remove("hidden");        // Show content
                    document.body.style.overflow = "auto";     // Re-enable scrolling
                    sessionStorage.setItem("hasViewedVideo", "true");  // Mark video as viewed
                }, 1000);  // Match the timeout to the CSS transition duration
            };
        } else {
            // If video has been viewed, directly show the background and content
            bgVideo.style.display = "none";                       // Hide video immediately
            content.classList.remove("hidden");                   // Show content
            document.body.style.overflow = "auto";                // Enable scrolling
        }
    }

   // Target date and times for the event start and end
    const eventStartTime = new Date("November 15, 2024 08:00:00").getTime();
    const eventEndTime = new Date("November 15, 2024 18:00:00").getTime();

    const countdownInterval = setInterval(() => {
        const now = new Date().getTime();
        const distance = eventStartTime - now;
        const dateElements = document.querySelectorAll('.date');
        const timeElements = document.querySelectorAll('.time');

        if (distance < 0 && now < eventEndTime) {
            // Event has started but has not yet ended
            dateElements.forEach(element => element.textContent = "Event in Progress");
            const remainingTime = eventEndTime - now;
            timeElements.forEach(element => element.textContent = formatTime(remainingTime)); // Format remaining time till end
        } else if (now >= eventEndTime) {
            // Event has ended
            clearInterval(countdownInterval);
            dateElements.forEach(element => element.textContent = "Event Ended!");
            timeElements.forEach(element => element.textContent = "");
        } else {
            // Countdown to the start of the event
            dateElements.forEach(element => element.textContent = "We Look Forward to Welcoming You on November 15th");
            timeElements.forEach(element => element.textContent = formatTime(distance));
        }
    }, 1000);

    // Function to format time as d, h, m, s
    function formatTime(distance) {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

});

