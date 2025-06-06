
// Wait for the document to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Price range slider functionality
    const priceSlider = document.getElementById('priceRange');
    const mobilePriceSlider = document.getElementById('mobilePriceRange');
    
    // Function to update min/max input fields when slider changes
    function updatePriceInputs(slider, minInput, maxInput) {
        if (!slider) return;
        
        slider.addEventListener('input', function() {
            // For simplicity, this example just demonstrates setting a single value
            // In a real app, you'd have a dual-range slider or calculate ranges differently
            const value = this.value;
            // Update related min/max inputs if they exist
            if (maxInput) maxInput.value = value;
        });
    }
    
    // Initialize for desktop and mobile sliders
    updatePriceInputs(priceSlider);
    updatePriceInputs(mobilePriceSlider);
    
    // Add to cart button functionality
    const addToCartButtons = document.querySelectorAll('.btn-outline-primary');
    
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            // Get product info from parent card
            const card = this.closest('.card');
            const productName = card.querySelector('.card-title').textContent;
            
            // Show alert when adding to cart
            alert(`Added ${productName} to cart!`);
            
            // Animation effect on button click
            this.classList.add('btn-primary');
            this.classList.remove('btn-outline-primary');
            
            setTimeout(() =>{
                this.classList.add('btn-outline-primary');
                this.classList.remove('btn-primary');
            },1000);
        });
    });
});
