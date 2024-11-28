export const passwordRules = [
  {
    id: 1,
    description: "Your password must be at least 6 characters long",
    validator: (password: string) => password.length >= 6,
    errorMessage: "Password is too short"
  },
  {
    id: 2,
    description: "Password cannot include the word 'password'",
    validator: (password: string) => !password.toLowerCase().includes('password'),
    errorMessage: "Password cannot contain the word 'password'"
  },
  {
    id: 3,
    description: "Must contain at least one repeated character",
    validator: (password: string) => {
      for (let i = 0; i < password.length - 1; i++) {
        if (password[i] === password[i + 1]) return true;
      }
      return false;
    },
    errorMessage: "Need at least one repeated character"
  },
  {
    id: 4,
    description: "Include at least one punctuation mark",
    validator: (password: string) => /[.,!?;:]/.test(password),
    errorMessage: "Missing punctuation mark"
  },
  {
    id: 5,
    description: "Start and end with different letters",
    validator: (password: string) => {
      if (password.length < 2) return false;
      return password[0].toLowerCase() !== password[password.length - 1].toLowerCase();
    },
    errorMessage: "First and last characters must be different"
  },
  {
    id: 6,
    description: "Must contain at least three vowels",
    validator: (password: string) => {
      const vowels = password.toLowerCase().match(/[aeiou]/g);
      return vowels ? vowels.length >= 3 : false;
    },
    errorMessage: "Need at least three vowels"
  },
  {
    id: 7,
    description: "Include at least one sequence of consecutive letters",
    validator: (password: string) => {
      const letters = password.toLowerCase();
      for (let i = 0; i < letters.length - 2; i++) {
        if (
          letters.charCodeAt(i) + 1 === letters.charCodeAt(i + 1) &&
          letters.charCodeAt(i + 1) + 1 === letters.charCodeAt(i + 2)
        ) {
          return true;
        }
      }
      return false;
    },
    errorMessage: "Need a sequence of consecutive letters (e.g., 'abc')"
  },
  {
    id: 8,
    description: "Must contain at least one palindrome",
    validator: (password: string) => {
      for (let i = 0; i < password.length - 2; i++) {
        for (let j = i + 2; j < password.length; j++) {
          const substr = password.slice(i, j + 1);
          if (substr === substr.split('').reverse().join('')) {
            return true;
          }
        }
      }
      return false;
    },
    errorMessage: "Need a palindrome (e.g., 'eye' or '121')"
  },
  {
    id: 9,
    description: "Include at least one digit that is a prime number",
    validator: (password: string) => {
      const primes = ['2', '3', '5', '7'];
      return primes.some(prime => password.includes(prime));
    },
    errorMessage: "Need a prime number (2, 3, 5, or 7)"
  },
  {
    id: 10,
    description: "Must contain a word spelled backward",
    validator: (password: string) => {
      const commonWords = ['cat', 'dog', 'rat', 'bat', 'car'];
      return commonWords.some(word => 
        password.toLowerCase().includes(word.split('').reverse().join(''))
      );
    },
    errorMessage: "Need a reversed word (e.g., 'tac' for 'cat')"
  }
] as const;