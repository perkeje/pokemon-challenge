// Define your user_id
const user_id = "2041b086-60fa-4aab-91ea-311bbe4f1f55";

// Initialize an empty array to store the SQL statements
const sqlStatements = [];

// Generate 151 INSERT INTO statements
for (let pokemon_id = 1; pokemon_id <= 151; pokemon_id++) {
  // Create the SQL statement for each row
  const sql = `INSERT INTO users_pokemons (user_id, pokemon_id) VALUES ('${user_id}', ${pokemon_id});`;

  // Push the SQL statement into the array
  sqlStatements.push(sql);
}

// Output the SQL statements
console.log(sqlStatements.join("\n"));
