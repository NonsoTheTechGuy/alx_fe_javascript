// Array of quote objects
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
  { text: "Happiness is not something ready made. It comes from your own actions.", category: "Happiness" }
];

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>Category: ${quote.category}</em></p>
  `;
}

// Function to create and display the add-quote form
function createAddQuoteForm() {
  // Prevent multiple forms
  if (document.getElementById('addQuoteForm')) return;

  const form = document.createElement('form');
  form.id = 'addQuoteForm';
  form.innerHTML = `
    <input type="text" id="quoteText" placeholder="Quote text" required />
    <input type="text" id="quoteCategory" placeholder="Category" required />
    <button type="submit">Add Quote</button>
  `;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = document.getElementById('quoteText').value.trim();
    const category = document.getElementById('quoteCategory').value.trim();
    if (text && category) {
      quotes.push({ text, category });
      showRandomQuote();
      form.remove();
    }
  });

  document.body.appendChild(form);
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Optional: Add a button to add new quotes
const addQuoteBtn = document.createElement('button');
addQuoteBtn.textContent = 'Add New Quote';
addQuoteBtn.id = 'addQuoteBtn';
addQuoteBtn.addEventListener('click', createAddQuoteForm);
document.body.appendChild(addQuoteBtn);

// Show a quote on initial load
showRandomQuote();