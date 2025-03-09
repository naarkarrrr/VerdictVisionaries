from flask import Flask, render_template, request, jsonify
import google.generativeai as genai
import os

# Configure Gemini API
API_KEY = "AIzaSyAgXFaOzglQTkId2U-gVNpdvaO4oxwYjtQ"  # Replace with your actual API key
genai.configure(api_key=API_KEY)
model = genai.GenerativeModel('gemini-1.5-flash')

# Global conversation history
user_history = []
response_history = []

# List of restricted words (add more as needed)
restricted_words = {"badword1", "badword2", "abuse", "offensive"}  # Replace with actual words

def contains_restricted_words(text):
    return any(word in text.lower() for word in restricted_words)

app = Flask(__name__)

@app.route('/')
def home():
    return render_template('bot.html')

@app.route('/chat', methods=['POST'])
def chat():
    try:
        # Get JSON input
        data = request.get_json()
        user_input = data.get('message', '').strip()

        if not user_input:
            return jsonify({'response': "⚠️ Please enter a valid message."}), 400

        # Check for restricted content
        if contains_restricted_words(user_input):
            return jsonify({'response': "⚠️ Please maintain a respectful and educational conversation."}), 400

        # Store conversation history
        user_history.append(user_input)

        # Construct AI prompt
        prompt = (
            "You are an AI Educator developed by Verdict Visionaries Team. "
            "Your goal is to provide clear, educational, and helpful answers on academic topics. "
            "Avoid any inappropriate or unrelated content. "
            f"Previous questions: {user_history}, "
            f"Previous responses: {response_history}. "
            f"Answer: {user_input} in an educational and respectful manner."
        )

        # Generate AI response
        response = model.generate_content(prompt)
        bot_response = response.text.strip() if response.text else "⚠️ No response generated."

        # Store bot response
        response_history.append(bot_response)

        return jsonify({'response': bot_response})

    except Exception as e:
        print(f"Error in /chat: {e}")  # Debugging
        return jsonify({'response': "⚠️ Internal Server Error"}), 500

if __name__ == "__main__":
    app.run(debug=True)