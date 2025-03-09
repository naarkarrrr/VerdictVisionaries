from flask import Flask, jsonify
import subprocess

app = Flask(_name_)

@app.route('/run-python-script', methods=['POST'])
def run_python_script():
    try:
        # Replace 'your_script.py' with your actual Python script
        result = subprocess.run(['python', 'your_script.py'], capture_output=True, text=True)
        return jsonify({"output": result.stdout, "error": result.stderr})
    except Exception as e:
        return jsonify({"error": str(e)})

if _name_ == '_main_':
    app.run(host='0.0.0.0', port=5000, debug=True)