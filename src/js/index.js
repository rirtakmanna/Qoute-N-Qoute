import ClipboardJS from "clipboard";

const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const whatappBtn = document.getElementById("whatsapp");
const newQuoteBtn = document.getElementById("new-qoute");
const loader = document.getElementById("loader");

const copy = new ClipboardJS("#copy");

// show showLoading
function showLoading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// hide showLoading
function removeLoading() {
  if (!loader.hidden) {
    loader.hidden = true;
    quoteContainer.hidden = false;
  }
}

// Get Qoute form API
async function getQoute() {
  showLoading();
  const proxyUrl = "https://cors-anywhere.herokuapp.com/";
  const apiUrl =
    "http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

  try {
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    // if author is blank add unknown
    if (data.quoteAuthor === "") {
      authorText.innerText = "Unknown";
    } else {
      authorText.innerText = data.quoteAuthor;
    }

    // Reduce font size for long statement
    if (data.quoteText.length > 120) {
      quoteText.classList.add("long-quote");
    } else {
      quoteText.classList.remove("long-quote");
    }
    quoteText.innerText = data.quoteText;

    // Stop loader
    removeLoading();

    // put error
    // throw new error("opp");
  } catch (error) {
    getQoute();
  }
}

//Tweet
function tweetQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

//whatsapp
function msgQuote() {
  const quote = quoteText.innerText;
  const author = authorText.innerText;
  const twitterUrl = `https://wa.me/?text=${quote} - ${author}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", getQoute);
twitterBtn.addEventListener("click", tweetQuote);
whatappBtn.addEventListener("click", msgQuote);

// on Load
getQoute();
