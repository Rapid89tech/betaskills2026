const quiz = {
  id: 2,
  title: 'Module 2 Quiz: Stocks, Sauces, & Soups – Mother Sauces & Derivatives',
  duration: '30 min',
  type: 'quiz',
  content: {
    questions: [
      {
        question: 'Which of the following is NOT a classic French mother sauce?',
        options: [
          'Béchamel',
          'Velouté',
          'Espagnole',
          'Marinara'
        ],
        correct: 3,
        explanation: 'Marinara is a derivative of tomato sauce, not one of the five classic French mother sauces codified by Auguste Escoffier.'
      },
      {
        question: 'What is the main difference between a white stock and a brown stock?',
        options: [
          'Type of bones used',
          'Whether vegetables are added',
          'Roasting of bones and vegetables',
          'Use of salt'
        ],
        correct: 2,
        explanation: 'Brown stock is made from roasted bones and vegetables, creating a darker, richer flavor due to caramelization and Maillard reactions, while white stock uses unroasted bones.'
      },
      {
        question: 'Which mother sauce is made by whisking egg yolks with butter and lemon juice?',
        options: [
          'Béchamel',
          'Hollandaise',
          'Velouté',
          'Espagnole'
        ],
        correct: 1,
        explanation: 'Hollandaise is an emulsion of egg yolks, butter, and lemon juice or vinegar, prepared by whisking over a double boiler.'
      },
      {
        question: 'A Mornay sauce is a derivative of which mother sauce?',
        options: [
          'Espagnole',
          'Béchamel',
          'Velouté',
          'Hollandaise'
        ],
        correct: 1,
        explanation: 'Mornay is a derivative of Béchamel, made by adding cheese (e.g., Gruyère, Parmesan) to the white sauce.'
      },
      {
        question: 'What is the purpose of skimming during stock preparation?',
        options: [
          'To increase flavor intensity',
          'To remove impurities and ensure clarity',
          'To thicken the stock',
          'To add color'
        ],
        correct: 1,
        explanation: 'Skimming removes impurities (foam or fat) from the surface of the stock to ensure clarity and quality.'
      },
      {
        question: 'Which stock is commonly used as the base for a Velouté sauce?',
        options: [
          'Brown stock',
          'Chicken, veal, or fish white stock',
          'Vegetable stock',
          'Court bouillon'
        ],
        correct: 1,
        explanation: 'Velouté is made with a blonde roux and white stock, typically chicken, veal, or fish stock.'
      },
      {
        question: 'Which of the following is a derivative of Espagnole sauce?',
        options: [
          'Béarnaise',
          'Demi-glace',
          'Mornay',
          'Soubise'
        ],
        correct: 1,
        explanation: 'Demi-glace is a derivative of Espagnole, made by reducing the brown sauce with additional brown stock.'
      },
      {
        question: 'What is a court bouillon primarily used for?',
        options: [
          'Braising meat',
          'Poaching fish or vegetables',
          'Making thick sauces',
          'Reducing to demi-glace'
        ],
        correct: 1,
        explanation: 'Court bouillon is a quick stock with vegetables, herbs, and an acid (wine or vinegar), used for poaching fish or vegetables.'
      },
      {
        question: 'Which of these soups is a thick soup usually made with a stock thickened with roux or cream?',
        options: [
          'Consommé',
          'Broth-based soup',
          'Bisque',
          'Gazpacho'
        ],
        correct: 2,
        explanation: 'Bisque is a thick soup typically made with stock thickened with roux or cream, often featuring seafood.'
      },
      {
        question: 'What is the key step to prevent a Hollandaise sauce from breaking?',
        options: [
          'Whisk at high heat',
          'Slowly incorporate butter while maintaining low heat',
          'Boil the mixture after emulsification',
          'Add cream to stabilize'
        ],
        correct: 1,
        explanation: 'To prevent Hollandaise from breaking, maintain low heat and slowly incorporate melted butter while whisking constantly to create a stable emulsion.'
      }
    ]
  }
};

export default quiz;

