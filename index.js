const express = require("express");
const cors = require("cors");

// Initialize the Express app
const app = express();

// Middleware to parse JSON bodies and enable CORS
app.use(express.json());
app.use(cors());

app.post("/bfhl", (req, res) => {
  try {
    const { data } = req.body;

    const fullName = "aakriti_mehrotra";
    const dob = "08102004";
    const user_id = `${fullName.toLowerCase()}_${dob}`;
    const email = "aakriti.meh.2004@gmail.com";
    const roll_number = "22BCE1954";

    const odd_numbers = [];
    const even_numbers = [];
    const alphabets = [];
    const special_characters = [];
    let sum = 0;
    let alphabet_chars = "";

    data.forEach((item) => {
      if (!isNaN(item)) {
        const num = parseInt(item, 10);
        sum += num;
        if (num % 2 === 0) {
          even_numbers.push(item.toString());
        } else {
          odd_numbers.push(item.toString());
        }
      }
      // Check if item is an alphabet
      else if (/^[a-zA-Z]+$/.test(item)) {
        alphabets.push(item.toUpperCase());
        alphabet_chars += item;
      }
      // Otherwise, it's a special character
      else {
        special_characters.push(item);
      }
    });

    // --- Concatenation and Alternating Caps Logic ---
    let concat_string = "";
    const reversed_alphabets = alphabet_chars.split("").reverse().join("");
    for (let i = 0; i < reversed_alphabets.length; i++) {
      if (i % 2 !== 0) {
        // Odd index -> uppercase
        concat_string += reversed_alphabets[i].toUpperCase();
      } else {
        // Even index -> lowercase
        concat_string += reversed_alphabets[i].toLowerCase();
      }
    }

    // --- Construct the Response ---
    const response = {
      is_success: true,
      user_id: user_id,
      email: email,
      roll_number: roll_number,
      odd_numbers: odd_numbers,
      even_numbers: even_numbers,
      alphabets: alphabets,
      special_characters: special_characters,
      sum: sum.toString(),
      concat_string: concat_string,
    };

    // Send a successful response with status 200
    return res.status(200).json(response);
  } catch (error) {
    // Graceful error handling
    console.error("Error processing request:", error);
    return res.status(500).json({
      is_success: false,
      error_message: error.message,
    });
  }
});

// Define a default route for health checks
app.get("/", (req, res) => {
  res.status(200).send("BFHL API is running!");
});

// Define the port and start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
