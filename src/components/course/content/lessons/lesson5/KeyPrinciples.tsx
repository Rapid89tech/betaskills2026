
import React from 'react';

const KeyPrinciples = () => {
  return (
    <div className="space-y-6">
      <h3 className="text-2xl font-bold">🧩 Key Principles of Writing Effective Prompts</h3>
      
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <h4 className="font-semibold text-green-800 mb-2">✅ 1. Be Clear and Specific</h4>
            <p className="text-green-700 text-sm mb-2">Avoid vague requests. Clearly state what the code should do, the language to use, and any constraints.</p>
            <div className="bg-white p-3 rounded border">
              <p className="text-xs font-mono text-green-600">"Write a JavaScript function that takes a string and returns true if it is a palindrome."</p>
            </div>
          </div>

          <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
            <h4 className="font-semibold text-blue-800 mb-2">✅ 2. Mention the Programming Language</h4>
            <p className="text-blue-700 text-sm mb-2">Always specify the language unless you want the AI to choose one.</p>
            <div className="bg-white p-3 rounded border">
              <p className="text-xs font-mono text-blue-600">"Write a Python script to read a CSV file and calculate the average of a column."</p>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg border border-purple-200">
            <h4 className="font-semibold text-purple-800 mb-2">✅ 3. Include Expected Inputs and Outputs</h4>
            <p className="text-purple-700 text-sm mb-2">Let the AI know what kind of data it should handle.</p>
            <div className="bg-white p-3 rounded border">
              <p className="text-xs font-mono text-purple-600">"Create a Python function that takes a list of integers and returns a sorted list in descending order."</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-orange-50 p-4 rounded-lg border border-orange-200">
            <h4 className="font-semibold text-orange-800 mb-2">✅ 4. Define Function/Class Structure</h4>
            <p className="text-orange-700 text-sm mb-2">If you have a specific format or naming in mind, include it.</p>
            <div className="bg-white p-3 rounded border">
              <p className="text-xs font-mono text-orange-600">"Write a Java method called calculateTax that takes an income value and returns the tax based on brackets."</p>
            </div>
          </div>

          <div className="bg-pink-50 p-4 rounded-lg border border-pink-200">
            <h4 className="font-semibold text-pink-800 mb-2">✅ 5. Ask for Comments/Explanation</h4>
            <p className="text-pink-700 text-sm mb-2">You can ask the AI to explain the code or include inline comments.</p>
            <div className="bg-white p-3 rounded border">
              <p className="text-xs font-mono text-pink-600">"Write a commented C++ function to calculate factorial using recursion."</p>
            </div>
          </div>

          <div className="bg-cyan-50 p-4 rounded-lg border border-cyan-200">
            <h4 className="font-semibold text-cyan-800 mb-2">✅ 6. Use Step-by-Step Instructions</h4>
            <p className="text-cyan-700 text-sm mb-2">Break down complex tasks into smaller steps.</p>
            <div className="bg-white p-3 rounded border">
              <p className="text-xs font-mono text-cyan-600">"Write a Python class for a bank account with deposit and withdrawal methods."</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KeyPrinciples;
