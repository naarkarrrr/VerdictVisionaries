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

        # Store conversation history
        user_history.append(user_input)

        # Construct AI prompt
        prompt = (
            "You are a Medical Assistant Bot developed by MedTrack Team. "
            f"Previous questions: {user_history}, "
            f"Previous responses: {response_history}. "
            f"Answer: {user_input} clearly and concisely."
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