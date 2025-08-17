// // Array of quote objects
// const quotes = [
//   { text: "The only way to do great work is to love what you do.", category: "Motivation" },
//   { text: "Life is what happens when you're busy making other plans.", category: "Life" },
//   { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
//   { text: "Happiness is not something ready made. It comes from your own actions.", category: "Happiness" }
// ];

// // Function to display a random quote
// function showRandomQuote() {
//   const quoteDisplay = document.getElementById('quoteDisplay');
//   const randomIndex = Math.floor(Math.random() * quotes.length);
//   const quote = quotes[randomIndex];
//   quoteDisplay.innerHTML = `
//     <blockquote>"${quote.text}"</blockquote>
//     <p><em>Category: ${quote.category}</em></p>
//   `;
// }

// // Function to create and display the add-quote form
// function createAddQuoteForm() {
//   // Prevent multiple forms
//   if (document.getElementById('addQuoteForm')) return;

//   const form = document.createElement('form');
//   form.id = 'addQuoteForm';
//   form.innerHTML = `
//     <input type="text" id="quoteText" placeholder="Quote text" required />
//     <input type="text" id="quoteCategory" placeholder="Category" required />
//     <button type="submit">Add Quote</button>
//   `;

//   form.addEventListener('submit', function(e) {
//     e.preventDefault();
//     const text = document.getElementById('quoteText').value.trim();
//     const category = document.getElementById('quoteCategory').value.trim();
//     if (text && category) {
//       quotes.push({ text, category });
//       showRandomQuote();
//       form.remove();
//     }
//   });

//   document.body.appendChild(form);
// }

// // Event listeners
// document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// // Optional: Add a button to add new quotes
// const addQuoteBtn = document.createElement('button');
// addQuoteBtn.textContent = 'Add New Quote';
// addQuoteBtn.id = 'addQuoteBtn';
// addQuoteBtn.addEventListener('click', createAddQuoteForm);
// document.body.appendChild(addQuoteBtn);

// // Show a quote on initial load
// showRandomQuote();

// Utility functions for storage
function saveQuotesToLocal() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotesFromLocal() {
  const stored = localStorage.getItem('quotes');
  if (stored) {
    try {
      const arr = JSON.parse(stored);
      if (Array.isArray(arr)) {
        quotes.length = 0;
        arr.forEach(q => quotes.push(q));
      }
    } catch {}
  }
}

// Array of quote objects (default)
const quotes = [
  { text: "The only way to do great work is to love what you do.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Success is not final, failure is not fatal: It is the courage to continue that counts.", category: "Success" },
  { text: "Happiness is not something ready made. It comes from your own actions.", category: "Happiness" }
];

// Load from localStorage if available
loadQuotesFromLocal();

// Function to display a random quote
function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>Category: ${quote.category}</em></p>
  `;
  // Save last shown quote to sessionStorage
  sessionStorage.setItem('lastQuote', JSON.stringify(quote));
}

// Function to create and display the add-quote form
function createAddQuoteForm() {
  if (document.getElementById('addQuoteForm')) return;

  const form = document.createElement('form');
  form.id = 'addQuoteForm';
  form.innerHTML = `
    <input type="text" id="quoteText" placeholder="Quote text" required />
    <input type="text" id="quoteCategory" placeholder="Category" required />
    <button type="submit">Add Quote</button>
    <span id="addQuoteMsg" style="margin-left:10px;color:green;"></span>
  `;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const text = document.getElementById('quoteText').value.trim();
    const category = document.getElementById('quoteCategory').value.trim();
    const msg = document.getElementById('addQuoteMsg');
    if (text && category) {
      quotes.push({ text, category });
      saveQuotesToLocal();
      showRandomQuote();
      msg.textContent = "Quote added!";
      setTimeout(() => form.remove(), 1000);
    } else {
      msg.textContent = "Please fill in both fields.";
      msg.style.color = "red";
    }
  });

  document.body.appendChild(form);
  document.getElementById('quoteText').focus();
}

// Import/Export functionality
function exportQuotes() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = "quotes.json";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function importQuotes(event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const arr = JSON.parse(e.target.result);
      if (Array.isArray(arr)) {
        quotes.length = 0;
        arr.forEach(q => quotes.push(q));
        saveQuotesToLocal();
        showRandomQuote();
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid format.");
      }
    } catch {
      alert("Failed to import quotes.");
    }
  };
  reader.readAsText(file);
}

// Event listeners
document.getElementById('newQuote').addEventListener('click', showRandomQuote);

// Add a button to add new quotes
const addQuoteBtn = document.createElement('button');
addQuoteBtn.textContent = 'Add New Quote';
addQuoteBtn.id = 'addQuoteBtn';
addQuoteBtn.addEventListener('click', createAddQuoteForm);
document.body.appendChild(addQuoteBtn);

// Add Export button
const exportBtn = document.createElement('button');
exportBtn.textContent = 'Export Quotes';
exportBtn.id = 'exportQuotesBtn';
exportBtn.addEventListener('click', exportQuotes);
document.body.appendChild(exportBtn);

// Add Import button and file input
const importBtn = document.createElement('button');
importBtn.textContent = 'Import Quotes';
importBtn.id = 'importQuotesBtn';
importBtn.addEventListener('click', () => fileInput.click());
document.body.appendChild(importBtn);

const fileInput = document.createElement('input');
fileInput.type = 'file';
fileInput.accept = '.json,application/json';
fileInput.style.display = 'none';
fileInput.addEventListener('change', importQuotes);
document.body.appendChild(fileInput);

// Show last quote from sessionStorage if available, else random
const lastQuote = sessionStorage.getItem('lastQuote');
if (lastQuote) {
  const quote = JSON.parse(lastQuote);
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = `
    <blockquote>"${quote.text}"</blockquote>
    <p><em>Category: ${quote.category}</em></p>
  `;
} else {
  showRandomQuote();
}